const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");

module.exports = (on) => {
    const options = browserify.defaultOptions;
    on("file:preprocessor", cucumber(options));
};