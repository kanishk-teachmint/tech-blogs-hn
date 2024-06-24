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
  "https://www.uber.com/en-IN/blog/engineering/rss/", 
  "https://blog.cloudflare.com/tag/engineering/rss",     
  "https://aws.amazon.com/blogs/architecture/feed/"
];

const articles = [];

async function fetchArticles() {
  try {
    // Shuffle the feed URLs to randomize selection
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
