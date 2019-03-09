var fs = require('fs');
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

// Reverse elements of an array
function reverse(array) {
    array = array.slice();
    array.reverse();
    return array;
}

// Return the modification time in epoch seconds
function mtime(path) {
	return (fs.statSync(path).mtimeMs / 1000) | 0;
}

module.exports = function(eleventyConfig) {
    [
        "img",
        "thumb",
        "photos",
        "css",
        "js",
        "events",
        "newsletters",
        "newsletter-thumb",
		"join",
        "favicon.jpg",
        "site.webmanifest",
        "robots.txt",
    ].forEach(path => eleventyConfig.addPassthroughCopy(path));

    eleventyConfig.addHandlebarsHelper('if-changed', ifChanged);
    eleventyConfig.addHandlebarsHelper('repeat', repeat);
    eleventyConfig.addHandlebarsHelper('reverse', reverse);
    eleventyConfig.addHandlebarsHelper('mtime', mtime);

    return {
        passthroughFileCopy: true
    };
};
