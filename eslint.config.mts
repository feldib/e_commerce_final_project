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
  // Prettier config should come last to override conflicting rules
  ...compat.extends("prettier"),
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
    },
  },
];

export default eslintConfig;
