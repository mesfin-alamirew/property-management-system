# Project Notes

# Project

Name: Property Management System (PMS)

Purpose:
An enterprise-grade Property Management System developed using
Next.js, Prisma, and PostgreSQL following a feature-based,
Clean Architecture-inspired approach with reusable development
patterns and standardized master data modules.

## Decision 001

### OrganizationUnit uses a self-referencing hierarchy.

Reason:

Supports Headquarters, Regional Offices, Country Offices, Project Offices, and future expansion without redesigning the schema.

---

## Decision 002

Reference data uses soft deletion through `isActive`.

Reason:

Historical records must remain valid while preventing accidental removal of referenced data.

---

## Decision 003

Business identifiers are separated from database identifiers.

Examples:

Country.code
OrganizationUnit.code
Property.propertyCode

## Decision: Functional Implementation Style

The application will use functional programming patterns by default.

Reasons:

- React and Next.js ecosystems are function-oriented.
- Server Actions naturally map to functions.
- Services and repositories do not maintain internal state.
- Reduces boilerplate and improves readability.

Implementation rules:

- Use exported functions instead of service/repository classes.
- Avoid unnecessary object instantiation.
- Keep dependencies explicit through function imports.
- Introduce classes only when a concrete requirement appears.

## Decision: Functional Implementation Style

The application uses functional programming patterns by default.

Use functions for:

- Services
- Repositories
- Server Actions
- Utilities

Exceptions:

Classes may be used when they represent a type or runtime identity.

Examples:

- Custom Error classes
- Framework-required classes

Reason:

Some JavaScript/TypeScript features rely on object identity and inheritance.

## UI/UX Development Approach

The first implementation phase focuses on functionality, architecture, and business workflows.

After completing the core modules, a dedicated UI/UX refinement phase will be conducted.

The refinement phase will include:

- Application layout improvement
- Navigation experience
- Dashboard design
- Color system
- Typography
- Icons
- Empty states
- Loading states
- Error states
- Responsive behavior
- Accessibility improvements
- Consistent component design

# Master Data Development Standard

## Overview

All master data modules follow a consistent feature-based architecture.
The goal is to maintain separation of concerns, reusability, and predictable development patterns.

Implemented reference modules:

- Property Type
- Country

## Feature Structure

Each master data feature follows:

features/{entity}/

- actions/
- commands/
- components/
- queries/
- repositories/
- schemas/

## Layer Responsibilities

### Schema Layer

Responsible for:

- input validation
- data normalization

Does not:

- access database
- contain business rules

### Repository Layer

Responsible for:

- Prisma/database operations

Does not:

- validate business rules
- handle UI concerns

### Command Layer

Responsible for:

- business rules
- duplicate checking
- entity existence validation
- domain exceptions

### Action Layer

Responsible for:

- server-client boundary
- schema parsing
- invoking commands
- cache revalidation

### Component Layer

Pattern:

Page
↓
Workspace
↓
Table + Dialog
↓
Form

Responsibilities:

Page:

- server component
- data fetching

Workspace:

- client state management
- dialog control

Table:

- display records
- trigger actions

Dialog:

- modal container

Form:

- validation
- create/update submission

## Shared Master Data Components

Reusable components:

- MasterDataLayout
- StatusBadge
- RowActionButtons
- ConfirmationDialog

## Standard Operations

Every master data module should support:

- List
- Create
- Edit
- Deactivate (soft delete)

## Reference Implementation

Property Type was the first reference implementation.

Country validated that the same architecture can be reused.

Master Data Standards

## Type I

Independent Master Data

Reference:
Property Type

## Type II

Hierarchical Master Data

Reference:
Region

Master Data Module Checklist

Database
☐ Prisma model
☐ Migration
☐ Indexes
☐ Relationships

Backend
☐ Repository
☐ Commands
☐ Queries
☐ Actions

Frontend
☐ Workspace
☐ Table
☐ Dialog
☐ Form

UX
☐ Search
☐ Status badge
☐ Row actions
☐ Confirmation dialog
☐ Loading state

Documentation
☐ Database
☐ Business rules
☐ API
☐ Architecture

Validation
☐ Create
☐ Edit
☐ Activate/Deactivate
☐ Search

Git
☐ Commit milestone

features/
├── asset-category/
│ ├── actions/
│ ├── commands/
│ ├── components/
│ ├── queries/
│ ├── repositories/
│ └── schemas/
└── types/
│
├── asset-type/
│ ├── actions/
│ ├── commands/
│ ├── components/
│ ├── queries/
│ ├── repositories/
│ └── schemas/
└── types/
│
├── asset-status/
│ ├── actions/
│ ├── commands/
│ ├── components/
│ ├── queries/
│ ├── repositories/
│ └── schemas/
└── types/
│
├── asset-condition/
│ ├── actions/
│ ├── commands/
│ ├── components/
│ ├── queries/
│ ├── repositories/
│ └── schemas/
└── types/
│
└── asset/
├── actions/
├── commands/
├── components/
├── queries/
├── repositories/
└── schemas/
└── types/
