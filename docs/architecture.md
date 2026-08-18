1. Vision
2. System Context
3. Architectural Principles
4. Feature-Based Architecture
5. Folder Structure
6. Layer Responsibilities
7. Server/Client Component Strategy
8. Shared Component Strategy
9. Development Lifecycle
10. Reference Implementations

UI
↓
Server Actions
↓
Commands / Queries
↓
Repositories
↓
Prisma
↓
Database

                    LEASE MANAGEMENT
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │

Lease Contract Premises Parties
│ │ │
├── Number ├── Property ├── Landlord
├── Type ├── Building ├── Contact
├── Status └── Space └── Organization
├── Start
├── End
├── Notice
└── Terms
│
├────────────── Financial
│ │
│ ├── Rent
│ ├── Escalation
│ ├── Service Charges
│ ├── Deposit
│ └── Payment Schedule
│
├────────────── Lifecycle
│ │
│ ├── Draft
│ ├── Review
│ ├── Approval
│ ├── Signed
│ ├── Active
│ ├── Renewal
│ ├── Expiry
│ └── Termination
│
├────────────── Documents
│
├────────────── Inspections
│
└────────────── Notifications
│
├── 90 days
├── 60 days
├── 30 days
└── Overdue

///////////////

        Real-world NGO practice
        ↓

Business concept
↓
Business rules
↓
Domain model
↓
Prisma model
↓
Types
↓
Schema
↓
Repository
↓
Commands / Queries
↓
Actions
↓
UI
↓
Testing

//Architecture

PROPERTY
│
├── OWNERSHIP
│ ├── Owned
│ └── Other ownership arrangements
│
├── OCCUPANCY / USE
│ │
│ └── LEASE
│ ├── Arrangement Type
│ ├── Premises
│ ├── Parties
│ ├── Contract Terms
│ ├── Financial Terms
│ ├── Renewals
│ ├── Amendments
│ └── Documents
│
└── BUILDING
└── BUILDING SPACE

Decision 1

A Lease represents a contractual arrangement, not a physical property.

Decision 2

One Lease may cover one or multiple premises.

Decision 3

Physical premises are represented through a separate LeasePremises concept.

Decision 4

A property/building/space may potentially participate in multiple leases over its lifetime, but overlapping active leases should be controlled by business rules.

Decision 5

Lease amendments and renewals must preserve history rather than overwrite the original contract.

Decision 6

Detailed financial schedules should not clutter the core Lease record.

                         PROPERTY
                            │
                  ┌─────────┴─────────┐
                  │                   │
              OWNERSHIP            LEASE
                                      │
                   ┌──────────────────┼─────────────────┐
                   │                  │                 │
                Parties           Premises          Terms
                   │                  │                 │
             Party + Role       Property/Building    Dates
                                  /Space              Financials
                                      │
                                      │
                                  Documents
                                  Amendments
                                  Renewals

High Level PMS Structue

                         PROPERTY MANAGEMENT SYSTEM
                                  (PMS)
                                     │
        ┌────────────────────────────┼────────────────────────────┐
        │                            │                            │
        ▼                            ▼                            ▼

PROPERTY / REAL ESTATE ASSET MANAGEMENT LEASE MANAGEMENT
MANAGEMENT
│ │ │
├── Properties ├── Assets ├── Leases
├── Buildings ├── Asset Categories ├── Lease Parties
├── Spaces ├── Asset Locations ├── Premises
├── Locations ├── Assignment ├── Financial Terms
├── Ownership ├── Maintenance ├── Renewals
└── Property Master Data ├── Disposal ├── Amendments
└── Asset History ├── Documents
└── Monitoring

              ASSET MANAGEMENT SYSTEM
                       │
             ┌─────────┴─────────┐
             │                   │
       Property Foundation     Assets
             │                   │
       ┌─────┼─────┐       ┌─────┼──────┐
       │     │     │       │     │      │
    Property Building Floor  Register Assignment Transfer
                                      │
                                      ├── Maintenance
                                      ├── Disposal
                                      └── History


                FUTURE
                   │
                   ▼
             Lease Management
                   │
                   ▼
             Broader PMS



             ASSET

│
├── Identity
│ ├── assetCode
│ ├── assetTagNumber
│ ├── serialNumber
│ ├── name
│ └── description
│
├── Classification
│ ├── classification
│ ├── type
│ └── category
│
├── Location
│ └── currentLocation
│
├── Accountability
│ ├── department
│ └── custodian
│
└── Current State
├── status
└── condition

      Modules Asset Management System

ASSET MANAGEMENT SYSTEM
│
├── 1. Asset Registry & Classification
│
├── 2. Asset Acquisition
│
├── 3. Asset Assignment & Accountability
│
├── 4. Asset Location & Movement
│
├── 5. Physical Verification & Inventory
│
├── 6. Maintenance & Service Management
│
├── 7. Asset Incident Management
│
├── 8. Asset Retirement & Disposal
│
└── 9. Reporting, Audit & Administration

| Module                                   | Main question it answers                                   |
| ---------------------------------------- | ---------------------------------------------------------- |
| **1. Asset Registry & Classification**   | What is the asset?                                         |
| **2. Asset Acquisition**                 | How did we acquire it?                                     |
| **3. Asset Assignment & Accountability** | Who/which department is responsible?                       |
| **4. Asset Location & Movement**         | Where is it and how did it get there?                      |
| **5. Physical Verification & Inventory** | Is the recorded information physically correct?            |
| **6. Maintenance & Service Management**  | Is the asset being maintained and serviced properly?       |
| **7. Asset Incident Management**         | What happened when an unusual/loss/damage event occurred?  |
| **8. Asset Retirement & Disposal**       | How does the asset leave active organizational use?        |
| **9. Reporting, Audit & Administration** | How do we control, monitor, audit, and administer the AMS? |

1. Asset Registry & Classification
   ├── Asset Category ✅
   ├── Asset Type ✅
   ├── Asset Status ✅
   ├── Asset Condition ← Next recommended
   ├── Asset
   └── supporting asset masters

2. Asset Acquisition
   ├── Acquisition Method
   ├── Supplier/Vendor
   ├── Purchase/Acquisition
   └── ...

3. Asset Assignment & Accountability
   ├── Employee/Responsible Person
   ├── Assignment
   └── Accountability

4. Asset Location & Movement
   ├── Location
   ├── Asset Location
   └── Movement/Transfer

5. Physical Verification & Inventory
   ├── Verification
   └── Inventory

6. Maintenance & Service Management

7. Asset Incident Management

8. Asset Retirement & Disposal

9. Reporting, Audit & Administration

/////
Asset Registry
├── Asset
├── Asset Type
├── Asset Status
├── Asset Condition
└── Classification
↓
Asset Acquisition
├── Acquisition
├── Acquisition Method
└── Acquisition Item
↓
Asset Assignment & Accountability ← NEXT
