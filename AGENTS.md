# Project Context & Operational Rules (HRS_docs)

## 1. BMad Isolation & Repo-Only Update Rule
- **Strict Scope:** BMad in this repository (`/Users/matejvida/Documents/Development/HRS_docs`) is isolated to this workspace (`_bmad/` and `.agents/skills/`) and bound exclusively to **Antigravity (`antigravity-cli`) and Gemini (`gemini`)**.
- **Never Touch Global / Claude Installs:** Never modify `~/.claude/`, `~/.agents/`, or `~/.gemini/skills/`.
- **Repo-Only Update Command:** Whenever updating BMad in this project, always run:
  ```bash
  npx bmad-method install --action quick-update --tools antigravity-cli,gemini --directory /Users/matejvida/Documents/Development/HRS_docs --yes
  ```
  *(Keep `tea` pinned to `v1.27.2` on BMad v6.x).*
