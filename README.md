# Claude Skills

A collection of custom skills for [Claude Code](https://claude.ai/code) and [Antigravity](https://antigravity.google) — built and maintained by [@SurajKhanna](https://github.com/SurajKhanna).

These are plug-and-play skills you can add to your own AI agent setup.

---

## Available Skills

| Skill | Description |
|-------|-------------|
| [prd-copilot](skills/prd-copilot) | A collaborative PRD co-pilot for Product Managers. Works section by section to produce high-quality, consistent, and complete PRDs faster. |
| [investment-agent](skills/investment-agent) | A personal investment research agent. Runs a mandatory macro → opportunity scan → valuation → holdings sequence before any recommendation. Enforces portfolio discipline with dynamic concentration limits, exit rules, and tracks a watchlist and trade log across sessions. |

---

## How to Install

### Option A — npx (Recommended, works everywhere)

```bash
npx skills add surajhk/claude-skills -g
```

Install a specific skill only:
```bash
npx skills add surajhk/claude-skills --skill investment-agent -g
npx skills add surajhk/claude-skills --skill prd-copilot -g
```

> Works with Claude Code, Antigravity, and 40+ other agents. The CLI auto-detects which agents you have installed. See [skills.sh](https://skills.sh) for the full list.

---

### Option B — UI (Antigravity / VSCode Extension)

1. Type `/plugin` in the chat to open the Plugin Manager
2. Click **Add Marketplace**
3. Paste this URL:
   ```
   https://github.com/surajhk/claude-skills
   ```
4. Find the skill you want and click **Install**

---

### Option C — CLI (Claude Code Terminal)

**Step 1 — Add the marketplace** (once):
```
/plugin marketplace add surajhk/claude-skills
```

**Step 2 — Install the skill you want:**
```
/plugin install investment-agent@surajhk-skills
/plugin install prd-copilot@surajhk-skills
```

---

## Using one of these skills?

If a skill is saving you time, two quick things would mean a lot:

- **Star this repo** — it helps me know people are actually finding this useful
- **Drop a note in [Discussions](https://github.com/surajhk/claude-skills/discussions)** — which skill you're using, what you're using it for, any feedback

---

## About

New skills will be added here over time. Each skill is designed to be self-contained and ready to use out of the box.
