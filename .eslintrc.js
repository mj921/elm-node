module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins": [],
  "rules": {
    "no-console": "off",
    "eqeqeq": "warn",
    "comma-spacing": ["warn", { "before": false, "after": true }],
    "func-call-spacing": ["warn", "never"],
    "no-mixed-spaces-and-tabs": "warn",
    "no-trailing-spaces": "warn",
    "quotes": ["warn", "double"],
    "semi": ["warn", "always"],
    "constructor-super": "warn",
    "no-const-assign": "warn",
    "key-spacing": ["warn", { "beforeColon": false }],
    "object-curly-spacing": ["warn", "always"],
    "indent": ["warn", 2, { "SwitchCase": 1, "MemberExpression": 0 }],
    "no-useless-constructor": "off",
  }
};