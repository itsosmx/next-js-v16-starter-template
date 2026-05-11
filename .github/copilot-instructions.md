---
applyTo: "**/*.ts, **/*.tsx"
---

## Project Overview

[Project Overview]

## Instructions for Contributing to the Project

- use shadcn/ui components where applicable, check the MCP for reference
- ensure responsiveness and accessibility best practices
- maintain existing functionality and design consistency
- optimize imports and remove unused code
- ensure to use theme colors and not hardcoded colors, only when necessary.
- Use `cn()` for conditional classes: `cn("base-class", {"conditional-class": condition})`
- Leverage CSS variables from Tailwind config in `globals.css`
- if working with dates, use `date-fns` for formatting and manipulation
- check the prisma schema for data models and relationships
- for loading use the loader component in `src/components/blocks/loader`
- design must be mobile first and responsive.
- Don't define types in the same file unless it's a small component and the type is only used there, otherwise keep types in `src/types` and import them when needed
- types should be for zod naming should be `Z[Name]Props` and interfaces should be `I[Name]Props` and enums should be `E[Name]Props` and for zod infer to type named `I[Name]Props`
- in case using shadcn cards make sure to use its subcomponents like `CardHeader`, `CardTitle`, `CardContent` etc. and not custom divs
- when working with forms use `react-hook-form` and `zod` for validation
- when fetching data use `useQuery` from `@tanstack/react-query` and for mutations use `useMutation` from `@tanstack/react-query` inside queries folder under its respective domain
- for API calls use the fetcher utility in `src/lib/fetcher.ts`
- for API routes require authentication use the `requireAuth` helper in `src/lib/middlewares`
- for API routes use the `throwAPIError` object in `src/lib/middlewares/error.middleware.ts` for consistent error handling and status codes, and add missing status codes if needed.
- in case of forms don't define zod schema look for existing first and if the form is part of a bigger existing zod schema use `z.object().pick()` or `z.object().omit()` to create a smaller schema
- when working with triggering fetch request use toast promise for better UX
- try not to override shadcn components styles or adding classes unless necessary
- when working with `Card`, `Tabs`, `AlertDialog`, `DropdownMenu`, `Select`, `DataTable` use their respective shadcn subcomponents and avoid custom divs
- when translating text use next-intl and add translations in respective locale files in `/locales` folder
- when writing translation keys use camelCase and avoid spaces and special characters
