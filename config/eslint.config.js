import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
            "eqeqeq": "error",
            "semi": ["error", "always"],
            "eol-last": ["error", "always"]
        }
    }
];