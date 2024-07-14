const puppeteer = require('puppeteer');
const { LEETCODE_URL } = require('./common/constants');

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
const scrapeLeetCodeProfile = async (username) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        const url = `${LEETCODE_URL}/${username}`;

        let data = await fetch("https://leetcode.com/graphql/", {
            "headers": {
              "accept": "*/*",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              "authorization": "",
              "baggage": "sentry-environment=production,sentry-release=3f56002d,sentry-transaction=%2Fu%2F%5Busername%5D,sentry-public_key=2a051f9838e2450fbdd5a77eb62cc83c,sentry-trace_id=7708d2f3f26b45fdbdb7182fd02a1957,sentry-sample_rate=0.03",
              "content-type": "application/json",
              "priority": "u=1, i",
              "random-uuid": "b67a8901-5ae4-9f42-490f-b569fcdbcbe6",
              "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "sentry-trace": "7708d2f3f26b45fdbdb7182fd02a1957-aa2ec9d8d3c05473-0",
              "uuuserid": "da9a6a402e11b6b1441743bbb47078d1",
              "x-csrftoken": "8KmbDN5m523TOonrD92NDjtU5Xc6kEaHK4BkDmU3JhhqPjQVrLK6bRcAqHgGIJhO",
              "cookie": "gr_user_id=e8855057-54a9-4658-a412-8092b4affd48; cf_clearance=Ntsewo04SLI_43Kb4zV.EXrgvg1.4IzwRIkRd2Fx1o8-1719505557-1.0.1.1-ASgpLyrWKFBIE2sJtzs5ifZlbMnfSuBQ2x_c_rQ.vXbRDF8e.UFHZsZKNeTi3Gmr.tRwx4b8UzhMTR30i1qAJg; csrftoken=8KmbDN5m523TOonrD92NDjtU5Xc6kEaHK4BkDmU3JhhqPjQVrLK6bRcAqHgGIJhO; 87b5a3c3f1a55520_gr_last_sent_cs1=Empire_; __stripe_mid=cd676cb1-d9c6-4d63-ba54-1b334d3634654b9d27; _gid=GA1.2.371483541.1720792979; INGRESSCOOKIE=52de89d12ef920355ec5f00432061e3e|8e0876c7c1464cc0ac96bc2edceabd27; ip_check=(false, \"122.172.80.76\"); LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMzE4MjUzMyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjIwODk4NDRlMDI5ODUxZmRkMDIyNWU2OTNiNDFiMDcxYzk3MDdkYTY3YWQ4MGNmZjQzMDEyMGRiYTkwMDZmMzUiLCJpZCI6MzE4MjUzMywiZW1haWwiOiJhbmtpdGFjaGF1ZGhhcnkzNDk2QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiRW1waXJlXyIsInVzZXJfc2x1ZyI6IkVtcGlyZV8iLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvRW1waXJlXy9hdmF0YXJfMTcxNjcwMjI1NC5wbmciLCJyZWZyZXNoZWRfYXQiOjE3MjA5NDQzODcsImlwIjoiMTIyLjE3Mi44MC43NiIsImlkZW50aXR5IjoiZjFmNmIyOWE2Y2MxZjc5YTBmZWEwNWI4ODVhYTMzZDAiLCJzZXNzaW9uX2lkIjo2NDUwMDgxMSwiZGV2aWNlX3dpdGhfaXAiOlsiZGE5YTZhNDAyZTExYjZiMTQ0MTc0M2JiYjQ3MDc4ZDEiLCIxMjIuMTcyLjgwLjc2Il19.QM6BDVQ0Nfk5I_sRwdb_DQhmlJ-HG-ZNQ6gtRXbT6ZY; 87b5a3c3f1a55520_gr_session_id=045a2102-7336-4c4c-baa2-ec58fc0ee120; 87b5a3c3f1a55520_gr_last_sent_sid_with_cs1=045a2102-7336-4c4c-baa2-ec58fc0ee120; 87b5a3c3f1a55520_gr_session_id_sent_vst=045a2102-7336-4c4c-baa2-ec58fc0ee120; __cf_bm=Z._O66QXr2f.D85nRaEmy54SvwT.TeAQz65j0WuRBsU-1720981249-1.0.1.1-mH4SI6ChMZR5m0nY8eY1dClu8Ktor2cKwWnP4iwuJk3EcAhHVmlOwlMsd7MWUc5q3V.8vcqFF09UUDAWNTdsnA; 87b5a3c3f1a55520_gr_cs1=Empire_; _ga_CDRWKZTDEX=GS1.1.1720979600.57.1.1720981550.51.0.0; _ga=GA1.1.193632808.1719055471",
              "Referer": "https://leetcode.com/u/Empire_/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `{\"query\":\"\\n    query userPublicProfile($username: String!) {\\n  matchedUser(username: $username) {\\n    contestBadge {\\n      name\\n      expired\\n      hoverText\\n      icon\\n    }\\n    username\\n    githubUrl\\n    twitterUrl\\n    linkedinUrl\\n    profile {\\n      ranking\\n      userAvatar\\n      realName\\n      aboutMe\\n      school\\n      websites\\n      countryName\\n      company\\n      jobTitle\\n      skillTags\\n      postViewCount\\n      postViewCountDiff\\n      reputation\\n      reputationDiff\\n      solutionCount\\n      solutionCountDiff\\n      categoryDiscussCount\\n      categoryDiscussCountDiff\\n    }\\n  }\\n}\\n    \",\"variables\":{\"username\":\"${username}\"},\"operationName\":\"userPublicProfile\"}`,
            "method": "POST"
          });
        data = await data.json();
        console.log(data);

        return data;
       
    } catch (error) {
        console.error('Error scraping LeetCode profile:', error);
        await browser.close();
        throw error;
    }
};

module.exports = { scrapeLeetCodeProfile };
