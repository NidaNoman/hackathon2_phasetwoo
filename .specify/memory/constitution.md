<!--
Sync Impact Report:
Version change: None -> 0.1.0
Modified principles: All (initial creation)
Added sections: Architectural Principles, Security Principles, Coding Constraints, Phase-2 Scope Boundaries
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending
  - .specify/templates/spec-template.md ⚠ pending
  - .specify/templates/tasks-template.md ⚠ pending
  - .specify/templates/adr-template.md ⚠ pending
  - .specify/templates/checklist-template.md ⚠ pending
  - .specify/templates/agent-file-template.md ⚠ pending
  - .specify/templates/phr-template.prompt.md ⚠ pending
  - .specify/templates/commands/sp.adr.toml ⚠ pending
  - .specify/templates/commands/sp.analyze.toml ⚠ pending
  - .specify/templates/commands/sp.checklist.toml ⚠ pending
  - .specify/templates/commands/sp.clarify.toml ⚠ pending
  - .specify/templates/commands/sp.constitution.toml ⚠ pending
  - .specify/templates/commands/sp.git.commit_pr.toml ⚠ pending
  - .specify/templates/commands/sp.implement.toml ⚠ pending
  - .specify/templates/commands/sp.phr.toml ⚠ pending
  - .specify/templates/commands/sp.plan.toml ⚠ pending
  - .specify/templates/commands/sp.reverse-engineer.toml ⚠ pending
  - .specify/templates/commands/sp.specify.toml ⚠ pending
  - .specify/templates/commands/sp.tasks.toml ⚠ pending
  - .specify/templates/commands/sp.taskstoissues.toml ⚠ pending
  - Phase-1-cli-todo/CLAUDE.md ⚠ pending
  - Phase-1-cli-todo/main.py ⚠ pending
  - Phase-1-cli-todo/README.md ⚠ pending
  - Phase-1-cli-todo/test_basic.py ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.adr.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.analyze.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.checklist.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.clarify.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.constitution.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.git.commit_pr.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.implement.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.phr.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.plan.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.reverse-engineer.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.specify.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.tasks.md ⚠ pending
  - Phase-1-cli-todo/.claude/commands/sp.taskstoissues.md ⚠ pending
  - Phase-1-cli-todo/.specify/memory/constitution.md ⚠ pending
  - Phase-1-cli-todo/.specify/scripts/powershell/check-prerequisites.ps1 ⚠ pending
  - Phase-1-cli-todo/.specify/scripts/powershell/common.ps1 ⚠ pending
  - Phase-1-cli-todo/.specify/scripts/powershell/create-new-feature.ps1 ⚠ pending
  - Phase-1-cli-todo/.specify/scripts/powershell/setup-plan.ps1 ⚠ pending
  - Phase-1-cli-todo/.specify/scripts/powershell/update-agent-context.ps1 ⚠ pending
  - Phase-1-cli-todo/.specify/templates/adr-template.md ⚠ pending
  - Phase-1-cli-todo/.specify/templates/agent-file-template.md ⚠ pending
  - Phase-1-cli-todo/.specify/templates/checklist-template.md ⚠ pending
  - Phase-1-cli-todo/.specify/templates/phr-template.prompt.md ⚠ pending
  - Phase-1-cli-todo/.specify/templates/plan-template.md ⚠ pending
  - Phase-1-cli-todo/.specify/templates/spec-template.md ⚠ pending
  - Phase-1-cli-todo/.specify/templates/tasks-template.md ⚠ pending
  - Phase-1-cli-todo/history/prompts/1-todo-console-app/2-create-todo-console-app-spec.spec.prompt.md ⚠ pending
  - Phase-1-cli-todo/history/prompts/1-todo-console-app/3-generate-task-list.tasks.prompt.md ⚠ pending
  - Phase-1-cli-todo/history/prompts/1-todo-console-app/4-create-implementation-plan.plan.prompt.md ⚠ pending
  - Phase-1-cli-todo/history/prompts/1-todo-console-app/5-fix-imports-direct-execution.green.prompt.md ⚠ pending
  - Phase-1-cli-todo/history/prompts/1-todo-console-app/5-implement-phase1-app.green.prompt.md ⚠ pending
  - Phase-1-cli-todo/history/prompts/constitution/1-create-hackathon-phase1-constitution.constitution.prompt.md ⚠ pending
  - Phase-1-cli-todo/specs/1-todo-console-app/data-model.md ⚠ pending
  - Phase-1-cli-todo/specs/1-todo-console-app/plan.md ⚠ pending
  - Phase-1-cli-todo/specs/1-todo-console-app/quickstart.md ⚠ pending
  - Phase-1-cli-todo/specs/1-todo-console-app/research.md ⚠ pending
  - Phase-1-cli-todo/specs/1-todo-console-app/spec.md ⚠ pending
  - Phase-1-cli-todo/specs/1-todo-console-app/tasks.md ⚠ pending
  - Phase-1-cli-todo/specs/1-todo-console-app/checklists/requirements.md ⚠ pending
  - Phase-1-cli-todo/src/__init__.py ⚠ pending
  - Phase-1-cli-todo/src/main.py ⚠ pending
  - Phase-1-cli-todo/src/commands/__init__.py ⚠ pending
  - Phase-1-cli-todo/src/commands/add_task.py ⚠ pending
  - Phase-1-cli-todo/src/commands/delete_task.py ⚠ pending
  - Phase-1-cli-todo/src/commands/exit_app.py ⚠ pending
  - Phase-1-cli-todo/src/commands/toggle_status.py ⚠ pending
  - Phase-1-cli-todo/src/commands/update_task.py ⚠ pending
  - Phase-1-cli-todo/src/commands/view_tasks.py ⚠ pending
  - Phase-1-cli-todo/src/models/__init__.py ⚠ pending
  - Phase-1-cli-todo/src/models/task.py ⚠ pending
  - Phase-1-cli-todo/src/repositories/__init__.py ⚠ pending
  - Phase-1-cli-todo/src/repositories/in_memory_repository.py ⚠ pending
  - Phase-1-cli-todo/src/repositories/task_repository.py ⚠ pending
  - Phase-1-cli-todo/src/services/__init__.py ⚠ pending
  - Phase-1-cli-todo/src/services/task_service.py ⚠ pending
  - Phase-1-cli-todo/src/ui/__init__.py ⚠ pending
  - Phase-1-cli-todo/src/ui/console.py ⚠ pending
  - Phase-1-cli-todo/src/ui/formatters.py ⚠ pending
  - Phase-1-cli-todo/src/utils/__init__.py ⚠ pending
  - Phase-1-cli-todo/src/utils/validators.py ⚠ pending
  - Phase-1-cli-todo/tests/__init__.py ⚠ pending
  - Phase-1-cli-todo/tests/integration/__init__.py ⚠ pending
  - Phase-1-cli-todo/tests/unit/__init__.py ⚠ pending
  - Phase-1-cli-todo/tests/unit/test_task_model.py ⚠ pending
Follow-up TODOs: None
-->
# Project Constitution: Phase-2 Todo Full-Stack Web App

**Version:** 0.1.0
**Ratification Date:** 2026-01-10
**Last Amended Date:** 2026-01-10

## 1. Introduction

This constitution outlines the fundamental principles, architectural decisions, and operational guidelines for the "Phase-2 Todo Full-Stack Web App" project. It serves as the single source of truth for all development activities, ensuring consistency, quality, and alignment with project goals. All team members, tools, and processes MUST adhere to the tenets described herein.

## 2. Guiding Principles

### 2.1. Architectural Principles

#### Principle: Spec-Driven Development ONLY
All development MUST be driven by clear, unambiguous specifications. No code shall be written without a corresponding, approved specification. This ensures intentional design, reduces rework, and facilitates automated verification.

#### Principle: Monorepo Architecture
The entire project, including frontend, backend, and shared components, MUST reside within a single Git repository. This promotes code sharing, simplifies dependency management, and streamlines CI/CD processes.

#### Principle: Frontend and Backend Separated
The frontend (user interface) and backend (API, business logic, data access) MUST be developed as distinct, independently deployable services. Communication between them MUST occur exclusively via well-defined API contracts.

#### Principle: Phase-1 Code Must Remain Unchanged
The existing Phase-1 CLI todo application code MUST NOT be modified. It serves as a completed reference and its functionality is not to be directly integrated or altered by Phase-2 development.

#### Principle: Approved Stack Usage
All new development MUST utilize only the following approved technology stack:
- **Frontend**: Next.js App Router with TypeScript
- **Backend**: FastAPI
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth (JWT)

Deviation from this approved stack is strictly forbidden without a formal Architectural Decision Record (ADR) and explicit approval from the project architect.

### 2.2. Security Principles

#### Principle: JWT-based Authentication Mandatory
All user authentication for the web application MUST be implemented using JSON Web Tokens (JWT). This includes secure token generation, storage, transmission, and validation.

#### Principle: User Data Isolation is Critical
Mechanisms MUST be in place to ensure strict isolation of user data. A user MUST only be able to access or modify data that they own or are explicitly authorized to access. Authorization checks MUST be implemented at every data access layer.

### 2.3. Coding Constraints

#### Principle: No Manual Coding by Humans
All code generation, modification, and maintenance MUST be performed exclusively by automated agents following approved specifications. Manual human intervention in the codebase is strictly prohibited, except for agent development and oversight.

## 3. Scope Boundaries (Phase-2 Todo Full-Stack Web App)

The "Phase-2 Todo Full-Stack Web App" project aims to deliver a multi-user, web-based todo application with robust authentication and data persistence. It will extend the conceptual functionality of the Phase-1 CLI todo application into a full-stack environment.

**In Scope:**
- Development of a multi-user web application for managing todo items.
- User registration, login, and secure session management using JWT.
- CRUD (Create, Read, Update, Delete) operations for personal todo items.
- Data persistence using Neon Serverless PostgreSQL via SQLModel and FastAPI.
- A modern, responsive user interface built with Next.js App Router and TypeScript.
- Automated testing for all components (unit, integration, end-to-end).

**Out of Scope:**
- Modification or direct integration of the Phase-1 CLI todo application.
- Real-time collaboration features (e.g., live updates without page refresh).
- Advanced task features such as recurring tasks, sub-tasks, or task sharing beyond basic personal management.
- Offline capabilities.
- Complex reporting or analytics.
- Integration with third-party services (e.g., calendars, email).

## 4. Governance

### 4.1. Amendment Procedure

Amendments to this constitution MUST be proposed via an Architectural Decision Record (ADR), reviewed by relevant stakeholders, and approved by the project architect. All amendments MUST result in a version bump according to semantic versioning rules.

### 4.2. Versioning Policy

This constitution adheres to semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR** version increments for backward-incompatible changes, redefinition of core principles, or removal of significant sections.
- **MINOR** version increments for adding new principles, materially expanding guidance, or introducing new sections.
- **PATCH** version increments for clarifications, wording refinements, typo fixes, or non-semantic adjustments.

### 4.3. Compliance Review

Adherence to this constitution WILL be reviewed at major project milestones and during code reviews. Any non-compliance MUST be addressed immediately.