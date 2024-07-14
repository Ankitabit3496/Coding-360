const { fetchHtmlContent, parseHtml } = require('./common/utils');
const { CODEFORCES_URL } = require('./common/constants');

/**
 * Function to scrape Codeforces profile information.
 * @param {string} handle The Codeforces handle of the user.
 * @returns {Promise<Object>} Promise resolving to profile information.
 */
const scrapeCodeforcesProfile = async (handle) => {
    try {
        const url = `${CODEFORCES_URL}/profile/${handle}`;
        const htmlContent = await fetchHtmlContent(url);
        const $ = parseHtml(htmlContent);

        const rating = $('.user-rank').text().trim();
        const maxRating = $('.user-rank').next().text().trim();
        const rank = $('.user-rank').parent().next().find('span').text().trim();
        const contribution = $('.info .value').eq(1).text().trim();

        return {
            rating,
            maxRating,
            rank,
            contribution,
        };
    } catch (error) {
        console.error('Error scraping Codeforces profile:', error);
        throw error;
    }
};

module.exports = { scrapeCodeforcesProfile };
