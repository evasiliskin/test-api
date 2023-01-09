module.exports = {
    "env": {
        "node": true,
        "mocha": true,
    },
    "extends": ["airbnb-base", "prettier", "plugin:node/recommended"],
    "plugins": ["prettier"],
    "ignorePatterns": ['.eslintrc.js'],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "prettier/prettier": "error",
        "node/no-unpublished-require": ["error", {
            "allowModules": [
              "chai",
              "sinon",
              "supertest",
              "chai-uuid",
              "chai-exclude",
            ]
        }]
    }
}
