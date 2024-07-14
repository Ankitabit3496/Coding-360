const { fetchHtmlContent, parseHtml } = require('./common/utils');
const { CODECHEF_URL } = require('./common/constants');

/**
 * Function to scrape CodeChef profile information.
 * @param {string} username The CodeChef username of the user.
 * @returns {Promise<Object>} Promise resolving to profile information.
 */
const scrapeCodeChefProfile = async (username) => {
    try {
        const url = `${CODECHEF_URL}/users/${username}`;
        const htmlContent = await fetchHtmlContent(url);
        const $ = parseHtml(htmlContent);

        const rating = $('.rating-number').text().trim();
        const highestRating = $('.highest-rating-number').text().trim();
        const stars = $('.rating-star').length; 

        return {
            rating,
            highestRating,
            stars,
        };
    } catch (error) {
        console.error('Error scraping CodeChef profile:', error);
        throw error;
    }
};

module.exports = { scrapeCodeChefProfile };
