const express = require('express');
const axios = require('axios');
const { DOMParser } = require('xmldom');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

const feedURLs = [
  "https://netflixtechblog.com/feed",
  "https://slack.engineering/feed",
  "https://blog.cloudflare.com/tag/engineering/rss",     
  "https://aws.amazon.com/blogs/architecture/feed/",
  "https://aws.amazon.com/blogs/architecture/feed/",
  "https://aws.amazon.com/blogs/apn/feed/",
  "https://aws.amazon.com/blogs/awsmarketplace/feed/",
  "https://aws.amazon.com/blogs/aws/feed/",
  "https://aws.amazon.com/blogs/big-data/feed/",
  "https://aws.amazon.com/blogs/business-productivity/feed/",
  "https://aws.amazon.com/blogs/compute/feed/",
  "https://aws.amazon.com/blogs/contact-center/feed/",
  "https://aws.amazon.com/blogs/containers/feed/",
  "https://aws.amazon.com/blogs/database/feed/",
  "https://aws.amazon.com/blogs/desktop-and-application-streaming/feed/",
  "https://aws.amazon.com/blogs/developer/feed/",
  "https://aws.amazon.com/blogs/devops/feed/",
  "https://aws.amazon.com/blogs/enterprise-strategy/feed/",
  "https://aws.amazon.com/blogs/mobile/feed/",
  "https://aws.amazon.com/blogs/gametech/feed/",
  "https://aws.amazon.com/blogs/hpc/feed/",
  "https://aws.amazon.com/blogs/infrastructure-and-automation/feed/",
  "https://aws.amazon.com/blogs/industries/feed/",
  "https://aws.amazon.com/blogs/iot/feed/",
  "https://aws.amazon.com/blogs/machine-learning/feed/",
  "https://aws.amazon.com/blogs/mt/feed/",
  "https://aws.amazon.com/blogs/media/feed/",
  "https://aws.amazon.com/blogs/messaging-and-targeting/feed/",
  "https://aws.amazon.com/blogs/networking-and-content-delivery/feed/",
  "https://aws.amazon.com/blogs/opensource/feed/",
  "https://aws.amazon.com/blogs/publicsector/feed/",
  "https://aws.amazon.com/blogs/quantum-computing/feed/",
  "https://aws.amazon.com/blogs/robotics/feed/",
  "https://aws.amazon.com/blogs/awsforsap/feed/",
  "https://aws.amazon.com/blogs/security/feed/",
  "https://aws.amazon.com/blogs/startups/feed/",
  "https://aws.amazon.com/blogs/storage/feed/",
  "https://aws.amazon.com/blogs/training-and-certification/feed/",
  "https://aws.amazon.com/blogs/modernizing-with-aws/feed/",
];

let articles = [];

async function fetchArticles() {
  try {
    // Shuffle the feed URLs to randomize selection
    articles=[];
    shuffleArray(feedURLs);

    // Fetch articles from up to 20 different feeds
    for (let i = 0; i < Math.min(20, feedURLs.length); i++) {
      const feedURL = feedURLs[i];

      // Fetch the RSS feed data
      console.log(`Fetching feed: ${feedURL}`);
      try {
        const response = await axios.get(feedURL, {
          headers: {
            'Accept': 'application/rss+xml'
          }
        });

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");

        // Extract items from the RSS feed
        const items = Array.from(xmlDoc.getElementsByTagName('item'));

        if (items.length > 0) {
          // Randomly select one item from the feed
          const randomItem = items[Math.floor(Math.random() * items.length)];

          // Create article object from selected item
          const article = {
            title: randomItem.getElementsByTagName('title')[0]?.textContent,
            link: randomItem.getElementsByTagName('link')[0]?.textContent,
            description: randomItem.getElementsByTagName('description')[0]?.textContent,
          };

          articles.push(article);
        } else {
          console.warn(`No items found in feed: ${feedURL}`);
          shuffleArray(feedURLs);
          i--;
        }
      } catch (error) {
        console.error(`Error fetching from ${feedURL}:`, error.message);
      }
    }

    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    throw error;
  }
}

// Shuffle function to randomize array order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

app.get('/api/articles', async (req, res) => {
  try {
    const articles = await fetchArticles();
    res.json(articles);
  } catch (error) {
    console.error('Error in /api/articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
