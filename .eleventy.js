var handlebars = require('handlebars');

// if-changed helper only renders contents if value differs from last invocation
function ifChanged(value, options) {
    if (value !== options.data.__ifChanged_last) {
        options.data.__ifChanged_last = value;
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
}

// repeat helper repeatedly renders a template passing a repeat count
function repeat(times, options) {
    var data;
    var ret = '';
    if (options.data) {
        data = handlebars.createFrame(options.data);
    }
    if (times > 0) {
        for (var i = 1; i <= times; i++) {
            if (data) {
                data.count = i;
            }
            ret += options.fn(this, { data: data });
        }
    }
    return ret;
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
    eleventyConfig.addHandlebarsHelper('repeat', repeat);

    return {
        passthroughFileCopy: true
    };
};
