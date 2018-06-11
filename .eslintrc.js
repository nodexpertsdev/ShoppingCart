module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true
  },
  "parser": "babel-eslint",
  "ecmaFeatures": {
    "classes": true,
  },
  "settings": {
    "import/core-modules": ["prop-types"],
  },
  "rules": {
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "global-require": "off",
    "no-underscore-dangle": ["error", { "allow": ['_id'] }],
    "react/no-did-mount-set-state" : "off"
  },
};