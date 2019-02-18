// if-changed helper only renders contents if value differs from last invocation
function ifChanged(value, options) {
    if (value !== options.data.__ifChanged_last) {
        options.data.__ifChanged_last = value;
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
}

module.exports = function(eleventyConfig) {
    [
        "img",
        "thumb",
        "photos",
        "css",
        "js",
        "favicon.jpg",
        "site.webmanifest",
        "robots.txt",
    ].forEach(path => eleventyConfig.addPassthroughCopy(path));

    eleventyConfig.addHandlebarsHelper('if-changed', ifChanged);

    return {
        passthroughFileCopy: true
    };
};
