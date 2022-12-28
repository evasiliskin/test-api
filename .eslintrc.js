module.exports = {
    "env": {
        "node": true,
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
    }
}
