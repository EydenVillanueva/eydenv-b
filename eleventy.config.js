const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("cacheBust", (url) => {
    const filePath = path.join(__dirname, "src", url);
    const hash = crypto.createHash("md5").update(fs.readFileSync(filePath)).digest("hex").slice(0, 10);
    return `${url}?v=${hash}`;
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(dateObj);
  });

  eleventyConfig.addFilter("groupByYear", (posts) => {
    const byYear = new Map();
    posts.forEach((post) => {
      const year = post.date.getUTCFullYear();
      if (!byYear.has(year)) byYear.set(year, []);
      byYear.get(year).push(post);
    });
    return Array.from(byYear.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([year, yearPosts]) => ({ year, posts: yearPosts.slice().reverse() }));
  });

  eleventyConfig.addCollection("postTags", (api) => {
    const tags = new Set();
    api.getFilteredByTag("post").forEach((post) => {
      (post.data.tags || []).forEach((tag) => {
        if (tag !== "post") tags.add(tag);
      });
    });
    return Array.from(tags).sort();
  });

  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
};
