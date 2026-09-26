# Property Management System (PMS)

## V1 Design & Implementation Handbook

**Version:** 1.0  
**Status:** V1 Complete  
**Git Baseline:** `9a3885a` — `Complete PMS V1 implementation`  
**Branch:** `main`

---

## Purpose

This handbook documents the implemented architecture, domain model, business rules, authorization, audit, document management, reporting, testing, deployment, development standards, and future direction of the PMS V1 implementation.

This document describes the implemented V1 system and should not be interpreted as a specification for unimplemented future functionality.

Property Management System (PMS)

V1 Design & Implementation Handbook

1. Document Purpose

1.1 Purpose

This handbook is the authoritative technical and implementation reference for Version 1 (V1) of the Property Management System (PMS).

It documents the system as implemented and validated at the completion of the V1 development cycle. It describes the application's architecture, modules, database/domain model, authorization model, business rules, audit design, document management, reporting, security practices, deployment considerations, development conventions, and operational responsibilities.

The handbook is intended to provide a common reference for:

PMS developers

System administrators

Application administrators

Technical reviewers

Future maintainers

Personnel responsible for deployment and operations

Future V2 planning

1.2 Documentation Principle

This handbook documents implemented V1 behavior, rather than proposed future behavior.

Where a possible improvement, architectural enhancement, or business-rule refinement has not been implemented or formally established, it is treated as a future consideration rather than part of the V1 specification.

This distinction is important because PMS V1 has been developed with a deliberate focus on:

Functional correctness

Business-rule enforcement

Authorization

Transaction integrity

Accountability and auditability

Data integrity

Operational usability

Comprehensive visual/UI refinement and broader architectural enhancements may be considered in subsequent versions.

1.3 V1 Baseline

The V1 implementation was committed to the main Git branch as:

Commit: 9a3885a
Message: Complete PMS V1 implementation

The V1 commit represents the validated implementation baseline from which future changes should be developed.

1.4 Intended Use

The PMS is intended to support organizational management of:

Properties

Buildings

Building spaces

Assets

Asset acquisition

Asset locations

Asset assignments

Asset movements

Physical verification

Maintenance

Incidents

Retirement

Disposal

Employees

Documents

System configuration

Reporting

Audit records

Application authorization

2. PMS Overview

2.1 System Definition

The Property Management System (PMS) is a web-based enterprise application designed to manage organizational property, buildings, spaces, physical assets, asset accountability, operational activities, supporting documentation, and management reporting.

The system provides a centralized application through which authorized users can manage property and asset information while maintaining controlled access to business operations.

2.2 Organizational Context

The PMS supports an organization that may contain:

Headquarters

Offices

Organizational units

Properties in different locations

Buildings associated with properties

Building spaces

Employees

Physical and operational assets

The system therefore separates organizational structure from physical property structure while providing relationships between them.

A simplified conceptual relationship is:

Organization
│
├── Organization Units
│ │
│ └── Properties
│ │
│ └── Buildings
│ │
│ └── Building Spaces
│
└── Employees
│
└── Asset Assignments

Assets
│
├── Acquisition
├── Location
├── Movement
├── Assignment
├── Physical Verification
├── Maintenance
├── Incident
├── Retirement
└── Disposal

This structure allows PMS to represent both the physical property environment and the accountability lifecycle of organizational assets.

2.3 Major Functional Areas

PMS V1 contains the following major functional areas.

Administration

Administration provides foundational organizational and system-management functionality, including:

Countries

Regions

Zones

Woredas

Organization Units

Employees

Roles

Role permissions

User roles

System Administrators

System Settings

Property Management

Property management provides functionality for:

Property categories

Property statuses

Property tenures

Property types

Properties

Ownership

Ownership types

Building Management

Building management provides functionality for:

Building types

Building conditions

Buildings

Building space types

Building spaces

Asset Management

Asset management provides:

Asset types

Asset categories

Asset statuses

Asset conditions

Asset locations

Assets

Acquisition Management

Acquisition functionality covers:

Acquisition methods

Acquisitions

Acquisition items

Asset Accountability

Asset accountability covers:

Employee records

Asset assignments

Asset returns

Asset movements

Asset locations

Verification

Physical verification functionality covers:

Verification records

Verification items

Unregistered asset observations

Operational Management

Operational management covers:

Maintenance

Maintenance services

Incidents

Incident resolution

Retirement and Disposal

The PMS provides controlled workflows for:

Asset retirement

Retirement requests

Retirement approval

Retirement cancellation

Asset disposal

Disposal requests

Disposal approval

Disposal cancellation

Disposal items

Document Management

Document Management provides:

Document types

Document records

File uploads

Document versions

Version downloads

Protected document access

Azure Blob Storage integration

Reporting

Reporting provides management-oriented reports for:

Assets

Acquisitions

Assignments

Accountability

Physical verification

Maintenance

Incidents

Movements

Retirement

Disposal

Audit

Dashboard information

2.4 Core Design Objective

The central design objective of PMS V1 is to ensure that important business operations are performed through controlled application workflows rather than unrestricted database manipulation.

The application therefore combines:

User Authentication
↓
Authorization
↓
Business Validation
↓
Database Transaction
↓
Audit Event where required
↓
Updated Business State

This approach is particularly important for operations involving:

Asset accountability

Asset movement

Retirement

Disposal

Maintenance workflow

Incident workflow

Role administration

System administration

System configuration

Document lifecycle

2.5 V1 Design Priorities

The V1 implementation prioritizes:

Functional correctness

Business operations must work according to their defined workflows.

Authorization

Users must possess the required permission before accessing protected operations.

Business-rule enforcement

Important rules are enforced server-side rather than relying exclusively on UI behavior.

Transaction integrity

Related database changes and corresponding audit records are performed within the same transaction where audit is required.

Accountability

Important organizational and operational changes can be traced to the user who performed them.

Data integrity

The application validates relationships, active/inactive states, uniqueness requirements, lifecycle states, and other domain constraints.

Controlled administration

System-level privileges are explicitly managed rather than implicitly granted to every administrator.

3. Technology Stack

3.1 Application Framework

The PMS is implemented using Next.js with the App Router.

The application uses:

Next.js App Router

React

TypeScript

Server Components where appropriate

Server Actions for application mutations

Route handlers for selected API/file operations

The App Router provides the application routing structure and supports server-side application behavior.

3.2 Programming Language

The primary programming language is:

TypeScript

The project follows a strongly typed implementation approach.

The codebase intentionally avoids:

any

Class-based application architecture

Unnecessary abstraction layers

Functional programming patterns and functional React components are preferred.

3.3 Database

The PMS uses:

PostgreSQL

PostgreSQL provides the persistent relational data store for:

Users

Roles

Permissions

Organization structure

Properties

Buildings

Assets

Acquisitions

Assignments

Operational records

Documents and document metadata

Audit logs

System settings

Supporting master data

3.4 ORM

The application uses:

Prisma ORM 7.9.1

The Prisma schema is located at:

prisma/schema.prisma

The project uses Prisma migrations for database schema evolution.

The Prisma client is generated under the project's generated Prisma client location and is imported through the project's configured alias.

3.5 Database Configuration

The project uses the Prisma 7 configuration model with:

prisma.config.ts

The database connection configuration is handled through the Prisma configuration rather than placing the datasource URL directly in the Prisma schema.

Database migrations are maintained under:

prisma/migrations/

3.6 Styling

The PMS uses:

Tailwind CSS v4

Tailwind is used for application styling and layout.

The project does not use shadcn/ui.

3.7 UI Component Library

The PMS uses Radix UI where accessible and reusable UI primitives are appropriate.

Examples include:

Dialogs

Tables

Interactive controls

Accessible UI primitives

Shared components are used to maintain consistent behavior across modules.

3.8 Authentication

The PMS uses Azure authentication for user identity.

Authentication establishes the identity of the current user.

Authentication and authorization are treated as separate concerns:

Authentication
↓
Who is the user?

Authorization
↓
What is the user allowed to do?

3.9 Application Authorization

Authorization is implemented within the PMS application using:

Users
↓
User Roles
↓
Roles
↓
Permissions

Permission checks are performed server-side.

The authorization foundation is located under:

src/lib/authorization/

Key components include:

authorization.repository.ts
authorization.service.ts
authorization.types.ts
permission-catalog.ts

3.10 File Storage

Document binary files are stored using:

Azure Blob Storage

PostgreSQL stores document metadata and version information.

The application therefore separates:

Database
→ document metadata, relationships, lifecycle

Azure Blob Storage
→ binary file content

This design prevents large binary files from being stored directly inside PostgreSQL.

3.11 Validation

The PMS uses schema-based validation for application input.

The implementation uses:

Zod

Validation is applied before business operations are executed.

Business validation is additionally performed in server-side commands because client-side validation alone is not considered sufficient protection.

3.12 Forms

Interactive forms use:

React Hook Form

with schema-based validation.

Forms are designed to:

Validate user input

Display validation errors

Prevent duplicate submissions

Display operation feedback

Refresh relevant application state after successful operations

3.13 Notifications

The application uses toast notifications for user-facing operation feedback.

These are used to communicate:

Successful operations

Validation failures

Business-rule failures

Unexpected operation errors

3.14 Development Validation

The V1 implementation was validated using TypeScript compilation checks.

The final V1 validation included:

npx tsc --noEmit

which completed successfully before the V1 commit.

The final V1 repository was then committed and pushed to the remote Git repository.

End of Sections 1–3

These sections establish the purpose, scope, architectural intent, and technology foundation of PMS V1.

The next handbook section should document the actual project architecture and folder organization, including the relationship between:

src/app/
src/features/
src/components/
src/lib/
prisma/
docs/

and the established feature implementation flow:

Prisma Model
↓
Types
↓
Schema
↓
Repository
↓
Commands
↓
Queries
↓
Actions
↓
Components
↓
Workspace/Page

4. System Architecture

4.1 Architectural Overview

PMS V1 follows a feature-oriented application architecture built on the Next.js App Router.

The architecture separates:

Routing

UI components

Feature business logic

Data access

Authorization

Audit

Authentication

Infrastructure services

Database persistence

A simplified architecture is:

┌──────────────────────────────────────────────┐
│ Browser / UI │
│ │
│ Pages → Workspaces → Forms / Tables / Dialogs│
└──────────────────────┬───────────────────────┘
│
▼
┌──────────────────────────────────────────────┐
│ Next.js Application │
│ │
│ Server Actions / Route Handlers │
│ │ │
│ ▼ │
│ Commands / Queries │
│ │ │
│ ├──── Authorization │
│ ├──── Validation │
│ ├──── Business Rules │
│ └──── Audit │
│ │ │
│ ▼ │
│ Repositories │
└──────────────────────┬───────────────────────┘
│
┌─────────┴──────────┐
▼ ▼
PostgreSQL Azure Blob
via Prisma Storage

4.2 Architectural Responsibilities

Each architectural layer has a defined responsibility.

Application Routes

Routes are responsible primarily for:

Exposing application pages

Connecting URL paths to feature pages

Providing API endpoints where required

Routes should not contain large amounts of domain business logic.

Pages

Pages establish the server-side entry point for a feature.

A protected page typically:

Obtains the current authenticated user.

Executes the required query.

Handles authorization failures.

Provides data to the feature UI.

Components

Components are responsible for presentation and user interaction.

Examples include:

Forms

Tables

Dialogs

Workspaces

Page components

Status displays

Row actions

Components should not be treated as the authoritative enforcement point for business rules.

A UI restriction is useful for usability, but the corresponding server-side operation must still enforce the rule.

Actions

Server Actions provide the application boundary for UI-triggered mutations.

A typical action flow is:

UI
↓
Server Action
↓
Input Validation
↓
Current User
↓
Command
↓
Revalidation
↓
UI Refresh

Commands

Commands contain the principal business-operation logic.

Commands are responsible for:

Authorization

Entity existence checks

Business-rule validation

Transaction boundaries

Calling repositories

Recording audit events where required

Examples include:

createAsset
updateAsset
createAcquisition
requestRetirement
approveDisposal
assignAsset
returnAsset
moveAsset

Queries

Queries provide read operations.

Queries are responsible for:

Retrieving data

Applying appropriate filtering

Loading related data

Enforcing read authorization where required

Queries do not perform business mutations.

Repositories

Repositories isolate Prisma/database access.

Repositories are responsible for:

Database queries

Database writes

Relation loading

Transaction-bound persistence operations

Repositories should not independently bypass the authorization layer.

Shared Libraries

Cross-cutting functionality is maintained under:

src/lib/

Examples include:

src/lib/auth/
src/lib/authorization/
src/lib/audit/
src/lib/errors/
src/lib/prisma/
src/lib/storage/

These services provide reusable infrastructure without coupling individual features to unrelated modules.

5. Application Structure

5.1 Top-Level Project Structure

The PMS project is organized approximately as follows:

property-management-system/
│
├── docs/
│
├── prisma/
│ ├── migrations/
│ ├── schema.prisma
│ └── seed.ts
│
├── scripts/
│
├── src/
│ ├── app/
│ ├── components/
│ ├── features/
│ ├── generated/
│ └── lib/
│
├── next.config.ts
├── package.json
├── prisma.config.ts
└── tsconfig.json

5.2 src/app

The src/app directory contains the Next.js App Router structure.

It provides:

Application routes

Dashboard pages

Administration pages

Report pages

Document API routes

Other route-level entry points

Route groups are used where appropriate to organize related application routes without affecting their public URL structure.

For example:

src/app/(dashboard)/

is a Next.js route group.

The parentheses are therefore a routing mechanism and are not intended to represent a feature architecture pattern.

5.3 src/features

Feature functionality is organized under:

src/features/

Each major business capability has its own feature area.

Typical feature structure:

feature/
├── actions/
├── commands/
├── components/
├── queries/
├── repositories/
├── schemas/
└── types/

Not every feature requires every directory.

Directories are introduced according to actual feature requirements rather than as mandatory boilerplate.

5.4 Feature-Oriented Organization

The feature structure keeps business functionality close to the domain to which it belongs.

Examples:

src/features/assets/
src/features/acquisition/
src/features/building/
src/features/properties/
src/features/ownership/
src/features/asset-assignment/
src/features/reports/
src/features/document/
src/features/administration/

This makes it possible to locate the implementation of a business capability without searching through one large global collection of commands or components.

5.5 Cross-Cutting Libraries

Cross-cutting functionality is placed under:

src/lib/

Examples:

Authentication

src/lib/auth/

Provides current-user authentication functionality.

Authorization

src/lib/authorization/

Provides:

Permission definitions

Permission checks

Authorization service

Authorization repository

Authorization types

Audit

src/lib/audit/

Provides:

Audit types

Audit repository

Audit service

Error Handling

src/lib/errors/

Provides application-level error handling.

Database

src/lib/prisma/

Provides the configured Prisma database client.

Storage

src/lib/storage/

Provides the storage abstraction and Azure Blob Storage implementation.

5.6 Shared UI Components

Reusable application-wide UI components are maintained under:

src/components/

Examples include:

src/components/common/
src/components/layouts/
src/components/ui/

Shared components include functionality such as:

Status badges

Row action buttons

Confirmation dialogs

Master-data layouts

Buttons

Table primitives

Form controls

Access-denied display

The purpose of shared components is to prevent repeated UI implementations and maintain consistent behavior.

5.7 Database Structure

Database-related implementation is maintained under:

prisma/

The main schema is:

prisma/schema.prisma

Database changes are tracked through Prisma migrations:

prisma/migrations/

Initial and reference data is handled through:

prisma/seed.ts

5.8 Document Structure

Project documentation is maintained under:

docs/

The PMS handbook is intended to become the principal V1 technical reference.

Other project documentation may cover areas such as:

Architecture

Database

Business rules

API behavior

Deployment

Change history

Development notes

5.9 Standard Feature Implementation Flow

PMS development follows a deliberate implementation order:

Prisma Model
↓
Types
↓
Schema
↓
Repository
↓
Commands
↓
Queries
↓
Actions
↓
Forms
↓
Dialogs
↓
Tables
↓
Workspace
↓
Page
↓
Route
↓
Test

This order is not a rigid requirement for every small change, but it represents the preferred development pattern for new business features.

5.10 Why the Feature Structure Is Used

The feature-oriented structure provides several advantages:

Domain locality

Related business logic remains together.

Maintainability

Developers can locate commands, queries, schemas, and components for a feature without navigating unrelated modules.

Authorization clarity

Permission enforcement remains close to the business operation it protects.

Reduced coupling

Features do not need to depend on a large centralized service layer.

Controlled growth

New features can be added without turning global directories into large collections of unrelated files.

6. Feature and Module Map

6.1 Module Overview

PMS V1 consists of the following principal functional areas:

Administration
Property Management
Ownership Management
Building Management
Asset Management
Acquisition Management
Asset Assignment
Physical Verification
Maintenance
Incident Management
Retirement
Disposal
Document Management
System Settings
Reporting
Audit

The following sections describe their V1 responsibilities.

6.2 Administration

Administration provides foundational organizational and application-management functionality.

Organizational master data

Includes:

Country

Region

Zone

Woreda

Organization Unit

Personnel

Includes:

Employee management

Security administration

Includes:

Role management

Role permissions

User-role assignments

System Administrator management

System configuration

Includes:

System Settings

6.3 Property Management

Property Management represents organizational properties.

It includes:

Property
Property Type
Property Category
Property Status
Property Tenure

Properties are associated with organizational units and may be associated with ownership and buildings.

Property lifecycle operations include controlled:

Creation

Update

Deactivation

where applicable.

6.4 Ownership Management

Ownership functionality represents property ownership information.

It includes:

Ownership
Ownership Type

Ownership records are associated with properties.

The implementation includes business rules such as preventing multiple active ownership records for the same property where that rule applies.

6.5 Building Management

Building management represents physical buildings associated with properties.

It includes:

Building
Building Type
Building Condition
Building Space Type
Building Space

Buildings may contain spaces and include physical characteristics such as:

Floors

Basements

Floor area

Usable area

Rooms

Units

Parking capacity

Accessibility information

Construction/renovation information

Building spaces are associated with their parent building and space type.

6.6 Asset Management

Asset Management is one of the core PMS domains.

It includes:

Asset
Asset Type
Asset Category
Asset Status
Asset Condition
Asset Location

An asset has an organizationally unique asset code and may additionally have an asset tag.

Assets can participate in several downstream business processes:

Asset
├── Acquisition
├── Assignment
├── Movement
├── Physical Verification
├── Maintenance
├── Incident
├── Retirement
└── Disposal

6.7 Acquisition Management

Acquisition functionality represents the process through which assets are acquired.

It includes:

Acquisition
Acquisition Item
Acquisition Method

An acquisition can contain multiple acquisition items.

Acquisition data may include:

Acquisition number

Acquisition date

Acquisition method

Supplier

Reference number

Funding source

Total amount

Currency

Description

Notes

Decimal monetary values are handled using Prisma Decimal types and converted appropriately at application boundaries.

6.8 Asset Assignment

Asset Assignment manages accountability of assets assigned to employees.

It includes:

Employee
Asset Assignment
Asset Return

An assignment records information such as:

Asset

Employee

Assignment date

Assigning user

Return date

Returning user

Notes

The current implementation enforces the business rule that an asset cannot have multiple active assignments simultaneously.

The system does not impose a rule that an employee can possess only one asset.

6.9 Asset Movement

Asset Movement records physical movement of an asset between locations.

A movement includes:

Asset

Previous location

Destination location

User performing the movement

Reason

Notes

Movement timestamp

The movement operation updates the asset's current location within the same transaction.

This maintains consistency between:

Movement history +
Current asset location

6.10 Physical Verification

Physical Verification supports the process of checking physical assets against registered asset records.

It includes:

Physical Verification
Physical Verification Item
Unregistered Asset Observation

The verification process provides a controlled mechanism for recording physical findings without directly modifying unrelated asset data.

6.11 Maintenance

Maintenance manages asset maintenance activities.

The V1 implementation supports workflow operations including:

Create
Update
Request
Assign
Approve
Start
Complete

Maintenance records may also contain associated maintenance services.

The implementation applies authorization and lifecycle rules to these workflow operations.

6.12 Incident Management

Incident Management records and manages asset-related incidents.

The active incident-resolution architecture separates incident resolution into its dedicated workflow.

The implemented workflow supports operations such as:

Create
Update
Report
Assign
Start
Resolve
Close
Cancel

Incident resolution records are associated with the incident being resolved.

6.13 Retirement

Retirement manages the controlled lifecycle of assets proposed for retirement.

The V1 workflow includes:

DRAFT
↓
REQUESTED
↓
APPROVED

Cancellation is available from the appropriate pre-approval states.

The retirement process includes authorization and audit recording.

A retirement request is created only for an eligible asset according to the implemented retirement rules.

6.14 Disposal

Disposal manages controlled asset disposal processes.

The implemented lifecycle is:

DRAFT
↓
REQUESTED
↓
APPROVED

Cancellation is supported from:

DRAFT
REQUESTED

Disposal items associate assets with disposal records.

The implementation prevents an asset from being included in multiple disposal records according to the implemented business validation.

Disposal workflow operations are authorized, transactional, and audited.

6.15 Document Management

Document Management is a cross-cutting capability.

It includes:

Document Type
Document
Document Version
Document File

The system supports document files including:

PDF
DOCX
XLSX
JPG
JPEG
PNG
WEBP

Document binary data is stored in Azure Blob Storage while metadata is stored in PostgreSQL.

Document versions are immutable once created.

A document maintains a reference to its current version.

The system also supports protected download operations requiring appropriate authorization.

6.16 System Settings

System Settings provides controlled configuration of application-level settings.

V1 includes configuration for document upload limits through the system setting:

DOCUMENT_MAX_FILE_SIZE_MB

The default configured document maximum is:

25 MB

System settings are protected by:

SYSTEM_SETTING:READ
SYSTEM_SETTING:UPDATE

Changes to important system configuration are audited.

6.17 Reporting

Reporting provides read-oriented management information.

V1 includes reporting areas for:

Asset
Acquisition
Assignment
Accountability
Verification
Maintenance
Incident
Movement
Retirement
Disposal
Audit
Dashboard

Report pages and their supporting queries are protected by the appropriate report permissions.

Read authorization is enforced at the server-side query/application boundary rather than relying solely on whether a navigation item is visible.

6.18 Audit

Audit is a cross-cutting accountability capability.

The system records important business events in:

AuditLog

Audit information includes:

Performing user

Action

Entity type

Entity ID

Description

Previous value where appropriate

New value where appropriate

Timestamp

Audit is intentionally selective.

The system does not assume that every database mutation requires an audit event.

Audit is applied primarily where the operation has meaningful:

Accountability

Governance

Security

Compliance

Lifecycle significance

Configuration significance

6.19 Authorization

Authorization is a cross-cutting capability shared by all protected modules.

The basic model is:

User
↓
UserRole
↓
Role
↓
Permission

Permissions are defined using resource/action combinations such as:

ASSET:READ
ASSET:CREATE
ASSET:UPDATE

DISPOSAL:REQUEST
DISPOSAL:APPROVE

ROLE:CREATE
ROLE:UPDATE

SYSTEM_ADMINISTRATOR:CREATE

DOCUMENT:READ
DOCUMENT:CREATE

REPORT_ASSET:READ

Authorization is enforced server-side.

The UI may hide unavailable operations for usability, but the server remains the authoritative enforcement point.

6.20 V1 Module Relationship

The major functional relationships can be summarized as:

                   ┌───────────────────┐
                    │  Administration   │
                    │ Users / Roles /   │
                    │ Permissions       │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    Properties     │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │     Buildings     │
                    │      / Spaces     │
                    └─────────┬─────────┘
                              │
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
      ┌──────────────┐                  ┌──────────────┐
      │    Assets    │                  │   Employees  │
      └──────┬───────┘                  └──────┬───────┘
             │                                 │
      ┌──────┼─────────────┐                   │
      │      │             │                   │
      ▼      ▼             ▼                   ▼

Acquisition Location Verification Assignment
│ │ │ │
│ ▼ │ │
│ Movement │ │
│ │ │
└──────────┬─────────┴───────────┬───────┘
│ │
▼ ▼
Maintenance Incidents
│ │
└──────────┬──────────┘
│
▼
Retirement / Disposal

          Documents / Audit / Reporting
                    cross-cut all
                    major domains

This relationship illustrates the central role of the Asset domain while preserving separation between property, organizational, operational, administrative, and reporting concerns.

7. Database and Domain Model

7.1 Database Architecture

PMS V1 uses PostgreSQL as its relational database and Prisma ORM as the application data-access layer.

The database is the authoritative source for persistent business data.

The principal database responsibilities are:

Maintaining entity relationships

Enforcing relational integrity

Maintaining unique constraints and indexes

Persisting business state

Storing audit records

Storing document metadata

Storing system configuration

Supporting reporting queries

The application performs additional business-rule validation before database mutations.

The general model is:

Application
│
▼
Business Validation
│
▼
Prisma
│
▼
PostgreSQL

7.2 Prisma Schema

The primary database definition is maintained in:

prisma/schema.prisma

Database evolution is managed through Prisma migrations.

The V1 implementation includes migrations for significant additions such as:

Document Management

System Settings

7.3 Domain Model

The PMS domain can be divided into several major groups.

Organizational domain

Country
Region
Zone
Woreda
OrganizationUnit
User
Employee

Property domain

Property
PropertyType
PropertyCategory
PropertyStatus
PropertyTenure
Ownership
OwnershipType

Building domain

Building
BuildingType
BuildingCondition
BuildingSpaceType
BuildingSpace

Asset domain

Asset
AssetType
AssetCategory
AssetStatus
AssetCondition
AssetLocation

Acquisition domain

Acquisition
AcquisitionItem
AcquisitionMethod

Accountability domain

AssetAssignment
AssetMovement
Employee

Verification domain

PhysicalVerification
PhysicalVerificationItem
UnregisteredAssetObservation

Operations domain

Maintenance
MaintenanceService
Incident
IncidentResolution

Lifecycle domain

Retirement
Disposal
DisposalItem

Document domain

Document
DocumentVersion
DocumentType

Administration domain

Role
Permission
UserRole
RolePermission
SystemSetting

Audit domain

AuditLog

7.4 Organizational Relationships

The organizational structure allows PMS to represent an organization containing multiple organizational units.

A simplified relationship is:

Country
│
└── Organization Unit
│
└── Property

Geographical master data such as regions, zones, and woredas provides supporting organizational/geographical information.

7.5 Property Relationships

A property belongs to an organizational context and may contain buildings.

Conceptually:

Organization Unit
│
▼
Property
│
├── Ownership
│
└── Buildings

Properties also reference relevant master data such as:

Property Type

Property Category

Property Status

Property Tenure

7.6 Building Relationships

A building belongs to a property.

Property
│
└── Building
│
└── Building Space

A building may reference:

Building Type

Building Condition

A building space references:

Parent Building

Building Space Type

7.7 Asset Relationships

The Asset entity is central to the operational portion of PMS.

A simplified relationship is:

Asset
├── Asset Type
├── Asset Category
├── Asset Status
├── Asset Condition
├── Asset Location
├── Acquisition Item
├── Assignments
├── Movements
├── Verification Items
├── Observations
├── Maintenance
├── Incidents
├── Retirement
└── Disposal Items

This structure allows an asset's operational history to be represented without putting every lifecycle concept into the Asset record itself.

7.8 Asset Identity

Assets use an application-generated asset code.

The asset code is generated when the asset is created and is not replaced during ordinary asset updates.

The system may also maintain an asset tag and serial number where applicable.

Uniqueness checks are performed during create/update operations.

7.9 Asset Location

Asset locations represent physical locations to which assets may be assigned.

An asset location contains information such as:

Code

Name

Organization Unit

Active/inactive state

Asset movement updates the current location of the asset while preserving movement history.

7.10 Acquisition Relationships

An acquisition can contain multiple acquisition items.

Acquisition
│
└── Acquisition Items
│
└── Asset

An acquisition records transaction-level information while an acquisition item associates individual assets with that acquisition.

Monetary fields use decimal-safe database types.

7.11 Asset Assignment

Asset assignments create accountability between an asset and an employee.

Employee
│
└── Asset Assignment
│
└── Asset

The current business rule prevents multiple active assignments for the same asset.

Returning an asset closes the active assignment.

The implementation intentionally does not restrict an employee to a single asset.

7.12 Asset Movement

Movement records represent changes in physical asset location.

Asset
│
├── Current Location
│
└── Movement History

A movement records:

Source location

Destination location

User

Reason

Notes

Movement time

The current Asset location is updated as part of the same database transaction.

7.13 Physical Verification

Physical verification separates the verification event from the asset itself.

This allows the system to record:

Verification sessions

Verified assets

Verification findings

Unregistered physical observations

This separation is important because a physical verification may identify an item that is not currently represented as a registered asset.

7.14 Maintenance and Incident Relationships

Maintenance and incidents are operational records associated with assets.

They maintain their own lifecycle and workflow data rather than changing the fundamental identity of the Asset record.

This provides historical traceability.

7.15 Retirement and Disposal Relationships

Retirement and disposal are separate lifecycle domains.

The V1 system does not assume that retirement or disposal automatically changes the Asset Status unless an explicit implemented business rule establishes that transition.

This is intentional.

Asset lifecycle workflow and Asset Status are therefore not automatically treated as interchangeable concepts.

7.16 Disposal Items

A Disposal may contain multiple Disposal Items.

Disposal
│
└── Disposal Item
│
└── Asset

Disposal item operations validate:

Disposal existence

Disposal state

Asset existence

Duplicate disposal participation

Updates may change the associated disposal or asset where the implemented business rules permit it.

7.17 Documents

Document Management separates metadata from binary storage.

The database stores information such as:

Document identity

Entity association

File metadata

Current version

Version history

Creation/update information

Lifecycle state

Binary file content is stored externally in Azure Blob Storage.

7.18 Document Versions

A document may have multiple versions.

Conceptually:

Document
│
├── Version 1
├── Version 2
├── Version 3
└── Current Version

Document versions are immutable after creation.

The current version is tracked by the Document record.

7.19 System Settings

System settings provide controlled application configuration.

The V1 implementation includes a configurable document upload size.

The setting:

DOCUMENT_MAX_FILE_SIZE_MB

controls the maximum allowed upload size.

System settings are stored in PostgreSQL and accessed through the System Settings feature.

7.20 Audit Log

Audit records are stored in the AuditLog entity.

An audit record contains:

User
Action
Entity Type
Entity ID
Description
Old Value
New Value
Created At

JSON fields are used for before/after values where appropriate.

This provides a flexible representation of relevant state changes without requiring a separate audit table for every business entity.

7.21 Transaction Boundaries

Important multi-step operations are performed transactionally.

A typical audited mutation is:

Begin Transaction
│
├── Validate / mutate business entity
│
├── Record audit event
│
└── Commit

If the business mutation fails, the audit event is not independently committed.

If audit recording fails within the transaction, the associated business mutation is also rolled back.

This preserves consistency between the business state and its audit history.

8. Authorization and Permission Architecture

8.1 Authorization Model

PMS V1 uses application-level role-based access control.

The relationship is:

User
│
▼
UserRole
│
▼
Role
│
▼
RolePermission
│
▼
Permission

A user receives permissions through their active role assignments.

8.2 Authentication vs Authorization

Authentication answers:

Who is the user?

Authorization answers:

What is the user allowed to do?

The PMS does not treat successful authentication as sufficient access to application functionality.

An authenticated user may still receive a permission-denied response.

8.3 Permission Definition

Permissions use a resource/action structure.

Examples:

ASSET:READ
ASSET:CREATE
ASSET:UPDATE

PROPERTY:READ
PROPERTY:CREATE
PROPERTY:UPDATE
PROPERTY:DEACTIVATE

DISPOSAL:REQUEST
DISPOSAL:APPROVE
DISPOSAL:CANCEL

DOCUMENT:READ
DOCUMENT:CREATE
DOCUMENT:UPDATE
DOCUMENT:DELETE

The permission catalog is maintained centrally in:

src/lib/authorization/permission-catalog.ts

8.4 Permission Catalog

Each permission definition contains:

code
resource
action
description

This provides a single catalog from which permission vocabulary can be understood and maintained.

8.5 Authorization Service

The authorization service provides the application-level permission check.

The conceptual operation is:

User ID

- Permission Code
  ↓
  Authorization Service
  ↓
  Active User?
  Active Role?
  Active Permission?
  Active UserRole?
  ↓
  Allowed / Denied

8.6 Active-State Validation

Authorization considers the active state of relevant records.

The permission check verifies the applicable:

User

Role

UserRole

Permission

Inactive or removed authorization relationships do not grant access.

8.7 No Implicit Administrator Bypass

PMS V1 does not implement an unrestricted "administrator can do everything" bypass in the authorization service.

Even highly privileged users receive access through explicit permissions.

This makes authorization behavior predictable and auditable.

8.8 Permission Enforcement Location

Permission enforcement is primarily performed server-side.

A protected command follows the pattern:

Current User
↓
Required Permission
↓
Authorization Check
↓
Business Rule Validation
↓
Database Operation

This ensures that a user cannot bypass authorization simply by constructing a request manually.

8.9 Read Authorization

Read permissions are treated as real security controls.

For example:

ASSET:READ
ACQUISITION:READ
REPORT_ASSET:READ
DOCUMENT:READ

are not merely navigation permissions.

A user without the required read permission can receive an Access Denied response even if they manually navigate directly to the corresponding URL.

8.10 UI vs Server Authorization

The UI may conditionally display:

Create buttons

Update buttons

Delete/deactivate buttons

Workflow actions

Navigation entries

However, these UI restrictions are not considered sufficient security.

The server-side command/query remains authoritative.

For example:

Button hidden
≠
Operation secured

The operation must still reject unauthorized requests on the server.

8.11 Access Denied Handling

Protected pages use a standardized Access Denied presentation when authorization fails.

The general pattern is:

Authenticated User
↓
Protected Query
↓
Permission Denied
↓
AccessDenied component

Server Actions do not return UI components.

Instead, they return structured operation results such as:

{ success: true, data }

or:

{ success: false, message }

8.12 Permission Categories

The V1 permission catalog covers multiple categories.

Master data

Examples:

COUNTRY
REGION
ZONE
WOREDA
PROPERTY_TYPE
BUILDING_TYPE
ASSET_TYPE
ASSET_STATUS

Core business operations

Examples:

ASSET
ACQUISITION
ACQUISITION_ITEM
ASSET_ASSIGNMENT
ASSET_MOVEMENT

Operational workflows

Examples:

MAINTENANCE
INCIDENT
RETIREMENT
DISPOSAL
PHYSICAL_VERIFICATION

Documents

DOCUMENT
DOCUMENT_TYPE

Reporting

REPORT_ASSET
REPORT_ACQUISITION
REPORT_ASSIGNMENT
REPORT_VERIFICATION
REPORT_MAINTENANCE
REPORT_INCIDENT
REPORT_RETIREMENT
REPORT_MOVEMENT
REPORT_DISPOSAL
REPORT_AUDIT
REPORT_ACCOUNTABILITY
REPORT_DASHBOARD

Security administration

ROLE
ROLE_PERMISSION
USER_ROLE
SYSTEM_ADMINISTRATOR

System configuration

SYSTEM_SETTING

9. Role Management and System Administrator

9.1 Purpose

PMS V1 provides controlled application-level management of roles and system administrators.

This removes the need for ordinary System Administrator handover operations to be performed through direct database manipulation.

9.2 Role Model

A role represents a collection of permissions.

Conceptually:

Role
│
└── Role Permissions
│
└── Permissions

A user receives role-based permissions through UserRole records.

9.3 Role Lifecycle

Role management supports controlled lifecycle operations including:

Create
Read
Update
Deactivate
Activate

The applicable operations require the corresponding role-management permissions.

9.4 Role Permissions

Role permissions can be:

Viewed

Added

Removed

The system therefore allows authorized administrators to define the capabilities associated with a role.

9.5 User Roles

Users can be assigned roles through the UserRole relationship.

Role assignment operations are permission-protected.

Inactive or removed role assignments do not continue to grant authorization.

9.6 Protected System Administrator Role

The SYSTEM_ADMIN role receives special protection.

Normal role-management operations cannot be used to arbitrarily modify the system administrator privilege structure.

This prevents a normal role administrator from bypassing the dedicated System Administrator controls.

9.7 System Administrator Management

The dedicated System Administrator feature is located under:

src/features/administration/system-administrator/

It supports:

Viewing active System Administrators

Appointing another eligible PMS user

Removing a System Administrator where permitted

9.8 System Administrator Appointment

Appointment of a System Administrator is controlled by the dedicated permission:

SYSTEM_ADMINISTRATOR:CREATE

The target user must satisfy the implemented eligibility requirements.

The operation is not a simple unrestricted role assignment.

9.9 Eligibility Rules

The implemented System Administrator rules include:

Active target

The target user must be an active PMS user.

Valid identity

The target must have the appropriate Azure AD identity information required by the application.

No duplicate active assignment

A user cannot be appointed as an active System Administrator twice.

Last administrator protection

The application prevents removal of the last active System Administrator.

This prevents the organization from accidentally reaching a state where no System Administrator remains.

9.10 System Administrator Removal

Removal requires the appropriate permission:

SYSTEM_ADMINISTRATOR:DELETE

The last active System Administrator cannot be removed.

The operation is transactional and audited.

9.11 Role Administration Permissions

The V1 role-management permission family includes:

ROLE:CREATE
ROLE:READ
ROLE:UPDATE
ROLE:DEACTIVATE
ROLE:ACTIVATE

ROLE_PERMISSION:READ
ROLE_PERMISSION:CREATE
ROLE_PERMISSION:DELETE

USER_ROLE:READ
USER_ROLE:CREATE
USER_ROLE:DELETE

System Administrator management is separately controlled through:

SYSTEM_ADMINISTRATOR:READ
SYSTEM_ADMINISTRATOR:CREATE
SYSTEM_ADMINISTRATOR:DELETE

9.12 Auditability

Important role and system-administrator operations are treated as accountability-sensitive operations.

The system therefore records appropriate audit events for these administrative changes.

The objective is to preserve a trace of who changed privileged access.

9.13 Security Principle

The V1 administrative security model follows:

Authentication
↓
User Identity
↓
Role Assignment
↓
Permission
↓
Protected Operation
↓
Audit where significant

This provides a controlled chain from user identity to privileged application behavior.

9.14 Administrative Separation

The system intentionally distinguishes:

Role Administrator
≠
System Administrator

A user capable of managing ordinary roles is not automatically granted unrestricted System Administrator authority.

This separation reduces the risk of privileged-access escalation through ordinary role-management operations.

End of Sections 7–9

These sections establish the core data, security, and administrative architecture of PMS V1.

The next part should cover Sections 10–12:

Business Rules and Entity Lifecycles

Audit Architecture

Document Management

These sections will be particularly detailed because they describe how PMS V1 actually controls its business processes and preserves accountability.

10. Business Rules and Entity Lifecycles

10.1 Business Rule Philosophy

PMS V1 applies business rules primarily at the server-side command layer.

The UI may guide users toward valid operations, but the UI is not the authoritative source of business rules.

The authoritative flow is:

User Request
↓
Authentication
↓
Authorization
↓
Input Validation
↓
Business Rule Validation
↓
Transaction
↓
Database Mutation
↓
Audit Event where required

This ensures that business rules cannot be bypassed simply by sending a request outside the normal UI.

10.2 Master Data Rules

Master data generally follows a controlled lifecycle:

Create
↓
Active
↓
Update
↓
Deactivate

Where activation is explicitly supported, an inactive record may return to the active state.

The exact lifecycle depends on the individual master-data entity.

Examples include:

Country

Organization Unit

Property Type

Building Type

Building Condition

Building Space Type

Asset Type

Asset Category

Asset Status

Asset Condition

Asset Location

Acquisition Method

Ownership Type

10.3 Active Related Records

Where a business entity references a master-data record, the application commonly requires the referenced record to be active.

For example, creating or updating a Building validates that:

The Property exists and is active.

The Building Type exists and is active.

The optional Building Condition exists and is active.

The same principle is applied throughout the application where the underlying business rule requires an active reference.

This prevents new transactions from being associated with inactive master data.

10.4 Property Lifecycle

Property management supports:

Create
Update
Deactivate

Creation

Property creation validates:

Property code uniqueness

Organization Unit existence

Organization Unit active state

Property Type existence

Property Type active state

Optional category validity

Optional tenure validity

Optional status validity

Update

Property updates:

Require the appropriate update permission.

Verify that the target property exists.

Validate property-code uniqueness.

Validate referenced master data.

Preserve the property's identity.

Deactivation

Property deactivation requires the appropriate permission and a valid existing property.

The operation is audited.

10.5 Ownership Lifecycle

Ownership supports:

Create
Update
Deactivate

A key business rule is that a property cannot have multiple active ownership records where the implemented ownership rule requires a single active ownership.

Creation therefore checks for an existing active ownership.

Updates also check for duplicate active ownership while excluding the current record.

Ownership lifecycle mutations are audited.

10.6 Ownership Type Lifecycle

Ownership Type supports:

Create
Update
Deactivate

The code is unique.

Update operations exclude the current record when checking uniqueness.

Lifecycle mutations are audited.

10.7 Building Lifecycle

Buildings support:

Create
Update
Deactivate

Creation rules

Building creation requires:

Valid active Property

Valid active Building Type

Valid active Building Condition when supplied

Unique Building Code within the Property

Update rules

Building updates require:

Existing Building

Active target Property

Active target Building Type

Active target Building Condition when supplied

Unique Building Code within the target Property

Deactivation

Building deactivation requires the appropriate permission.

Building lifecycle changes are audited.

10.8 Building Space Lifecycle

Building spaces support:

Create
Update
Deactivate

Creation rules

A Building Space requires:

Existing active Building

Existing active Building Space Type

Unique space code within its Building

Update rules

When changing the Building or Space Type, the target records must satisfy their active-state requirements.

Space code uniqueness is evaluated within the target Building.

Deactivation

A Building Space can be deactivated by an authorized user.

The lifecycle operations are audited.

10.9 Asset Lifecycle

Assets support:

Create
Update

The V1 Asset command layer does not define a general asset deactivation operation.

Creation

Asset creation requires:

ASSET:CREATE permission

Active Asset Type

Active Asset Status

Active Asset Condition

Valid uniqueness for asset tag where supplied

Valid uniqueness for serial number where supplied

An Asset Code is generated during creation.

Update

Asset updates require:

ASSET:UPDATE permission

Existing asset

Active target Asset Type

Active target Asset Status

Active target Asset Condition

Duplicate asset-tag checks excluding the current asset

Duplicate serial-number checks excluding the current asset

The Asset Code is not replaced during ordinary updates.

10.10 Asset Status and Lifecycle Independence

Asset Status represents an asset's status classification.

Retirement and Disposal represent separate controlled business processes.

PMS V1 does not automatically assume:

Retirement Approved → Asset RETIRED

or:

Disposal Approved → Asset DISPOSED

because no implemented V1 business rule establishes those automatic transitions.

This distinction is intentional.

It prevents the handbook from defining a lifecycle transition that the application itself does not enforce.

10.11 Acquisition Lifecycle

Acquisitions support:

Create
Update

Creation

Creation requires:

ACQUISITION:CREATE permission

Existing active Acquisition Method

Valid acquisition information

Generated acquisition number

The acquisition number is generated during creation.

Update

Updates require:

ACQUISITION:UPDATE permission

Existing acquisition

Existing active Acquisition Method

The acquisition number is deliberately immutable during ordinary updates.

Acquisition mutations are audited.

10.12 Acquisition Item Lifecycle

Acquisition Items support:

Create
Update

Creation and update require their respective permissions.

The application validates:

Acquisition existence

Asset existence

Duplicate asset participation

An Acquisition Item may be moved to another valid Acquisition during update where the implemented business rules permit it.

The Asset associated with the item may also be changed where the implemented update rules permit it.

The application does not remove these capabilities without explicit business-rule justification.

Acquisition Item changes are audited.

10.13 Acquisition Method Lifecycle

Acquisition Methods support:

Create
Update
Deactivate
Activate

Activation and deactivation are represented through controlled update behavior and dedicated permissions where required.

The update operation determines the appropriate audit action based on the state transition:

Active → Inactive
= Deactivated

Inactive → Active
= Activated

Other update
= Updated

Acquisition Method lifecycle changes are audited.

10.14 Employee Lifecycle

Employees support:

Create
Update
Deactivate

Creation and update validate the associated Organization Unit.

The Organization Unit must exist and be active.

Employee numbers are subject to uniqueness validation.

Employee lifecycle changes are audited.

10.15 Asset Assignment Lifecycle

Asset assignment represents current accountability.

The basic lifecycle is:

Unassigned
↓
Assigned
↓
Returned

Assignment

Creating an assignment requires:

ASSET_ASSIGNMENT:CREATE

Existing asset

Active employee

No current active assignment for that asset

The assignment records the assigning user.

Return

Returning an assignment requires:

ASSET_ASSIGNMENT:RETURN

Existing active assignment

The return operation records:

Return timestamp

Returning user

Optional notes

The repository uses a conditional database update to prevent a concurrent or repeated return from silently succeeding.

Assignment and return operations are audited.

10.16 Asset Movement Lifecycle

Asset movement requires:

ASSET_MOVEMENT:MOVE

The application validates:

Asset existence

Destination existence

Destination active state

Destination differs from the current location

A movement is created and the Asset's current location is updated in the same transaction.

The operation therefore preserves both:

Current location

- Historical movement

Movement is audited.

10.17 Physical Verification Lifecycle

Physical Verification provides controlled verification operations.

The permission family includes:

PHYSICAL_VERIFICATION:CREATE
PHYSICAL_VERIFICATION:READ
PHYSICAL_VERIFICATION:GENERATE
PHYSICAL_VERIFICATION:VERIFY
PHYSICAL_VERIFICATION:COMPLETE

The process separates:

Verification session

Verification items

Physical observations

Unregistered Asset Observations are maintained separately so that an observed physical item does not automatically become a registered Asset.

10.18 Maintenance Lifecycle

Maintenance follows a controlled operational workflow.

The implemented operations include:

Create
Update
Request
Assign
Approve
Start
Complete

The relevant permissions are separately controlled.

A maintenance operation therefore requires both:

Authorization for the operation.

Valid current state for the workflow transition.

The database mutation and audit event are performed transactionally where audit is required.

10.19 Incident Lifecycle

Incident Management follows a controlled workflow.

The implemented operation family includes:

Create
Update
Report
Assign
Start
Resolve
Close
Cancel

Incident resolution is handled through the dedicated Incident Resolution workflow.

The active resolution operation requires:

INCIDENT:RESOLVE

The parent Incident must be in the appropriate state before resolution.

Duplicate resolutions are prevented.

The resolution record and incident update are performed transactionally.

The obsolete legacy direct-resolution path was removed from the active implementation.

10.20 Retirement Lifecycle

Retirement follows:

DRAFT
↓
REQUESTED
↓
APPROVED

Cancellation is permitted from the appropriate pre-approval states.

Creation

Retirement creation requires:

RETIREMENT:CREATE

The Asset must exist and satisfy the implemented eligibility condition.

The current V1 rule requires the asset to have:

ACTIVE

status.

Only one retirement record may exist for the same asset according to the implemented rule.

Request

A DRAFT retirement can be requested.

Approval

Only a REQUESTED retirement can be approved.

Cancellation

Cancellation is permitted for:

DRAFT
REQUESTED

The appropriate cancellation reason is required.

All significant retirement lifecycle operations are audited.

Conditional state updates are used where appropriate to protect workflow transitions against conflicting updates.

10.21 Disposal Lifecycle

Disposal follows:

DRAFT
↓
REQUESTED
↓
APPROVED

Cancellation is permitted from:

DRAFT
REQUESTED

Request

Only a DRAFT disposal can be requested.

Approval

Only a REQUESTED disposal can be approved.

Cancellation

Only an eligible DRAFT or REQUESTED disposal can be cancelled.

The implementation uses conditional database updates for lifecycle transitions.

This provides protection against concurrent state changes.

10.22 Disposal Item Rules

A Disposal Item associates an Asset with a Disposal.

Creation requires:

DISPOSAL_ITEM:CREATE

Existing Disposal

Disposal in DRAFT state

Existing Asset

Asset not already included in another Disposal

Updates require:

DISPOSAL_ITEM:UPDATE

Existing item

Current Disposal in DRAFT state

Valid target Disposal when changing disposal

Valid Asset

Duplicate prevention

The implementation intentionally permits changing the associated Disposal or Asset where the established rules allow it.

Disposal Item creation and update are audited.

10.23 Document Lifecycle

Documents follow a separate lifecycle from ordinary master data.

The conceptual lifecycle is:

Create Document
↓
Upload File
↓
Create Version
↓
Current Version
↓
New Version
↓
Optional Delete

Document versions are immutable.

A new file revision creates a new version rather than modifying the binary content of an existing version.

10.24 System Setting Lifecycle

System Settings follow:

Read
↓
Update

Updates require:

SYSTEM_SETTING:UPDATE

Important setting changes are audited.

10.25 Business Rule Enforcement Summary

The V1 implementation follows the principle:

UI guidance

- Server authorization
- Server validation
- Database transaction
- Database constraints
  =
  Controlled business operation

No individual layer is assumed to be sufficient by itself.

11. Audit Architecture

11.1 Audit Purpose

Audit exists to provide accountability for significant business and administrative operations.

The purpose is to answer questions such as:

Who performed the operation?

What entity was affected?

What operation occurred?

When did it occur?

What was the previous state?

What is the resulting state?

11.2 Selective Audit Philosophy

PMS V1 deliberately does not treat every database mutation as an audit event.

Audit is applied when an operation has meaningful:

Accountability

Governance

Security

Compliance

Lifecycle significance

Configuration significance

This avoids producing a large amount of low-value audit noise.

11.3 Audit Entity

Audit records are stored in:

AuditLog

The record contains:

id
userId
action
entityType
entityId
description
oldValue
newValue
createdAt

11.4 Audit Service

The audit service exposes the application-level operation for recording an event.

The service receives a Prisma transaction client.

Conceptually:

Transaction
│
├── Business Mutation
│
└── recordAuditEvent()

This ensures the audit event participates in the same transaction as the business mutation.

11.5 Audit Repository

The audit repository persists the audit record.

It converts nullable JSON values into the appropriate Prisma JSON representation where necessary.

The repository returns the stored audit record with relevant metadata.

11.6 Audit Vocabulary

Audit entity types and actions are centrally defined.

Examples include:

ASSET
ASSET_ASSIGNMENT
ASSET_MOVEMENT
ACQUISITION
ACQUISITION_ITEM
ACQUISITION_METHOD
PROPERTY
OWNERSHIP
BUILDING
DOCUMENT
SYSTEM_SETTING

Actions include examples such as:

ASSET_CREATED
ASSET_UPDATED
ASSET_ASSIGNED
ASSET_RETURNED
ASSET_MOVED

ACQUISITION_CREATED
ACQUISITION_UPDATED

PROPERTY_CREATED
PROPERTY_UPDATED
PROPERTY_DEACTIVATED

DOCUMENT_CREATED
DOCUMENT_UPDATED
DOCUMENT_DELETED
DOCUMENT_VERSION_CREATED

SYSTEM_SETTING_UPDATED

11.7 Before and After Values

Where meaningful, audit records include:

oldValue
newValue

These values represent relevant state before and after the operation.

The application does not necessarily serialize every database column.

Instead, the audit payload captures the information necessary to understand the business change.

11.8 Decimal Values

Where database values use Decimal types, audit payloads convert them into string representations rather than attempting to serialize Prisma Decimal objects directly.

This preserves the value without losing precision.

11.9 Audit Transaction Integrity

For significant operations:

BEGIN
│
├── Perform business mutation
│
├── Record audit event
│
└── COMMIT

If either operation fails:

ROLLBACK

This prevents an audit record from claiming that a successful business operation occurred when the underlying mutation was rolled back.

11.10 Operations Audited in V1

Important audited areas include:

Assets

Asset Created
Asset Updated

Asset Accountability

Asset Assigned
Asset Returned
Asset Moved

Employees

Employee Created
Employee Updated
Employee Deactivated

Asset Locations

Asset Location Created
Asset Location Updated
Asset Location Deactivated

Acquisition

Acquisition Created
Acquisition Updated
Acquisition Item Created
Acquisition Item Updated
Acquisition Method Created
Acquisition Method Updated
Acquisition Method Activated
Acquisition Method Deactivated

Property and Building

Property Created
Property Updated
Property Deactivated

Ownership Created
Ownership Updated
Ownership Deactivated

Ownership Type Created
Ownership Type Updated
Ownership Type Deactivated

Building Created
Building Updated
Building Deactivated

Building Type Created
Building Type Updated
Building Type Deactivated

Building Condition Created
Building Condition Updated
Building Condition Deactivated

Building Space Type Created
Building Space Type Updated
Building Space Type Deactivated

Building Space Created
Building Space Updated
Building Space Deactivated

Operational Workflows

Significant Maintenance, Incident, Retirement, and Disposal operations are audited according to their implemented workflows.

Documents

Document Created
Document Updated
Document Deleted
Document Version Created

System Configuration

System Setting Updated

11.11 Operations Not Automatically Audited

The following are not automatically considered audit events merely because they interact with the database:

Ordinary reads

Lookups

Report queries

UI state changes

Insignificant internal mutations

The objective is meaningful accountability rather than exhaustive database logging.

11.12 Audit Reporting

Audit records are available through the Audit reporting functionality.

The Audit report is itself protected by:

REPORT_AUDIT:READ

This ensures that audit information is not automatically visible to every authenticated user.

12. Document Management

12.1 Purpose

Document Management provides a centralized mechanism for attaching and managing supporting files associated with PMS business records.

The design separates:

Document Metadata +
Binary File Storage

This allows PMS to manage file information without storing large binary objects directly in PostgreSQL.

12.2 Supported File Types

V1 supports:

PDF
DOCX
XLSX
JPG
JPEG
PNG
WEBP

File type validation is performed by the application.

12.3 Storage Architecture

The storage architecture is:

PMS Application
│
├──────────────► PostgreSQL
│ │
│ ├── Document metadata
│ ├── Entity relationship
│ ├── Version metadata
│ └── Current version
│
└──────────────► Azure Blob Storage
│
└── Binary file content

12.4 Storage Abstraction

Storage functionality is isolated under:

src/lib/storage/

The implementation includes:

azure-blob.storage.ts
storage.types.ts

This separates storage operations from the document business domain.

12.5 Document Entity

A Document represents the logical file record.

The document may be associated with another PMS entity through:

entityType
entityId

This allows the document subsystem to support multiple business domains without requiring a separate document table for every entity type.

12.6 Document Type

Document Types provide controlled classification of documents.

They support master-data-style management and have their own authorization permissions.

Document Type management includes:

Create

Read

Update

Deactivate

where applicable.

12.7 File Upload

The upload process validates:

File presence

File type

File size

Relevant document metadata

Authorization

The file is uploaded to Azure Blob Storage and corresponding metadata is stored in PostgreSQL.

12.8 Configurable Upload Size

The maximum upload size is controlled through:

DOCUMENT_MAX_FILE_SIZE_MB

The V1 default is:

25 MB

The setting can be changed by an authorized administrator through System Settings.

This avoids hard-coding the operational limit exclusively in application source code.

12.9 One File, One Document

The V1 design treats each uploaded file as a Document.

Therefore:

One file
=
One Document

If multiple files are uploaded, they are represented as separate Documents.

12.10 Document Versioning

Documents support immutable versions.

For example:

Document
│
├── Version 1
├── Version 2
└── Version 3 ← Current

A new version does not overwrite the previous version.

This preserves document history.

12.11 Current Version

The Document maintains the identity of its current version.

The current version is used when the application needs to identify the active revision of the document.

12.12 Version Immutability

Once a DocumentVersion is created, its file content is not modified in place.

A new revision creates another version.

This is important for:

Historical traceability

Document integrity

Auditability

Reproducibility

12.13 Protected Downloads

Document downloads are protected by authorization.

A download operation verifies:

Current authenticated user

Required document permission

Document existence

Document lifecycle state

Requested version validity

The application does not expose private Blob Storage content directly as an unrestricted public resource.

12.14 Document Permissions

Document operations are protected by:

DOCUMENT:CREATE
DOCUMENT:READ
DOCUMENT:UPDATE
DOCUMENT:DELETE

Document Type operations are protected separately.

12.15 Document Audit

Significant document operations are audited.

The V1 audit vocabulary includes:

DOCUMENT_CREATED
DOCUMENT_UPDATED
DOCUMENT_DELETED
DOCUMENT_VERSION_CREATED

This provides accountability for document lifecycle changes.

12.16 Security Model

The document subsystem follows the principle:

Authenticated
↓
Authorized
↓
Document Access Check
↓
Storage Operation

Possession of a document identifier alone is not considered sufficient authorization to access the file.

12.17 Document Lifecycle Summary

The V1 document lifecycle can be represented as:

               ┌───────────────┐
                │ Create        │
                │ Document      │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ Upload File   │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ Version 1     │
                └───────┬───────┘
                        │
                 New Revision
                        │
                        ▼
                ┌───────────────┐
                │ Version 2     │
                └───────┬───────┘
                        │
                        ▼
                   Current Version

Previous versions remain available as historical versions subject to the application's authorization rules.

End of Sections 10–12

Sections 10–12 establish the three major V1 control mechanisms:

Business Rules
↓
Controlled State Transitions

Audit
↓
Accountability

Document Management
↓
Controlled File Lifecycle

Together they define much of the operational integrity of PMS V1.

13. System Settings

13.1 Purpose

System Settings provide a controlled mechanism for storing administrator-configurable application values without requiring source-code changes for every operational configuration change.

V1 uses System Settings selectively rather than turning every configurable value into a database setting.

The first implemented setting is the document upload-size limit.

13.2 System Setting Architecture

The conceptual flow is:

System Administrator
↓
System Settings UI
↓
Authorization
↓
Validation
↓
System Setting Command
↓
PostgreSQL

Settings are stored in PostgreSQL and retrieved by the application when required.

13.3 Implemented V1 Setting

The current V1 document-related setting is:

DOCUMENT_MAX_FILE_SIZE_MB

Its purpose is to control the maximum permitted document upload size.

The default V1 value is:

25 MB

This value can be changed through the System Settings functionality by an authorized user.

13.4 System Setting Permissions

System Settings are protected by:

SYSTEM_SETTING:READ
SYSTEM_SETTING:UPDATE

Reading a setting and changing a setting are separate authorization operations.

This prevents configuration write access from being implied merely by the ability to view configuration.

13.5 Configuration Validation

A setting update is not treated as an unrestricted string update.

The command validates the supplied value according to the setting's business requirements before persisting it.

This ensures that configuration values consumed by application logic remain valid.

13.6 Configuration Audit

System Setting changes are audited.

An audit event records the significant configuration change and can include the previous and resulting values.

This is important because a configuration change can alter application behavior without changing application source code.

13.7 Why Settings Are Selective

V1 does not place every constant or business rule into System Settings.

For example, authorization permissions, entity lifecycle rules, and database relationships remain application-level behavior.

System Settings are intended for values that genuinely benefit from controlled administrative configuration.

14. Reporting Architecture

14.1 Purpose

Reporting provides users with controlled access to operational information without exposing unrestricted database access.

Reports are implemented as application queries with their own authorization requirements.

The reporting layer is therefore part of the application security boundary.

14.2 Reporting Structure

The reporting feature follows the established feature organization:

src/features/reports/

Individual report domains are organized below this area.

Examples include:

src/features/reports/asset/
src/features/reports/acquisition/
src/features/reports/assignment/
src/features/reports/verification/
src/features/reports/maintenance/
src/features/reports/incident/
src/features/reports/retirement/
src/features/reports/movement/
src/features/reports/disposal/
src/features/reports/accountability/
src/features/reports/audit/
src/features/reports/dashboard/

14.3 Report Authorization

Reports use dedicated permissions.

Examples include:

REPORT_ASSET:READ
REPORT_ACQUISITION:READ
REPORT_ASSIGNMENT:READ
REPORT_VERIFICATION:READ
REPORT_MAINTENANCE:READ
REPORT_INCIDENT:READ
REPORT_RETIREMENT:READ
REPORT_MOVEMENT:READ
REPORT_DISPOSAL:READ
REPORT_AUDIT:READ
REPORT_ACCOUNTABILITY:READ
REPORT_DASHBOARD:READ

A user having access to one report does not automatically receive access to every other report.

14.4 Server-Side Report Authorization

Report authorization is enforced on the server.

The general flow is:

Authenticated User
↓
Report Page
↓
Current User
↓
Authorized Query
↓
Report Data

The report page does not rely solely on UI visibility to protect information.

14.5 Access Denied Behavior

When an authorized report query detects a permission failure, the page can return the shared:

AccessDenied

component.

The pattern distinguishes:

Permission denied

from:

Unexpected application/database failure

Permission failures are presented as controlled access-denied behavior, while unexpected errors are allowed to propagate to the application's normal error handling.

14.6 Report Data Ownership

Report queries remain responsible for retrieving the appropriate domain data.

For example, an Asset report may combine:

Asset identity

Asset classification

Status

Condition

Location

Acquisition information

The reporting layer does not duplicate the authoritative business data.

It presents information derived from the underlying domain model.

14.7 Acquisition Reporting

Acquisition reporting is divided into meaningful reporting concerns, including:

Acquisition
Acquisition Method
Acquisition Item

Decimal monetary values are converted to safe report representations, including string representations where required.

This avoids exposing Prisma Decimal objects directly to UI components.

14.8 Asset Reporting

The Asset report uses a dedicated report row type:

AssetReportRow

and a corresponding report table component:

AssetReportTable

This keeps report-specific presentation types separate from the core Asset domain model.

14.9 Reporting and Authorization Testing

Reporting authorization was tested using the same general security sequence used throughout PMS:

READ permission granted
↓
Report accessible

READ permission removed
↓
Access denied

This verifies that report access is protected by the authorization layer rather than merely by navigation visibility.

14.10 Dashboard

The Dashboard is treated as a protected reporting capability.

Its access is controlled through:

REPORT_DASHBOARD:READ

The dashboard therefore participates in the same authorization model as the individual reports.

14.11 Audit Reporting

Audit information is itself sensitive operational information.

Access is controlled through:

REPORT_AUDIT:READ

This prevents ordinary report access from automatically exposing the system's accountability records.

14.12 Reporting Design Principle

The reporting architecture follows:

Domain Data
↓
Authorized Query
↓
Report-Specific Types
↓
Report Components
↓
Report Page

Reports should not become an alternative mechanism for bypassing domain authorization.

15. Error Handling and Security

15.1 Security Principle

PMS V1 follows a defense-in-depth approach.

Security is not delegated to a single layer.

The principal controls are:

Authentication
↓
Authorization
↓
Validation
↓
Business Rules
↓
Database Constraints
↓
Transactions
↓
Audit

Each layer addresses a different failure or abuse scenario.

15.2 Authentication

Authentication establishes the identity of the current user.

PMS uses Azure authentication as the identity foundation.

Application-level permissions are then evaluated against the authenticated PMS user.

Authentication answers:

Who is the user?

Authorization answers:

What is the user allowed to do?

These concerns remain separate.

15.3 Current User Resolution

Server-side operations obtain the authenticated PMS user through the current-user authentication mechanism.

Commands should not trust a user identifier supplied directly by the browser when the server can determine the authenticated user.

This is especially important for:

Audit ownership

Assignment operations

Asset movement

Role administration

System administrator management

Document operations

15.4 Authorization

Authorization is performed through the central authorization foundation.

The principal service operation is:

requirePermission

A denied operation results in an application error with:

PERMISSION_DENIED

The authorization repository evaluates active:

User

UserRole

Role

Permission

records.

Removed user-role assignments are not treated as active authorization.

15.5 No Implicit Administrator Bypass

PMS does not assume that a user with an administrative role automatically bypasses every permission check.

Permissions remain explicit.

This makes authorization behavior predictable and auditable.

15.6 Permission Catalog

Permission definitions are centrally maintained in:

src/lib/authorization/permission-catalog.ts

A permission follows the general form:

RESOURCE:ACTION

For example:

ASSET:READ
ASSET:CREATE
ASSET:UPDATE

and:

REPORT_ASSET:READ
SYSTEM_SETTING:UPDATE
SYSTEM_ADMINISTRATOR:CREATE

The catalog provides a common vocabulary for the entire application.

15.7 UI Authorization Is Not Security

The UI may hide:

Buttons

Actions

Navigation entries

Create controls

Update controls

Delete/deactivate controls

based on permissions.

However, these UI decisions are convenience and usability mechanisms.

They are not the security boundary.

A user who manually invokes an action must still pass server-side authorization.

15.8 Validation

Input validation is performed before business operations are executed.

PMS uses Zod schemas for structured validation.

The general sequence is:

Raw Input
↓
Zod Validation
↓
Typed Data
↓
Command

Validation prevents malformed data from reaching business logic.

15.9 Business Rule Validation

Schema validation alone is not sufficient.

Commands additionally validate domain conditions such as:

Record existence

Active/inactive state

Duplicate values

Valid lifecycle transition

Related record validity

Current assignment state

Current workflow state

For example:

Schema:
"assetId must be a valid string"

Business rule:
"The asset must exist and must not already have an active assignment"

These are different responsibilities.

15.10 AppError

PMS uses a structured application error mechanism.

Errors can carry an application-specific error code.

For example:

PERMISSION_DENIED

This allows application code to distinguish expected business/application errors from unexpected failures.

15.11 Server Action Error Handling

Server Actions generally follow this pattern:

Validate
↓
Authenticate
↓
Execute Command
↓
Revalidate
↓
Return Success

Expected application errors are returned as structured action results.

Unexpected errors are handled separately rather than being silently converted into misleading business messages.

The general result shape is:

Success:
{
success: true,
data: ...
}

Failure:
{
success: false,
message: ...
}

15.12 Access Denied Handling

Pages that need to render an access-denied state catch:

PERMISSION_DENIED

and return the shared:

AccessDenied

component.

This keeps permission failures distinct from system failures.

15.13 Unexpected Errors

Unexpected errors are not disguised as permission failures.

For example:

Database connection failure
Unexpected Prisma error
Programming error

must not be presented to the user as:

You do not have permission

The distinction is important for both security and troubleshooting.

15.14 Transactions

Transactions are used when multiple database operations represent one business operation.

Typical pattern:

BEGIN TRANSACTION

Validate / prepare
↓
Business mutation
↓
Related mutation
↓
Audit event

COMMIT

If the operation cannot be completed consistently, the transaction rolls back.

Examples include:

Asset movement + current location update

Asset assignment + audit

Asset return + audit

Acquisition creation + audit

Retirement workflow transition + audit

Disposal workflow transition + audit

Document-related metadata operations + audit where applicable

15.15 Concurrency Protection

Where a workflow operation must succeed only if the record is still in a particular state, PMS uses conditional database updates where appropriate.

For example:

UPDATE ... WHERE status = DRAFT

If the affected row count is not exactly one, the command treats the operation as a conflict.

This is particularly important for:

Assignment returns

Retirement transitions

Disposal transitions

Other state-dependent operations

This protects the system from silently accepting stale concurrent operations.

15.16 Database Constraints

Database constraints remain an important final line of defense.

Examples include:

Primary keys

Unique constraints

Foreign keys

Indexed relationships

Required fields

Application validation provides a better user experience, while database constraints protect persistence integrity.

15.17 Secure Document Access

Document binaries are stored privately in Azure Blob Storage.

The application controls access before allowing a document version to be downloaded.

The architecture therefore avoids treating Blob Storage as an unrestricted public file repository.

15.18 Security Testing Principle

PMS V1 authorization testing follows a repeatable sequence:

1. Grant READ permission
2. Verify successful access
3. Remove READ permission
4. Verify Access Denied
5. Grant operation permission
6. Verify operation
7. Verify denial when permission is removed

This pattern was applied across the major feature areas.

15.19 Security Design Summary

The PMS V1 security model can be summarized as:

           ┌─────────────────────┐
            │ Azure Authentication│
            └──────────┬──────────┘
                       ↓
            ┌─────────────────────┐
            │ PMS User Resolution │
            └──────────┬──────────┘
                       ↓
            ┌─────────────────────┐
            │ Permission Check    │
            └──────────┬──────────┘
                       ↓
            ┌─────────────────────┐
            │ Input Validation    │
            └──────────┬──────────┘
                       ↓
            ┌─────────────────────┐
            │ Business Rules      │
            └──────────┬──────────┘
                       ↓
            ┌─────────────────────┐
            │ Transaction / DB     │
            └──────────┬──────────┘
                       ↓
            ┌─────────────────────┐
            │ Audit where needed  │
            └─────────────────────┘

This layered model is the primary security and integrity pattern of PMS V1.

16. Testing Strategy

16.1 Testing Philosophy

PMS V1 uses testing primarily to verify:

Business rules

Authorization

Lifecycle transitions

Data integrity

Concurrency-sensitive operations

Important integrations

Application behavior after changes

Testing is not limited to checking whether a page renders.

A feature is considered functionally complete only when its important rules are verified at the application boundary.

16.2 TypeScript Validation

The baseline static validation command is:

npx tsc --noEmit

This verifies that the application compiles at the TypeScript level without generating output.

The V1 Git milestone was validated successfully with this command before commit.

16.3 Authorization Testing

Authorization testing follows a repeatable pattern.

The preferred sequence is:

READ allowed
↓
READ denied
↓
CREATE / UPDATE / lifecycle allowed
↓
Operation denied without permission

This sequence is intentional because READ access is normally the first security boundary for a feature.

16.4 READ Authorization

For a protected feature:

Assign the relevant READ permission.

Sign in as the authorized user.

Navigate to the feature.

Verify that the page and required data are accessible.

Example:

ACQUISITION_METHOD:READ

allows the corresponding feature to be accessed when the user otherwise satisfies authentication requirements.

16.5 READ Denial

The READ permission is then removed.

The same user attempts to access the feature.

Expected result:

Access Denied

This confirms that page-level authorization is actually enforced.

16.6 Operation Authorization

After READ behavior is verified, individual operations are tested.

Examples:

CREATE
UPDATE
DEACTIVATE
ACTIVATE
RETURN
MOVE
APPROVE
CANCEL
DELETE

The operation should succeed only when its corresponding permission is present.

16.7 Business Rule Testing

Authorization success does not mean that an operation should automatically succeed.

The test must also verify the underlying business rules.

Examples include:

Asset

Duplicate asset tag rejected

Duplicate serial number rejected

Inactive master data rejected

Assignment

Inactive employee rejected

Already assigned asset rejected

Already returned assignment cannot be returned again

Movement

Inactive destination rejected

Same source and destination rejected

Retirement

Non-active asset rejected

Duplicate retirement rejected

Invalid workflow transition rejected

Disposal

Invalid workflow transition rejected

Duplicate disposal item rejected

Items cannot be added outside the permitted disposal state

16.8 Lifecycle Testing

Workflow features are tested by state transition.

For example:

DRAFT
↓
REQUESTED
↓
APPROVED

The test verifies both:

Valid transition succeeds.

Invalid transition is rejected.

This is more valuable than testing only the happy path.

16.9 Concurrency-Sensitive Testing

Operations protected by conditional updates should also be considered from a concurrency perspective.

For example, an assignment return should not succeed twice simply because two requests were submitted close together.

The implementation expects exactly one matching row to be updated.

If the conditional update affects zero rows, the command reports a conflict.

16.10 Audit Testing

For an audited operation, testing verifies that:

The business operation succeeds.

The expected AuditLog record exists.

The correct user is recorded.

The correct entity is recorded.

The expected action is recorded.

Old/new values are present where appropriate.

Business mutation and audit occur in the same transaction.

The audit record is therefore tested as part of the business operation rather than as an unrelated logging side effect.

16.11 Document Management Testing

Document Management was tested for important behavior including:

Supported file types

Upload

File-size validation

Azure Blob Storage interaction

Document metadata persistence

Document versions

Version creation

Protected download

Document deletion

Authorization

Audit behavior where applicable

The Azure Blob integration was also exercised through the dedicated test script.

16.12 Integration Testing

External infrastructure must be tested separately from ordinary domain logic.

For Document Management, this includes:

PMS
↓
Azure Blob Storage

The test environment must provide valid Azure Blob configuration before integration tests are expected to pass.

16.13 Regression Testing

When modifying an existing feature, testing should include the business rules that were already present before the change.

This is particularly important because PMS contains deliberate domain behavior that should not be replaced merely to make code appear more uniform.

The preferred approach is:

Inspect existing behavior
↓
Identify intended rule
↓
Make smallest necessary change
↓
Type-check
↓
Retest affected behavior

16.14 V1 Validation Result

Before the V1 Git commit:

npx tsc --noEmit

completed successfully.

The repository was then staged, reviewed, committed, and pushed.

The V1 baseline commit is:

9a3885a Complete PMS V1 implementation

The working tree was clean after the commit and the commit was pushed to origin/main.

17. Deployment and Operations

17.1 Deployment Architecture

The production deployment uses Azure-hosted infrastructure.

The primary application runtime is an Azure App Service.

The production application is:

app-pms-prod-001

The application connects to PostgreSQL for relational data and Azure Blob Storage for document binaries.

17.2 Production Components

The principal production components are:

User
↓
Azure Authentication
↓
Azure App Service
├── Next.js Application
├── Server Actions
├── Route Handlers
└── Prisma
↓
Azure PostgreSQL

Document operations
↓
Azure Blob Storage

17.3 Database Configuration

PMS uses PostgreSQL as its production relational database.

Prisma configuration is maintained through:

prisma.config.ts

The schema is:

prisma/schema.prisma

Migrations are maintained under:

prisma/migrations/

The production database connection is supplied through environment configuration rather than hard-coded source code.

17.4 Prisma V1 Configuration

PMS V1 uses Prisma 7.9.1.

The generated Prisma client is located under:

src/generated/prisma/

The project uses the Prisma PostgreSQL adapter configuration required by the V1 Prisma setup.

17.5 Database Migration Principle

Database changes should be introduced through Prisma migrations.

The general process is:

Modify Prisma Schema
↓
Generate Migration
↓
Review Migration
↓
Apply Migration
↓
Generate / Validate Prisma Client
↓
Type-check
↓
Test

Production database changes should not be performed by manually editing database structures without corresponding migration history.

17.6 Environment Configuration

Environment-specific values should remain outside application source code.

Typical configuration categories include:

Database connection

Azure authentication

Azure Blob Storage

Storage container information

Application environment settings

Secrets must not be committed to Git.

17.7 Azure Blob Storage

Document binaries are stored in private Azure Blob Storage.

Operational requirements include:

Valid storage account configuration

Correct container configuration

Appropriate application credentials

Network connectivity

Correct permissions

The application should remain the authorization boundary for document access.

17.8 Production Database Connectivity Issue Identified During V1 Operations

During production troubleshooting, an infrastructure-level connectivity issue was identified.

The production App Service could not reach Azure PostgreSQL even though the same database connection worked from the local development machine.

The diagnosed difference was the PostgreSQL firewall configuration.

The App Service uses Azure outbound IP addresses, while the local machine connects using its own permitted public IP.

The production App Service outbound IP ranges were not covered by the PostgreSQL firewall rules.

Therefore:

Local Development
↓
PostgreSQL
✓

Production App Service
↓
PostgreSQL Firewall
✗

This was identified as a deployment/network configuration issue rather than a PMS application-code defect.

The issue was intentionally paused for later infrastructure work and should not be "fixed" by changing PMS business code.

17.9 Production Troubleshooting Principle

When local and production behavior differ, troubleshoot the environment before modifying application logic.

The recommended sequence is:

Application configuration
↓
Environment variables
↓
DNS / network
↓
Firewall
↓
Identity / credentials
↓
Database / storage availability
↓
Application code

This avoids introducing unnecessary application changes to solve infrastructure problems.

17.10 Deployment Validation

A production deployment should validate at minimum:

Application starts
Database connection works
Authentication works
Authorization works
Core pages load
Critical CRUD operations work
Documents can be stored/retrieved
Reports load
Audit records are created

The exact validation set should be adjusted for the deployment change.

17.11 Git as the V1 Baseline

The Git repository is the source-of-truth baseline for the V1 implementation.

V1 was committed as:

9a3885a Complete PMS V1 implementation

and pushed to:

origin/main

The repository was clean immediately after the push.

This commit represents the V1 functional baseline from which subsequent refinement can proceed.

18. Development Standards

18.1 General Principle

Future PMS development should preserve the architectural and business-rule discipline established during V1.

New functionality should fit the existing system rather than introducing a parallel architecture without a clear reason.

18.2 Preferred Feature Development Order

The established implementation sequence is:

Prisma Model
↓
Types
↓
Schema
↓
Repository
↓
Commands
↓
Queries
↓
Actions
↓
Forms
↓
Dialogs
↓
Tables
↓
Workspace
↓
Page
↓
Route
↓
Test

This order encourages the business/domain foundation to be completed before presentation work.

18.3 Repository Responsibility

Repositories are responsible for database access.

They should not become the primary location for:

Authorization decisions

UI behavior

Presentation formatting

Workflow orchestration

Commands are responsible for business operations.

Queries are responsible for retrieving application data.

18.4 Command Responsibility

Commands represent meaningful business operations.

A command should generally:

Receive validated input.

Resolve the current user where required.

Check authorization.

Validate business conditions.

Execute the operation.

Record audit information where required.

Return the resulting domain data.

18.5 Query Responsibility

Queries should retrieve data required by the application.

Protected queries must enforce the required READ permission.

A query should not assume that because a page is protected, every query invoked by that page is automatically safe.

Authorization must exist at the appropriate server-side boundary.

18.6 Action Responsibility

Server Actions provide the UI-facing server boundary.

They should:

Validate input

Resolve the authenticated user

Invoke commands

Revalidate affected paths

Return structured results

Convert expected application errors into appropriate messages

Business rules should not be duplicated unnecessarily inside Actions.

18.7 Component Responsibility

Components should focus on presentation and interaction.

Forms should handle:

User input

Validation integration

Submission state

User feedback

They should not become the authoritative source of business rules.

18.8 Type Safety

PMS V1 follows strict TypeScript practices.

The preferred standard is:

No any
No unnecessary type assertions
Explicit domain types
Typed command inputs
Typed query results
Typed action results

The project should continue to use:

npx tsc --noEmit

as a routine validation step.

18.9 React Standards

The application uses functional React components.

Class components should not be introduced into the PMS architecture.

Components should remain focused and reusable where appropriate.

18.10 UI Standards

PMS uses Tailwind CSS v4 and Radix UI where appropriate.

The project does not use shadcn.

Existing shared components should be reused rather than creating duplicate implementations.

Examples include:

StatusBadge
RowActionButtons
ConfirmationDialog
MasterDataLayout
AccessDenied

18.11 Table Standards

Data tables should use the established Radix table primitives.

Raw HTML table implementations should not be introduced where the existing shared table system applies.

This keeps table behavior and presentation consistent across PMS.

18.12 Button Standards

The established shared button variants are:

primary
secondary
danger

New button variants should not be introduced casually.

18.13 Naming and Folder Structure

Feature-specific code belongs inside its feature folder.

A typical structure is:

src/features/<feature>/
├── actions/
├── commands/
├── components/
├── queries/
├── repositories/
├── schemas/
└── types/

Parentheses in the application routing structure should be used for Next.js route groups rather than being introduced as a general feature-folder convention.

18.14 Reuse Existing Patterns

Before creating a new implementation pattern:

Inspect a completed feature.

Identify the established pattern.

Determine whether the new feature genuinely differs.

Reuse the existing pattern where possible.

The Building, Building Space, Asset, Acquisition, Assignment, Document, and Administration implementations provide established examples.

18.15 Preserve Existing Business Rules

Existing PMS behavior should not be replaced merely for architectural uniformity.

Before modifying a feature:

Inspect current implementation
↓
Identify existing business rules
↓
Determine intended behavior
↓
Make the smallest required change
↓
Type-check
↓
Test affected behavior

This is especially important for rules such as:

Asset lifecycle behavior

Acquisition Item reassignment

Assignment constraints

Retirement eligibility

Disposal workflow

Document versioning

18.16 No Unnecessary Architecture

PMS should avoid introducing abstractions simply because they appear architecturally elegant.

An abstraction should have a practical reason, such as:

Shared business behavior

Repeated infrastructure behavior

Security requirement

Significant reduction in duplication

Clear domain boundary

The objective is maintainable production software, not architectural complexity for its own sake.

18.17 Audit Discipline

Developers should ask:

Is this operation meaningfully accountable?

before adding an audit event.

Not every mutation requires auditing.

When an operation does require audit:

Business mutation

- Audit event

should normally occur within the same transaction.

18.18 Authorization Discipline

Every new protected operation should identify its permission before implementation.

The developer should determine:

Who can READ?
Who can CREATE?
Who can UPDATE?
Who can DELETE/DEACTIVATE?
Who can perform lifecycle operations?

The permission should then be enforced server-side.

18.19 Development Completion Criteria

A PMS feature should not be considered complete merely because the UI is visible.

A complete feature should normally have:

Domain model
✓
Types
✓
Validation
✓
Repository
✓
Commands
✓
Queries
✓
Authorization
✓
Actions
✓
UI
✓
Business-rule testing
✓
Authorization testing
✓
TypeScript validation
✓
Audit where required
✓

The exact checklist can be shortened for simple master-data features.

18.20 V1-to-V2 Development Boundary

PMS V1 is the validated functional baseline.

Future V2 work should be treated separately from the V1 implementation unless a production defect requires an immediate correction.

Potential V2 work may include:

Broader architecture refinement

Additional business-rule hardening

Expanded reporting

UI/UX refinement

Additional operational capabilities

Deployment hardening

Additional automated tests

These should be evaluated against actual operational requirements rather than introduced speculatively.

End of Sections 16–18

The development lifecycle established by PMS V1 is therefore:

Design
↓
Implement
↓
Authorize
↓
Validate
↓
Test
↓
Audit where required
↓
Type-check
↓
Commit
↓
Deploy
↓
Operate
↓
Refine

This provides the baseline engineering discipline for future PMS development.

19. Operational Procedures

19.1 Purpose

This section provides practical operational guidance for maintaining PMS after the V1 implementation.

The objective is to preserve:

Application integrity

Authorization integrity

Database consistency

Auditability

Document security

Deployment stability

Operational changes should follow the same controlled approach used during development.

19.2 Adding a New Feature

A new PMS feature should begin with a clear definition of:

Business purpose

Entities involved

Business rules

Lifecycle

User roles

Permissions

Audit requirements

Reporting requirements

Document requirements where applicable

The feature should then follow the established implementation sequence.

Business Requirement
↓
Business Rules
↓
Data Model
↓
Authorization
↓
Implementation
↓
Testing
↓
Documentation

19.3 Adding a New Permission

A new permission should be added to the central permission catalog.

The developer should define:

Code
Resource
Action
Description

For example:

RESOURCE:ACTION

The permission should then be enforced at the appropriate server-side command or query boundary.

The UI may use the same permission to control visibility, but server-side enforcement remains mandatory.

19.4 Changing an Existing Business Rule

Business-rule changes require more care than ordinary code changes.

The recommended process is:

Identify current rule
↓
Identify reason for change
↓
Review affected entities
↓
Review authorization
↓
Review audit implications
↓
Modify command logic
↓
Review repository/data constraints
↓
Test old and new scenarios
↓
Update handbook

A business-rule change should not be implemented solely at the UI level.

19.5 Database Changes

When a database change is required:

Update the Prisma schema.

Generate a migration.

Review the migration.

Apply it in the development environment.

Run Prisma generation as required.

Type-check the application.

Test affected functionality.

Apply the migration through the controlled deployment process.

The migration history should remain part of Git.

19.6 Safe Database Changes

Particular care is required when changing:

Unique constraints

Foreign keys

Required fields

Enum-like status values

Relationships

Delete behavior

Existing production data

A schema change should be evaluated against existing records before deployment.

19.7 Permission Changes

Permission changes can affect both application behavior and existing role assignments.

Before removing or renaming a permission:

Identify commands using it.

Identify queries using it.

Identify UI checks using it.

Identify roles currently receiving it.

Update tests.

Update documentation.

Permission codes should not be casually renamed because they form part of the authorization vocabulary.

19.8 System Administrator Operations

System Administrator management is intentionally restricted.

The application allows an authorized System Administrator to appoint another valid PMS user as a System Administrator.

The operation requires:

Active target user

Valid target Azure identity

No duplicate active System Administrator assignment

Removal is protected by the rule that the system must not be left without an active System Administrator.

These operations are audited.

19.9 System Settings Operations

When changing a System Setting:

Verify the setting purpose.

Confirm the new value satisfies validation.

Update it through the System Settings functionality.

Verify the affected feature behavior.

Confirm the corresponding audit record exists where applicable.

For example, changing:

DOCUMENT_MAX_FILE_SIZE_MB

should be followed by an upload test using the new limit.

19.10 Document Operations

Document operations should be treated as both application and infrastructure operations.

When troubleshooting document uploads, check:

1. User authorization
2. Document validation
3. Maximum file size
4. Azure Blob configuration
5. Storage connectivity
6. Blob operation
7. Database metadata operation
8. Audit record where applicable

This separates application validation failures from storage infrastructure failures.

19.11 Production Troubleshooting

When a production problem occurs, use a structured investigation.

Step 1 — Identify the layer

Determine whether the problem is:

UI
Application
Authorization
Database
Storage
Network
Azure infrastructure
Configuration

Step 2 — Reproduce

Determine whether the issue:

Happens consistently

Happens only for one user

Happens only in production

Happens only for one feature

Happens only with specific data

Step 3 — Compare environments

Compare relevant:

Environment variables

Database connectivity

Storage configuration

Authentication configuration

Network access

Firewall rules

Step 4 — Avoid unnecessary code changes

If the evidence points to infrastructure, fix the infrastructure.

Do not change business logic simply because production behaves differently from development.

19.12 Production Database Connectivity

The V1 deployment investigation demonstrated an important operational principle.

If:

Local machine → PostgreSQL = successful
App Service → PostgreSQL = unsuccessful

while both use the intended database configuration, network controls should be investigated before application code.

In the identified V1 case, the relevant issue was PostgreSQL firewall access for the App Service outbound path.

19.13 Backup and Recovery Principle

The PostgreSQL database is the authoritative source for PMS relational data.

Operational environments should therefore maintain an appropriate database backup and recovery strategy.

The exact backup schedule and retention policy are deployment-level operational decisions rather than application business rules.

The same principle applies to document storage: Azure Blob Storage data requires an appropriate operational protection and recovery strategy.

19.14 Audit Monitoring

Audit records should be monitored when investigating:

Unexpected administrative changes

Asset accountability changes

Lifecycle decisions

Configuration changes

Document lifecycle events

Role or System Administrator changes

The Audit report should be treated as an accountability source, not merely a debugging log.

19.15 Release Procedure

A recommended PMS release process is:

Development
↓
TypeScript validation
↓
Business-rule testing
↓
Authorization testing
↓
Integration testing where required
↓
Git review
↓
Commit
↓
Push
↓
Deployment
↓
Production validation

The exact deployment mechanism may evolve, but the validation principles should remain.

20. PMS V1 Completion Summary

20.1 V1 Objective

PMS V1 was developed as a functional production-oriented Property Management System covering the organization's major property, building, asset, accountability, operational, lifecycle, reporting, administrative, document, and authorization requirements.

The implementation prioritized:

Functional correctness
Business rules
Authorization
Data integrity
Auditability
Operational workflows

UI/UX refinement was intentionally kept separate from the primary functional implementation phase.

20.2 Completed Functional Areas

The V1 implementation includes the following major areas.

Organization and Administration

Organization Units

Users

Employees

Country and geographic master data

System Settings

Role Management

System Administrator Management

Property Management

Properties

Property Types

Property Categories

Property Status

Property Tenure

Ownership

Ownership Types

Building Management

Buildings

Building Types

Building Conditions

Building Space Types

Building Spaces

Asset Management

Assets

Asset Types

Asset Categories

Asset Status

Asset Conditions

Asset Locations

Acquisition

Acquisitions

Acquisition Items

Acquisition Methods

Accountability

Asset Assignments

Asset Returns

Asset Movements

Employees

Physical Verification

Physical Verification

Verification Items

Unregistered Asset Observations

Operations

Maintenance

Maintenance Services

Incidents

Incident Resolution

Lifecycle Management

Retirement

Disposal

Disposal Items

Document Management

Document Types

Documents

Document Versions

Azure Blob Storage

Protected Downloads

Reporting

Asset Reporting

Acquisition Reporting

Assignment Reporting

Verification Reporting

Maintenance Reporting

Incident Reporting

Retirement Reporting

Movement Reporting

Disposal Reporting

Accountability Reporting

Audit Reporting

Dashboard Reporting

Security and Governance

Azure authentication

PMS application authorization

Role-based permissions

Permission catalog

Access-denied handling

Audit logging

Protected document access

System Administrator controls

20.3 Authorization Coverage

V1 established explicit permissions across the major feature areas.

The permission model covers:

Master Data
Assets
Acquisition
Accountability
Operations
Lifecycle
Documents
Reports
Administration
Role Management
System Administration
System Settings

The implementation does not rely on a generic "administrator can do everything" bypass.

20.4 Audit Coverage

Significant operations are audited across important domains.

The V1 implementation includes audit coverage for areas such as:

Assets

Asset accountability

Asset movement

Employees

Asset locations

Acquisitions

Acquisition Items

Acquisition Methods

Properties

Ownership

Buildings

Maintenance

Incidents

Retirement

Disposal

Documents

System Settings

Administrative operations

Audit is deliberately selective rather than exhaustive.

20.5 Transaction Integrity

V1 applies transactions where multiple database operations represent one logical business operation.

Important examples include:

Asset movement
Assignment
Return
Acquisition creation
Retirement workflow
Disposal workflow
Document-related operations
Audited administrative changes

Where audit is required, the audit event participates in the same transaction as the corresponding business mutation.

20.6 V1 Validation

The final V1 implementation passed the project's TypeScript validation:

npx tsc --noEmit

The final Git status was clean before the push.

The completed V1 was committed as:

9a3885a Complete PMS V1 implementation

The commit was successfully pushed to:

origin/main

Therefore this commit represents the documented V1 source baseline.

20.7 V1 Design Principles

The completed system demonstrates several central design principles.

Server-side authorization

Security decisions are enforced on the server.

Explicit business rules

Lifecycle and validation rules are implemented intentionally rather than being inferred from UI behavior.

Transactional integrity

Related mutations are grouped into transactions where required.

Selective auditing

Important business events are audited without treating every database mutation as an audit event.

Separation of concerns

Authentication, authorization, validation, commands, queries, repositories, and UI responsibilities remain distinct.

Reusable architecture

Completed feature patterns are reused across related modules.

Production orientation

The system is designed around real operational workflows rather than only CRUD screens.

21. V2 Direction and Future Evolution

21.1 Purpose

V2 should build on the V1 baseline rather than destabilize it.

V1 represents the functional foundation.

Future work should be driven by:

Operational feedback

Real user requirements

Identified defects

Security findings

Performance requirements

Reporting needs

Deployment experience

21.2 V1 Stability Principle

The V1 implementation should be treated as a stable baseline.

Future changes should not be introduced merely because a different architecture looks cleaner.

Before replacing an existing implementation, establish:

The problem with the current implementation.

The operational benefit of the proposed change.

The migration impact.

The regression risk.

The testing requirements.

21.3 UI/UX Refinement

A major area intentionally separated from functional V1 implementation is comprehensive UI/UX refinement.

Future UI/UX work may include:

Visual consistency

Dashboard refinement

Better information hierarchy

Improved forms

Improved tables

Responsive behavior

Navigation refinement

Accessibility improvements

Better feedback states

Empty-state design

Loading states

Error presentation

The objective should be to improve the existing functional system without changing established business rules unintentionally.

21.4 Additional Automated Testing

Future versions may increase automated test coverage.

Potential areas include:

Command-level tests

Authorization tests

Repository tests

Workflow transition tests

Concurrency tests

Document integration tests

Reporting tests

Regression tests

The existing manual authorization-testing methodology provides a foundation for converting important scenarios into automated tests.

21.5 Business Rule Hardening

V2 may revisit areas where V1 intentionally avoided assumptions.

Examples include:

Additional asset lifecycle transitions

Stronger database-level uniqueness guarantees

Expanded workflow states

Additional concurrency constraints

More detailed organizational rules

Additional document retention policies

Such changes should be introduced only after the business requirement is established.

21.6 Reporting Expansion

Future reporting may introduce:

Additional operational reports

More advanced filters

Date-range analysis

Trend reporting

Executive summaries

Export capabilities

More detailed dashboard metrics

Cross-domain analytical reports

Reporting should continue to use the authorization model rather than becoming an unrestricted data-access layer.

21.7 Document Management Expansion

Potential future document capabilities include:

Additional file formats

More sophisticated metadata

Document retention policies

Additional version-management controls

Document preview

Document search

Improved document categorization

Expanded audit reporting

The existing metadata/storage separation provides a foundation for these capabilities.

21.8 Deployment Hardening

The V1 production troubleshooting experience demonstrated that infrastructure configuration is an important part of the system.

Future operational work may include:

PostgreSQL firewall hardening

Private networking

Managed identity improvements

Storage security hardening

Monitoring

Application health checks

Alerting

Backup verification

Disaster recovery procedures

Deployment automation

These are operational improvements rather than changes to the PMS business domain.

21.9 Performance Optimization

Performance work should be evidence-driven.

Potential areas include:

Query optimization

Database indexing

Report query optimization

Pagination

Large-table rendering

Document processing

Dashboard aggregation

Caching where justified

Performance changes should be measured before and after implementation.

21.10 Architecture Evolution

The V1 architecture should remain the default starting point.

Architecture should evolve only when actual complexity justifies it.

Potential future improvements may include:

More reusable domain services

Better shared query patterns

More systematic integration testing

Background processing

Improved observability

Stronger domain boundaries

Such changes should be introduced incrementally rather than through unnecessary large-scale rewrites.

21.11 V2 Decision Framework

Before adding significant functionality or changing architecture, ask:

1. What real problem are we solving?
2. Is the problem already solved by V1?
3. Is the change required by a business rule?
4. Does it affect authorization?
5. Does it affect audit?
6. Does it affect existing data?
7. Does it affect reporting?
8. Does it require a database migration?
9. How will it be tested?
10. How will it affect production operations?

This keeps V2 development focused and controlled.

21.12 Final V1 Statement

PMS V1 establishes a complete functional foundation for the Property Management System.

Its principal achievement is not simply the number of screens or database entities.

The V1 foundation combines:

Domain Model +
Business Rules +
Authorization +
Transactional Integrity +
Auditability +
Document Management +
Reporting +
Administrative Controls +
Production Deployment Foundation

The system is therefore ready to serve as the baseline for operational use, controlled refinement, and future V2 development.

Handbook Completion

The PMS V1 Design & Implementation Handbook now documents:

Document Purpose

PMS Overview

Technology Stack

System Architecture

Application Structure

Feature and Module Map

Database and Domain Model

Authorization and Permission Architecture

Role Management and System Administrator

Business Rules and Entity Lifecycles

Audit Architecture

Document Management

System Settings

Reporting Architecture

Error Handling and Security

Testing Strategy

Deployment and Operations

Development Standards

Operational Procedures

PMS V1 Completion Summary

V2 Direction and Future Evolution

V1 Baseline

Git Commit:
9a3885a

Message:
Complete PMS V1 implementation

Branch:
main

Remote:
origin/main

Status:
Pushed successfully

This handbook should be treated as the technical reference for the completed PMS V1 implementation. Future changes should update the handbook when they materially change architecture, business rules, authorization, operational behavior, or other documented system behavior.
