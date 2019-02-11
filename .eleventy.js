module.exports = function(eleventyConfig) {
    [
        "img",
        "css",
        "js",
        "favicon.jpg",
        "site.webmanifest",
        "robots.txt",
    ].forEach(path => eleventyConfig.addPassthroughCopy(path));

    return {
        passthroughFileCopy: true
    };
};
