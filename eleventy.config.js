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
