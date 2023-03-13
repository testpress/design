module.exports = config => {
    config.addPassthroughCopy("img");
    config.addPassthroughCopy("CNAME");
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
