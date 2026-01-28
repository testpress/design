const groupBy = require("./js/groupBy");
const filter = require("./js/filter");
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
    config.addPassthroughCopy("node_modules/preline/dist/preline.js");
    config.addPassthroughCopy("node_modules/clipboard/dist/clipboard.min.js");
    config.addPassthroughCopy("node_modules/preline/dist/helper-clipboard.js");
    config.addPassthroughCopy("node_modules/@themesberg/tailwind-datepicker/dist/js/datepicker-full.js");
    config.addPassthroughCopy("node_modules/@themesberg/tailwind-datepicker/dist/css/datepicker.min.css");
    config.addPassthroughCopy("node_modules/jquery/dist/jquery.min.js");
    config.addPassthroughCopy("node_modules/datatables.net/js/dataTables.min.js");
    config.addPassthroughCopy("node_modules/datatables.net-colreorder/js/dataTables.colReorder.min.js");
    config.addPassthroughCopy("node_modules/apexcharts/dist/apexcharts.css");
    config.addPassthroughCopy("node_modules/preline/dist/helper-apexcharts.js");
    config.addPassthroughCopy("node_modules/lodash/lodash.min.js");
    config.addPassthroughCopy("node_modules/dropzone/dist/dropzone-min.js");
    config.addPassthroughCopy("node_modules/apexcharts/dist/apexcharts.min.js");
    config.addPassthroughCopy("node_modules/vanilla-calendar-pro/index.js");
    config.addPassthroughCopy("node_modules/@preline/datepicker/index.js");
    config.addPassthroughCopy("css/preline-datepicker.src.css");
    config.addPassthroughCopy("./tailwind.css")
    config.addPassthroughCopy('./tailwind.config.js')
    config.addPassthroughCopy("css/tailwind.css");
    config.addPassthroughCopy("fonts");
    config.addFilter("groupBy", groupBy);
    config.addFilter("filter", filter);
    config.addPassthroughCopy({ "src/api": "api" });
    config.addPassthroughCopy("css/simba.css");
    config.addPassthroughCopy("src/simba/node_modules/preline/dist/preline.js");
    config.addPassthroughCopy("src/simba/node_modules/apexcharts/dist/apexcharts.css");
    config.addPassthroughCopy("src/simba/node_modules/lodash/lodash.min.js");
    config.addPassthroughCopy("src/simba/node_modules/apexcharts/dist/apexcharts.min.js");
    config.addPassthroughCopy("src/simba/node_modules/clipboard/dist/clipboard.min.js");
    config.addPassthroughCopy("src/simba/node_modules/preline/dist/helper-clipboard.js");
    config.addPassthroughCopy("src/simba/node_modules/preline/dist/helper-apexcharts.js");
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
