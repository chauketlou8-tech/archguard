# ArchGuard

> Intelligent architecture analysis for TypeScript projects.

ArchGuard is a CLI tool that helps teams enforce architectural boundaries, detect dependency issues, and keep large TypeScript codebases maintainable.

Unlike traditional linters that focus on syntax or code style, ArchGuard analyzes your project's dependency graph and validates whether modules communicate according to your intended architecture.

---

## Why ArchGuard?

As projects grow, architecture tends to drift.

A controller starts importing the database directly.

A service begins depending on another feature it shouldn't.

Circular dependencies appear.

New developers unknowingly bypass established layers.

TypeScript compiles successfully.

ESLint reports no issues.

The application still works.

Months later, the codebase becomes difficult to maintain.

ArchGuard is designed to catch these problems before they become technical debt.

---

## Features

### Current Goals

* Layered architecture validation
* Import boundary enforcement
* Circular dependency detection
* Project dependency graph generation
* Interactive project initialization
* Smart architecture detection
* Beautiful CLI output
* JSON reports
* HTML reports

---

## Planned Features

* VS Code extension
* GitHub Action
* CI/CD integration
* Architecture drift reports
* Dead code detection
* Unused dependency analysis
* Interactive architecture visualization
* Framework presets
* Monorepo support
* Plugin system

---

## Example

Expected architecture

```text
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
Database
```

A controller imports the database directly.

```ts
import prisma from "../database/prisma";
```

Running ArchGuard

```bash
npx archguard analyze
```

Output

```text
❌ Architecture Violation

File:
src/controllers/user.controller.ts

Illegal Import:
src/database/prisma.ts

Controllers may only import:

✔ Services

Found:

✖ Database
```

---

## Smart Project Detection

Rather than forcing developers to manually configure everything, ArchGuard inspects the project and attempts to determine its architecture automatically.

Example

```bash
npx archguard init
```

Output

```text
🔍 Scanning project...

✓ package.json found
✓ TypeScript project detected

Detected folders

controllers
services
repositories
database
routes

Detected architecture

Routes
↓
Controllers
↓
Services
↓
Repositories
↓
Database

Confidence: 98%

Use this architecture?

✔ Yes
```

If ArchGuard cannot determine the architecture confidently, it offers presets or a custom configuration wizard.

---

## Supported Architectures

* Layered Architecture
* MVC
* Clean Architecture
* Feature-Based Architecture
* Custom Architectures

---

## Reports

### Console

Fast, developer-friendly output while coding.

### JSON

Perfect for automation and CI/CD pipelines.

### HTML

Interactive reports with dependency graphs and architecture summaries.

---

## Roadmap

### Version 1.0

* CLI
* Project scanning
* Layer detection
* Import validation
* Configuration generation

### Version 1.5

* Circular dependency detection
* Dependency graph generation

### Version 2.0

* HTML reports
* JSON reports
* Architecture metrics

### Version 3.0

* VS Code extension
* GitHub Action
* Architecture drift analysis

### Future

* Plugin ecosystem
* AI-assisted architecture recommendations
* Cross-language support

---

## Tech Stack

* TypeScript
* Node.js
* TypeScript Compiler API
* Commander.js (CLI)
* Chalk (terminal formatting)
* Fast-Glob (file discovery)

---

## Philosophy

Architecture should not exist only in documentation.

It should be enforceable.

ArchGuard turns architectural guidelines into automated rules that help teams maintain clean, scalable, and consistent codebases.

---

## Status

🚧 Currently in active development.

Feedback, feature requests, and contributions are welcome.

---

## License

MIT License
