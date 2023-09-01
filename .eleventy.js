module.exports = config => {
    config.addPassthroughCopy("img");
    config.addPassthroughCopy("CNAME");
    config.addPassthroughCopy("css/prism.css");
    config.addPassthroughCopy("js/prism.js");
    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'public'
        }
    };
};
