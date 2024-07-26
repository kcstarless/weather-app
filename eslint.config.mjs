import globals from "globals";
import pluginJs from "@eslint/js";


export default {
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.browser,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: {
    'eslint-plugin': pluginJs,
  },
  extends: [
    pluginJs.configs.recommended,
  ],
  rules: {
    // your custom rules here
  },
};