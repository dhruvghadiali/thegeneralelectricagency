---
name: customize-shadcn-safely
description: Preserve shadcn-generated source while implementing CSS, layout, styling, responsive, accessibility, and UI behavior changes in React screens. Use for any frontend change in a project that uses shadcn/ui, especially when the requested result involves components under the shadcn UI alias, Tailwind classes, Radix states, variants, or visual customization.
---

# Customize shadcn Safely

Implement the requested result through composition and usage-site styling. Treat shadcn source as vendor-owned code.

## Establish the protected boundary

1. Read `components.json` before editing.
2. Resolve `aliases.ui`; in this repository it maps to `src/components/ui`.
3. Treat every existing file under that directory as protected, including component modules, variant helpers, and colocated styles.
4. Record the pre-task state of the protected path with `git status --short -- <path>` and `git diff -- <path>`. Preserve any pre-existing user changes.

Do not edit, reformat, rename, move, or delete protected files. Do not add hand-written customization code to them. Do not run a shadcn command that overwrites an existing component.

## Implement outside shadcn source

Use the narrowest suitable option:

1. Pass `className`, props, variants, and event handlers at the screen or feature usage site.
2. Put layout and responsive behavior in the owning screen or feature component.
3. Create a composed wrapper outside the protected directory, preferably under `src/components/common` or the relevant `src/components/screen` feature.
4. Scope custom CSS to that screen or wrapper outside the protected directory. Prefer Tailwind utilities when the project already uses them.
5. Style exposed Radix/shadcn states from the caller with supported `data-*`, `aria-*`, or descendant selectors when necessary.

Prefer composition over copying a shadcn file. If the primitive does not expose enough control, build a project-owned component around it rather than forking it inside `src/components/ui`.

Adding a new, unmodified registry component is allowed only when the task genuinely needs that primitive. Keep all project-specific styling and behavior outside the generated file.

## Handle conflicts

If the request explicitly requires changing the underlying shadcn implementation, explain that this conflicts with the protected-source rule and ask for explicit confirmation before touching it. A general request to change appearance or behavior is not permission to edit shadcn source.

Never discard pre-existing user edits while enforcing this rule. If this task accidentally changes a protected file, remove only the changes introduced by this task.

## Verify

1. Recheck `git status --short -- <protected-path>` and `git diff -- <protected-path>` against the recorded baseline.
2. Confirm the task introduced no protected-file changes.
3. Run the relevant lint, build, or focused tests for the changed screen or wrapper.
4. Report where the customization was implemented and explicitly confirm that shadcn source remained unchanged.
