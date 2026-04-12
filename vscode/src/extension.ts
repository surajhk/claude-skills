import * as vscode from 'vscode';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const REGISTRY_URL =
  'https://raw.githubusercontent.com/surajhk/claude-skills/master/registry.json';
const RAW_BASE_URL =
  'https://raw.githubusercontent.com/surajhk/claude-skills/master/';

interface Skill {
  name: string;
  description: string;
  file: string;
}

interface Registry {
  skills: Skill[];
}

function getSkillsDir(): string {
  return path.join(os.homedir(), '.claude', 'skills');
}

function getSkillPath(name: string): string {
  return path.join(getSkillsDir(), name, 'SKILL.md');
}

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          if (res.headers.location) {
            fetchUrl(res.headers.location).then(resolve).catch(reject);
            return;
          }
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

async function fetchRegistry(): Promise<Registry> {
  const raw = await fetchUrl(REGISTRY_URL);
  return JSON.parse(raw) as Registry;
}

function isInstalled(name: string): boolean {
  return fs.existsSync(getSkillPath(name));
}

function getInstalledSkills(): string[] {
  const skillsDir = getSkillsDir();
  if (!fs.existsSync(skillsDir)) {
    return [];
  }
  return fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        fs.existsSync(path.join(skillsDir, entry.name, 'SKILL.md'))
    )
    .map((entry) => entry.name);
}

async function installSkill(): Promise<void> {
  let registry: Registry;

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Claude Skills',
      cancellable: false,
    },
    async (progress) => {
      progress.report({ message: 'Fetching available skills...' });
      registry = await fetchRegistry();
    }
  );

  const items = registry!.skills.map((skill) => ({
    label: skill.name,
    description: skill.description,
    detail: isInstalled(skill.name) ? '$(check) Already installed' : undefined,
    skill,
  }));

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select a skill to install',
    matchOnDescription: true,
  });

  if (!selected) {
    return;
  }

  if (isInstalled(selected.skill.name)) {
    const overwrite = await vscode.window.showWarningMessage(
      `${selected.skill.name} is already installed. Reinstall?`,
      'Reinstall',
      'Cancel'
    );
    if (overwrite !== 'Reinstall') {
      return;
    }
  }

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Claude Skills',
      cancellable: false,
    },
    async (progress) => {
      progress.report({ message: `Installing ${selected.skill.name}...` });

      const content = await fetchUrl(RAW_BASE_URL + selected.skill.file);
      const skillPath = getSkillPath(selected.skill.name);
      fs.mkdirSync(path.dirname(skillPath), { recursive: true });
      fs.writeFileSync(skillPath, content, 'utf8');
    }
  );

  vscode.window.showInformationMessage(
    `✓ ${selected.skill.name} installed. Invoke it in Claude Code with /${selected.skill.name}`
  );
}

async function uninstallSkill(): Promise<void> {
  const installed = getInstalledSkills();

  if (installed.length === 0) {
    vscode.window.showInformationMessage('No Claude Skills are currently installed.');
    return;
  }

  const selected = await vscode.window.showQuickPick(
    installed.map((name) => ({ label: name })),
    { placeHolder: 'Select a skill to uninstall' }
  );

  if (!selected) {
    return;
  }

  const confirm = await vscode.window.showWarningMessage(
    `Uninstall ${selected.label}?`,
    { modal: true },
    'Uninstall'
  );

  if (confirm !== 'Uninstall') {
    return;
  }

  const skillDir = path.join(getSkillsDir(), selected.label);
  fs.rmSync(skillDir, { recursive: true, force: true });

  vscode.window.showInformationMessage(`✓ ${selected.label} uninstalled.`);
}

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('claude-skills.install', installSkill),
    vscode.commands.registerCommand('claude-skills.uninstall', uninstallSkill)
  );
}

export function deactivate(): void {}
