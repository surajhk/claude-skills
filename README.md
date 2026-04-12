# Claude Skills

A collection of custom skills for [Claude Code](https://claude.ai/code) — built and maintained by [@SurajKhanna](https://github.com/SurajKhanna).

These are plug-and-play skills you can add to your own Claude Code setup.

---

## Available Plugins

| Plugin | Description |
|--------|-------------|
| [prd-copilot](plugins/prd-copilot) | A collaborative PRD co-pilot for Product Managers. Works section by section to produce high-quality, consistent, and complete PRDs faster. |
| [investment-agent](plugins/investment-agent) | A personal investment research agent. Runs a mandatory macro → opportunity scan → valuation → holdings sequence before any recommendation. Enforces portfolio discipline with dynamic concentration limits, exit rules, and tracks a watchlist and trade log across sessions. |

---

## How to Install

**Step 1 — Add the marketplace** (once):

```
/plugin marketplace add surajhk/claude-skills
```

**Step 2 — Install the skill you want:**

### prd-copilot

```
/plugin install prd-copilot@surajhk-skills
```

Then invoke with `/prd-copilot`

---

### investment-agent

```
/plugin install investment-agent@surajhk-skills
```

Then invoke with `/investment-agent`

---

## Using one of these skills?

If a skill is saving you time, two quick things would mean a lot:

- **Star this repo** — it helps me know people are actually finding this useful
- **Drop a note in [Discussions](https://github.com/surajhk/claude-skills/discussions)** — which skill you're using, what you're using it for, any feedback

---

## About

New skills will be added here over time. Each skill is designed to be self-contained and ready to use out of the box.

