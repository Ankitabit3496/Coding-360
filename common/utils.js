const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Function to make an HTTP GET request and return HTML content.
 * @param {string} url The URL to fetch data from.
 * @returns {Promise<string>} Promise resolving to HTML content.
 */
const fetchHtmlContent = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching HTML from ${url}:`, error);
        throw error;
    }
};

/**
 * Function to parse HTML content using Cheerio.
 * @param {string} html HTML content to parse.
 * @returns {CheerioStatic} Cheerio object representing parsed HTML.
 */
const parseHtml = (html) => {
    return cheerio.load(html);
};

module.exports = {
    fetchHtmlContent,
    parseHtml,
};
