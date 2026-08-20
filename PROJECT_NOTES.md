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

Prisma Model → Types → Schema → Repository → Commands → Queries → Actions → Form → Dialog → Table → Workspace → Page → Route → Test → Commit → Push

//////////
And the architectural grouping remains:

features/
├── administration/
├── assets/
├── buildings/
├── properties/
├── ownerships/
├── acquisition/
├── assignment/
├── location/
├── verification/
├── maintenance/
├── incidents/
├── disposal/
└── reporting/

////////
Asset Registry Business Rule
BR-001 Asset Code → Required, unique, system-generated
BR-002 Asset Tag → Optional, unique when provided
BR-003 Asset Name → Required
BR-004 Asset Type → Must reference an active Asset Type
BR-005 Asset Status → Must reference an active Asset Status
BR-006 Asset Condition → Must reference an active Asset Condition
BR-007 Serial Number → Optional; uniqueness to be finalized
BR-008 Asset Code → Immutable after creation
BR-009 Asset Type → Controlled update
BR-010 Deactivation → Soft delete; disposal is a separate process

////Our working rules are now:

Follow the AMS roadmap.
Resolve dependencies first within each roadmap item.
Reuse approved code and conventions—paths, names, types, schemas, repository patterns, shared components, etc.
No silent assumptions.
One layer at a time.
Test each increment before moving forward.
Commit and push after a completed increment.

/////
┌────────────────────┐
│ Asset │
│ │
│ id │
│ assetCode │
│ statusId │
│ conditionId │
└─────────┬──────────┘
│
│
▼
┌────────────────────────────┐
│ AssetAssignment │
│ │
│ id │
│ assetId │
│ employeeId │
│ assignedAt │
│ returnedAt │
│ status │
│ assignedByUserId │
│ returnedByUserId │
│ conditionAtAssignment │
│ conditionAtReturn │
│ handoverReference │
│ remarks │
│ createdAt │
│ updatedAt │
└───────────┬────────────────┘
│
▼
┌────────────────────┐
│ Employee │
│ │
│ id │
│ employeeNumber │
│ name │
│ organizationUnitId │
│ isActive │
└────────────────────┘

////
┌──────────────────────┐
│ Authentication Layer │
│ │
│ Azure AD / Other │
└──────────┬───────────┘
│
▼
┌──────────────┐ ┌──────────────┐
│ Employee │ 0..1 │ User │
│ ├───────┤ │
│ employeeNo │ │ application │
│ name │ │ identity │
│ orgUnit │ │ isActive │
└──────────────┘ └──────┬───────┘
│
│ 1..\*
▼
┌──────────────┐
│ UserRole │
└──────┬───────┘
│
▼
┌──────────────┐
│ Role │
└──────────────┘

                       //////

┌────────────────────┐
│ User │
│ │
│ id │
│ employeeId ? │
│ username │
│ displayName │
│ isActive │
│ createdAt │
│ updatedAt │
└─────────┬──────────┘
│
│ 1..\*
▼
┌────────────────────┐
│ UserRole │
│ │
│ id │
│ userId │
│ roleId │
│ assignedAt │
│ assignedByUserId │
│ removedAt │
│ removedByUserId │
└─────────┬──────────┘
│
│
▼
┌────────────────────┐
│ Role │
│ │
│ id │
│ code │
│ name │
│ description │
│ isActive │
│ createdAt │
│ updatedAt │
└────────────────────┘
/////

                 Authentication
                       │
                       ▼
                     User
                       │
                       ▼
              Server Action
                       │
                 validation
                       │
                       ▼
                  Command
                       │
              requirePermission()
                       │
                       ▼
          Authorization Service
                       │
                       ▼
          Authorization Repository
                       │
                       ▼
                    Prisma
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
       UserRole                 Permission
          │                         ▲
          ▼                         │
         Role ─────────── RolePermission


         //////
         User → UserRole → Role → RolePermission → Permission

         //////
         Server Action
     ↓

Command
↓
requirePermission()
↓
Authorization Service
↓
Authorization Repository

          Authentication Provider
                    │
                    ▼
               AuthProvider
                    │
                    ▼
              AuthIdentity
                    │
                    ▼
              UserIdentity
                    │
                    ▼
                  User
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
       Employee           UserRole
                              │
                              ▼
                            Role
                              │
                              ▼
                        Permission

This is the right dependency order:

Prisma Identity Model
↓
Identity Repository
↓
Identity Mapping Service
↓
Authentication Service
↓
Server Action
↓
Building Command
↓
Authorization

Current approved roadmap

1. AuthProvider enum ← approved
2. UserIdentity model ← approved
3. User.identities relation ← approved
4. Prisma migration
5. UserIdentity repository
6. Identity mapping service
7. Authentication service
8. Server Action integration
9. Building Command integration
10. Verify full authentication → authorization flow

//
┌─────────────────────────────┐
│ Authentication Provider │
│ implementation │
└──────────────┬──────────────┘
│
▼
AuthProviderAdapter
│
▼
AuthIdentity
├── provider
├── externalId
├── username?
└── displayName?
│
▼
Identity Mapping Service
│
▼
UserIdentity Repository
│
▼
AuthenticatedUser
├── id
├── employeeId
├── username
└── displayName

Complete Flow

Authentication Provider
│
▼
AuthProviderAdapter
│
▼
AuthIdentity
(provider + externalId)
│
▼
resolveAuthenticatedUser()
│
▼
findUserByIdentity()
│
▼
AuthenticatedUser

////
AuthProvider enum
│
▼
AuthIdentity
│
▼
AuthProviderAdapter
│
▼
AuthenticationService
│
▼
Identity Mapping Service
│
▼
UserIdentity Repository
│
▼
AuthenticatedUser

////User
│
├── UserIdentity[]
│ │
│ └── External identity
│
├── Session[]
│ │
│ └── Current application session
│
└── UserRole[]
│
└── Authorization

/////
Authentication
✅ DevAuthProvider
✅ UserIdentity resolution
✅ Session creation
✅ Session cookie
✅ getCurrentUser()

Authorization
✅ requirePermission()
✅ CREATE
✅ UPDATE
✅ DEACTIVATE

Building
✅ Server Actions pass user.id
✅ Commands receive user.id
✅ Business rules remain in commands
✅ Repository remains database-only
✅ Lint
✅ Build

Server Action
↓
Authentication
↓
Command
↓
Authorization
↓
Business Rules
↓
Repository
↓
Database

URRENT PMS ARCHITECTURE

                    PMS
                     │
          ┌──────────┴──────────┐
          │                     │
     Authentication        Authorization
          │                     │
     UserIdentity          Permission
          │                     │
       Session             UserRole
          │                     │
          └──────────┬──────────┘
                     │
               Server Actions
                     │
                  Commands
                     │
                Repositories
                     │
                  Prisma
                     │
                PostgreSQL

🎯 The 5 concepts I particularly want you to grasp

If you don't remember everything tomorrow, focus on these five:

1. Authentication

Who is the user?

2. Authorization

What is the user allowed to do?

3. Session

How does the application remember the authenticated user between requests?

4. Separation of responsibilities

Action → Authentication → Command → Authorization/Business Rules → Repository → Database

5. Debugging by proving assumptions

Instead of immediately changing code:

Error
↓
What does it actually say?
↓
Which layer produced it?
↓
Can I independently verify the assumption?
↓
Only then change the code

That fifth one is especially valuable for the kind of enterprise system we're building.

//////
┌──────────────────┐
│ Server Action │
└────────┬─────────┘
│
▼
requireCurrentUser()
│
▼
┌──────────────────┐
│ Authenticated │
│ User │
└────────┬─────────┘
│ user.id
▼
Building Service
│
▼
requirePermission()
│
▼
Authorization
│
▼
Business Rules
│
▼
Building Repository
│
▼
Prisma

////
🔐 Centralized authentication through (dashboard)/layout.tsx
🍪 Database-backed sessions with secure HTTP-only cookies
🚪 Reusable logout action
👤 Current-user resolution
🛡️ Role → Permission authorization
🔒 Server-side permission enforcement inside commands
🏗️ Building CRUD already protected
📦 A structure that can scale to Properties, Assets, Units, Maintenance, Reports, and other PMS modules

/////
Prisma Model
↓
Types
↓
Schema
↓
Repository
↓
Commands
├── Authentication
└── Authorization
↓
Queries
↓
Actions
└── Authentication/session check where appropriate
↓
Form
↓
Dialog
↓
Table
↓
Workspace
↓
Page
↓
Route
↓
Test
↓
Commit
↓
Push
