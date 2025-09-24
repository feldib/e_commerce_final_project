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
    },
  },
];

export default eslintConfig;
