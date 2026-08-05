# Project Notes

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
