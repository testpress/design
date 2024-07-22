module.exports = config => {
    config.addPassthroughCopy("img");
    config.addPassthroughCopy("CNAME");
    config.addPassthroughCopy("css/prism.css");
    config.addPassthroughCopy("css/settings.css");
    config.addPassthroughCopy("css/video-js.css");
    config.addPassthroughCopy("css/videojs-hls-quality-selector.css");
    config.addPassthroughCopy("css/videojs-controls.css");
    config.addPassthroughCopy("css/videojs-tps.css");
    config.addPassthroughCopy("css/chapter-plugin.min.css");
    config.addPassthroughCopy("js/settings.js");
    config.addPassthroughCopy("js/video.js");
    config.addPassthroughCopy("js/videojs-hls-quality-selector.js");
    config.addPassthroughCopy("js/videojs-sprite-thumbnails.js");
    config.addPassthroughCopy("js/prism.js");
    config.addPassthroughCopy("js/chapter-plugin.min.js");
    config.addPassthroughCopy('js/jscolor.js')
    config.addPassthroughCopy("./tailwind.css")
    config.addPassthroughCopy('./tailwind.config.js')
    config.addPassthroughCopy("css/tailwind.css");
    config.addPassthroughCopy("src/tpstreams/player/includes/player.html");
    config.addPassthroughCopy("fonts");
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
