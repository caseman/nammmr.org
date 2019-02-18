module.exports = function(eleventyConfig) {
    [
        "img",
        "thumb",
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
