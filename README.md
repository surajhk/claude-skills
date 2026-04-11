# Claude Skills

A collection of custom skills for [Claude Code](https://claude.ai/code) — built and maintained by [@SurajKhanna](https://github.com/SurajKhanna).

These are plug-and-play skills you can add to your own Claude Code setup.

---

## Available Skills

| Skill | Description |
|-------|-------------|
| [prd-copilot](skills/prd-copilot.md) | A collaborative PRD co-pilot for Product Managers. Works section by section to produce high-quality, consistent, and complete PRDs faster. |
| [investment-agent](skills/investment-agent.md) | A personal investment research agent. Runs a mandatory macro → opportunity scan → valuation → holdings sequence before any recommendation. Enforces portfolio discipline with dynamic concentration limits, exit rules, and tracks a watchlist and trade log across sessions. |

---

## How to Install a Skill

1. Copy the skill file from the `skills/` folder.
2. Create a subfolder for it in your local Claude skills directory and place the file inside as `SKILL.md`:
   - **Mac/Linux:** `~/.claude/skills/<skill-name>/SKILL.md`
   - **Windows:** `C:\Users\<YourName>\.claude\skills\<skill-name>\SKILL.md`

   Example for prd-copilot:
   - Mac/Linux: `~/.claude/skills/prd-copilot/SKILL.md`
   - Windows: `C:\Users\<YourName>\.claude\skills\prd-copilot\SKILL.md`

3. Invoke it in Claude Code by typing `/skill-name` (e.g., `/prd-copilot`).

That's it — no restart needed.

---

## Using one of these skills?

If a skill is saving you time, two quick things would mean a lot:

- **Star this repo** — it helps me know people are actually finding this useful
- **Drop a note in [Discussions](https://github.com/surajhk/claude-skills/discussions)** — which skill you're using, what you're using it for, any feedback

---

## About

New skills will be added here over time. Each skill is designed to be self-contained and ready to use out of the box.

