# Changelog

All notable technical and architectural changes are documented here.

---

## 0.1.0 - Foundation

### Next.js

- Project created using Next.js 16 App Router.
- TypeScript enabled.
- Tailwind CSS v4 enabled.

### Prisma

- Prisma 7 adopted.
- Database configuration moved to `prisma.config.ts`.
- Generated client imported from `@/generated/prisma/client`.
- Prisma Client uses the PostgreSQL adapter (`@prisma/adapter-pg`).
- PostgreSQL configured as the primary database.

### Database

- Country model implemented.
- OrganizationUnit model implemented.
- Self-referencing hierarchy introduced for organizational structure.

### Architecture

- Feature-based folder structure adopted.
- Vertical slice development adopted.

## Prisma Development Workflow

After adding or modifying Prisma models:

1. Update `schema.prisma`
2. Run migration:
   ```bash
   npx prisma migrate dev --name <migration_name>
   ```
