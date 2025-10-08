import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Add jsx-a11y accessibility rules
  ...compat.extends("plugin:jsx-a11y/recommended"),
  // Prettier config should come last to override conflicting rules
  ...compat.extends("prettier"),
  // Add nextjs-enforce-use-client plugin
  ...compat.config({
    plugins: ["nextjs-enforce-use-client"],
    rules: {
      "nextjs-enforce-use-client/enforce-use-client-react": "error",
    },
  }),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    plugins: {
      "simple-import-sort": (await import("eslint-plugin-simple-import-sort"))
        .default,
      perfectionist: (await import("eslint-plugin-perfectionist")).default,
      "@eslint-react": (await import("@eslint-react/eslint-plugin")).default,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React and React-related packages first
            ["^react", "^@?\\w"],
            // Next.js packages
            ["^next"],
            // Other third-party packages
            [
              "^@fortawesome",
              "^react-bootstrap",
              "^formik",
              "^yup",
              "^react-toastify",
              "^@?\\w",
            ],
            // Internal packages (our utilities)
            ["^@/utils"],
            // Components
            ["^@/components"],
            // API/fetching
            ["^@/fetching"],
            // Types
            ["^@/types"],
            // Relative imports
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      // JSX props sorting
      "perfectionist/sort-jsx-props": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          ignoreCase: true,
        },
      ],
      // Prefer destructuring assignment in React
      "@eslint-react/prefer-destructuring-assignment": "error",

      // === Enhanced JSX A11Y Rules for Better Accessibility ===
      // Override some default jsx-a11y rules for better control
      "jsx-a11y/media-has-caption": "warn", // Media should have captions (warn for flexibility)
      "jsx-a11y/no-autofocus": "warn", // Avoid autofocus (warn for forms)
      "jsx-a11y/control-has-associated-label": "warn", // Controls should have labels (warn for flexibility)
      "jsx-a11y/click-events-have-key-events": "error", // Click events need keyboard events
      "jsx-a11y/no-static-element-interactions": "error", // Static elements shouldn't have interactions
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"], // Allow Next.js Link components
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
      // Additional strict rules for better accessibility
      "jsx-a11y/no-noninteractive-tabindex": "error", // No tabindex on non-interactive elements
      "jsx-a11y/tabindex-no-positive": "error", // No positive tabindex values
      "jsx-a11y/interactive-supports-focus": "error", // Interactive elements must be focusable
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          required: {
            some: ["nesting", "id"],
          },
        },
      ],
    },
  },
];

export default eslintConfig;
