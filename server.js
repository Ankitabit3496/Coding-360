const express = require('express');
const swaggerSetup = require('./swagger/swagger-config.js');
const { scrapeGitHubProfile } = require('./scrappers/githubscrapper.js');
const { scrapeLeetCodeProfile } = require('./scrappers/leetcodescrapper.js');

const app = express();

app.use(express.json());

swaggerSetup(app);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home route
 *     description: Welcome message for the Web Scraper API.
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get('/', (req, res) => {
    res.send('Welcome to the Web Scraper API');
});

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
app.get('/scrape/github/:username', async (req, res) => {
    try {
        const profile = await scrapeGitHubProfile(req.params.username);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Error scraping GitHub profile' });
    }
});

/**
 * @swagger
 * /scrape/leetcode/{username}:
 *   get:
 *     summary: Scrape LeetCode profile
 *     description: Retrieves user profile stats from LeetCode.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: LeetCode username to scrape
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 solvedCount:
 *                   type: string
 *                   description: Number of problems solved
 *                 acceptanceRate:
 *                   type: string
 *                   description: Acceptance rate
 *                 contributionPoints:
 *                   type: string
 *                   description: Contribution points
 *       500:
 *         description: Error scraping LeetCode profile
 */
app.get('/scrape/leetcode/:username', async (req, res) => {
    try {
        const stats = await scrapeLeetCodeProfile(req.params.username);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Error scraping LeetCode profile' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
