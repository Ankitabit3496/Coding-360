const { fetchHtmlContent, parseHtml } = require('./common/utils');
const { GITHUB_URL } = require('./common/constants');

/**
 * @swagger
 * /scrape/github/{username}:
 *   get:
 *     summary: Scrape GitHub profile
 *     description: Retrieves user profile data from GitHub.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: GitHub username to scrape
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                   description: Full name of the GitHub user
 *                 bio:
 *                   type: string
 *                   description: Bio of the GitHub user
 *                 location:
 *                   type: string
 *                   description: Location of the GitHub user
 *                 email:
 *                   type: string
 *                   description: Email of the GitHub user
 *                 website:
 *                   type: string
 *                   description: Website of the GitHub user
 *                 profileImageUrl:
 *                   type: string
 *                   description: Profile image URL of the GitHub user
 *       500:
 *         description: Error scraping GitHub profile
 */
const scrapeGitHubProfile = async (username) => {
    try {
        const url = `${GITHUB_URL}/${username}`;
        const html = await fetchHtmlContent(url);
        const $ = parseHtml(html);

        const fullName = $('.vcard-fullname').text().trim();
        const bio = $('.user-profile-bio').text().trim();
        const location = $('[itemprop="homeLocation"]').text().trim();
        const email = $('[itemprop="email"]').text().trim();
        const website = $('.url').attr('href');
        const profileImageUrl = $('.avatar-user').attr('src');

        return {
            fullName,
            bio,
            location,
            email,
            website,
            profileImageUrl,
        };
    } catch (error) {
        console.error('Error scraping GitHub profile:', error);
        throw error;
    }
};

module.exports = { scrapeGitHubProfile };
