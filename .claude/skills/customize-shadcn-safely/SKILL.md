---
name: customize-shadcn-safely
description: Preserve shadcn-generated source while implementing CSS, layout, styling, responsive, accessibility, and UI behavior changes in React screens. Use for any frontend change in a project that uses shadcn/ui, especially when the requested result involves components under the shadcn UI alias, Tailwind classes, Radix states, variants, or visual customization.
---

# Customize shadcn Safely

Implement the requested result through composition and usage-site styling. Treat shadcn source as vendor-owned code.

## Establish the protected boundary

1. Read `components.json` before editing.
2. Resolve `aliases.ui`; in this repository it maps to `src/components/ui`.
3. Treat every existing file under that directory as protected, including component modules, variant helpers (`cva` definitions), and colocated styles.
4. Record the pre-task state of the protected path:

   ```bash
   git status --short -- src/components/ui
   git diff -- src/components/ui
   ```

   Preserve any pre-existing user changes — a dirty protected file at baseline stays exactly as dirty at the end.

Do not edit, reformat, rename, move, or delete protected files. Do not add hand-written customization code to them. Do not run a shadcn CLI command that overwrites an existing component (`npx shadcn@latest add <existing>` without care will clobber it).

## Implement outside shadcn source

Use the narrowest suitable option, in order:

1. Pass `className`, props, `variant`/`size`, and event handlers at the screen or feature usage site. Merge with the project's `cn` helper from `@/lib/utils`.
2. Put layout and responsive behavior in the owning screen or feature component.
3. Create a composed wrapper outside the protected directory — `src/components/common` for cross-screen reuse, or the relevant `src/components/screen/<feature>` folder for one-off usage.
4. Scope custom CSS to that screen or wrapper outside the protected directory. Prefer Tailwind utilities and the existing CSS variables in `src/index.css` / `tailwind.config.js`; reach for a colocated `.css` file only when utilities cannot express it.
5. Style exposed Radix/shadcn states from the caller with supported `data-*` and `aria-*` selectors (`data-[state=open]:`, `aria-[expanded=true]:`, `[&_[data-slot=trigger]]:`) or descendant selectors when necessary.

Prefer composition over copying a shadcn file. If the primitive does not expose enough control, build a project-owned component around it rather than forking it inside `src/components/ui`.

Adding a new, unmodified registry component is allowed only when the task genuinely needs that primitive. Keep all project-specific styling and behavior outside the generated file.

## Handle conflicts

If the request explicitly requires changing the underlying shadcn implementation, explain that this conflicts with the protected-source rule and ask for explicit confirmation before touching it. A general request to change appearance or behavior is not permission to edit shadcn source.

Never discard pre-existing user edits while enforcing this rule. If this task accidentally changes a protected file, revert only the changes this task introduced.

## Verify

1. Recheck `git status --short -- src/components/ui` and `git diff -- src/components/ui` against the recorded baseline.
2. Confirm the task introduced no protected-file changes.
3. Run the relevant lint, build, or focused tests for the changed screen or wrapper (`npm run lint`, `npm run build`).
4. Report where the customization was implemented and explicitly confirm that shadcn source remained unchanged.
