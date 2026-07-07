# Rhobert Isaac Calem Portfolio

This portfolio is now a Next.js project.

## Start locally on Windows

If VS Code PowerShell shows this error:

```text
npm.ps1 cannot be loaded because running scripts is disabled on this system
```

that is a Windows PowerShell execution-policy issue, not a project code error.

Use one of these options:

### Easiest

Double-click `start-portfolio.cmd` in this folder.

### From VS Code PowerShell

Run:

```powershell
npm.cmd run dev
```

Then open:

```text
http://localhost:3000
```

### From Command Prompt or Git Bash

Run:

```bash
npm run dev
```

## Build check

```bash
npm run build
```

## Important

Do not open `html/index.html` with Live Server if you want the new Next.js version. The enhanced site lives in the Next.js `app/` folder and must be started with the dev server.
