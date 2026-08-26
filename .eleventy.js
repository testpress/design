const groupBy = require("./js/groupBy");
const filter = require("./js/filter");
module.exports = config => {
    // Ignore the build output and node_modules from the file watcher
    // to prevent unnecessary re-builds when output files change
    config.watchIgnores.add("public/**");
    config.watchIgnores.add("node_modules/**");
    config.watchIgnores.add("src/simba/node_modules/**");
    config.watchIgnores.add("src/odinhire/node_modules/**");
    config.watchIgnores.add("src/limeread/node_modules/**");

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
    config.addFilter("dueIn", (dateString) => {
        if (!dateString) return "";
        const today = new Date();
        const deadline = new Date(dateString);
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "Expired";
        if (diffDays === 0) return "Due today";
        if (diffDays === 1) return "Due tomorrow";
        if (diffDays <= 14) return `Due in ${diffDays} days`;
        
        return `Due on ${new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    });
    config.addFilter("formatDate", (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    config.addFilter("filterByJobId", function(items, jobId) {
        if (!Array.isArray(items)) return [];
        return items.filter(item => item.job_id === jobId);
    });
    config.addFilter("filterByStates", function(items, states) {
        if (!Array.isArray(items)) return [];
        return items.filter(item => states.includes(item.state));
    });
    config.addFilter("filterByHighValue", function(items) {
        if (!Array.isArray(items)) return [];

        const signalPriority = (item) => {
            const t = (item.latest_activity || "").toLowerCase();
            if (t.includes("payment failed")) return 0;
            if (t.includes("abandoned")) return 1;
            if (t.includes("pre-purchase enquiry") || t.includes("product enquiry") || t.includes("enquiry")) return 2;
            if (t.includes("viewed")) return 3;
            return 4;
        };

        const extractPrice = (product) => {
            const match = (product || "").match(/₹(\d+(?:\.\d+)?)(k|l)?/i);
            if (!match) return 0;
            let val = parseFloat(match[1]);
            if (match[2] && match[2].toLowerCase() === 'k') val *= 1000;
            if (match[2] && match[2].toLowerCase() === 'l') val *= 100000;
            return val;
        };

        return items
            .filter(item => signalPriority(item) < 4)
            .sort((a, b) => {
                const pa = signalPriority(a), pb = signalPriority(b);
                if (pa !== pb) return pa - pb;
                // Within same signal: no chat first, chat last
                const chatA = a.student_reply ? 1 : 0;
                const chatB = b.student_reply ? 1 : 0;
                if (chatA !== chatB) return chatA - chatB;
                // Then by price descending
                const priceA = extractPrice(a.product), priceB = extractPrice(b.product);
                if (priceB !== priceA) return priceB - priceA;
                return 0;
            });
    });
    config.addFilter("getStrongestSignal", function(item) {
        if (!item) return "";
        const timelineStr = JSON.stringify(item.timeline || {}).toLowerCase();
        const latestAct = (item.latest_activity || "").toLowerCase();
        
        if (latestAct.includes("payment failed") || timelineStr.includes("payment failed")) {
            return "Payment failed";
        }
        if (latestAct.includes("abandoned") || timelineStr.includes("abandoned") || timelineStr.includes("checkout started") || latestAct.includes("checkout started")) {
            return "Checkout abandoned";
        }
        if (latestAct.includes("pre-purchase enquiry") || latestAct.includes("product enquiry") || latestAct.includes("enquiry") || timelineStr.includes("pre-purchase enquiry") || timelineStr.includes("product enquiry") || timelineStr.includes("enquiry")) {
            return "Pre-purchase enquiry";
        }
        if (latestAct.includes("viewed") || timelineStr.includes("viewed") || latestAct.includes("pricing") || timelineStr.includes("pricing")) {
            return "Repeated product interest";
        }
        return "Repeated product interest";
    });
    
    config.addFilter("filterByActive", function(items) {
        if (!Array.isArray(items)) return [];
        return items.filter(item => item.state !== 'Converted' && item.state !== 'Closed');
    });

    config.addFilter("filterByFollowUpToday", function(items) {
        if (!Array.isArray(items)) return [];
        return items.filter(item => item.follow_up && item.follow_up !== "—" && item.follow_up.includes('Today'));
    });
    config.addFilter("filterByFollowUpUpcoming", function(items) {
        if (!Array.isArray(items)) return [];
        return items.filter(item => item.follow_up && item.follow_up !== "—" && !item.follow_up.includes('Today'));
    });
    config.addFilter("limit", function(array, limit) {
        if (!Array.isArray(array)) return [];
        return array.slice(0, limit);
    });
    config.addFilter("sortByHighPurchaseInterest", function(items) {
        if (!Array.isArray(items)) return [];

        const signalPriority = (item) => {
            const latestAct = (item.latest_activity || "").toLowerCase();
            const yourReply = item.your_reply || "";
            if (latestAct.includes("payment failed")) return 0;
            if (latestAct.includes("abandoned") || latestAct.includes("checkout")) return 1;
            if (latestAct.includes("pre-purchase") || latestAct.includes("enquiry") || item.student_reply) return 2;
            if (latestAct.includes("viewed") || latestAct.includes("pricing")) return 3;
            if (latestAct.includes("replied") || yourReply) return 4;
            if (latestAct.includes("meeting") || latestAct.includes("follow-up")) return 5;
            return 6;
        };

        const extractPrice = (product) => {
            const match = (product || "").match(/₹(\d+(?:\.\d+)?)(k|l)?/i);
            if (!match) return 0;
            let val = parseFloat(match[1]);
            if (match[2] && match[2].toLowerCase() === 'k') val *= 1000;
            if (match[2] && match[2].toLowerCase() === 'l') val *= 100000;
            return val;
        };

        return [...items].sort((a, b) => {
            const pa = signalPriority(a), pb = signalPriority(b);
            if (pa !== pb) return pa - pb;
            const priceA = extractPrice(a.product), priceB = extractPrice(b.product);
            if (priceB !== priceA) return priceB - priceA;
            return 0;
        });
    });
    config.addFilter("split", function(str, separator) {
        if (typeof str !== "string") return [];
        return str.split(separator);
    });
    config.addPassthroughCopy({ "src/testpress/api": "api" });
    config.addPassthroughCopy("css/simba.css");
    config.addPassthroughCopy("css/odinhire.css");
    config.addPassthroughCopy("css/limeread.css");
    config.addPassthroughCopy("css/sentinel.css");
    config.addPassthroughCopy({
        "src/odinhire/node_modules/preline/dist/preline.js":
            "src/odinhire/node_modules/preline/dist/preline.js",
    });
    config.addPassthroughCopy({
        "src/limeread/node_modules/preline/dist/preline.js":
            "src/limeread/node_modules/preline/dist/preline.js",
    });
    config.addPassthroughCopy({
        "src/simba/node_modules/preline/dist/preline.js":
            "src/simba/node_modules/preline/dist/preline.js",
    });
    config.addPassthroughCopy({
        "src/sentinel/node_modules/preline/dist/preline.js":
            "src/sentinel/node_modules/preline/dist/preline.js",
    });
    config.addPassthroughCopy({
        "src/simba/node_modules/apexcharts/dist/apexcharts.css":
            "src/simba/node_modules/apexcharts/dist/apexcharts.css",
    });
    config.addPassthroughCopy({
        "src/simba/node_modules/lodash/lodash.min.js":
            "src/simba/node_modules/lodash/lodash.min.js",
    });
    config.addPassthroughCopy({
        "src/simba/node_modules/apexcharts/dist/apexcharts.min.js":
            "src/simba/node_modules/apexcharts/dist/apexcharts.min.js",
    });
    config.addPassthroughCopy({
        "src/simba/node_modules/clipboard/dist/clipboard.min.js":
            "src/simba/node_modules/clipboard/dist/clipboard.min.js",
    });
    config.addPassthroughCopy({
        "src/simba/node_modules/preline/dist/helper-clipboard.js":
            "src/simba/node_modules/preline/dist/helper-clipboard.js",
    });
    config.addPassthroughCopy({
        "src/simba/node_modules/preline/dist/helper-apexcharts.js":
            "src/simba/node_modules/preline/dist/helper-apexcharts.js",
    });
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
