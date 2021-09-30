const preprocess = require("svelte-preprocess");

const config = {
  preprocess: [preprocess({
    scss: {
      "prependData": "@import \"src/variables.scss\";"
    }
  })]
};

module.exports = config;