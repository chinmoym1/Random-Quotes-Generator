const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const https = require('https');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

// Serve static files from the current directory (Quote folder)
app.use(express.static(__dirname));

// Explicitly serve index.html on root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const quotesFallback = [
    { content: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { content: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
    { content: "So many books, so little time.", author: "Frank Zappa" },
    { content: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
    { content: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" }
];

app.get('/api', async (req, res) => {
    try {
        const url = 'https://zenquotes.io/api/random';
        const response = await fetch(url, { agent: httpsAgent });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Error fetching quote: Status ${response.status}, Body: ${errorBody}`);
            return res.status(response.status).send('Error fetching quote');
        }
        const data = await response.json();
        // ZenQuotes API returns an array with one object
        if (Array.isArray(data) && data.length > 0) {
            const quoteObj = data[0];
            res.json({ content: quoteObj.q || 'No quote text', author: quoteObj.a || 'Unknown' });
        } else {
            res.json({ content: 'No quote text', author: 'Unknown' });
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        // Fallback to local quotes
        const randomIndex = Math.floor(Math.random() * quotesFallback.length);
        res.json(quotesFallback[randomIndex]);
    }
});

app.listen(PORT, () => {
    console.log(`CORS Proxy running on http://localhost:${PORT}`);
});

// Quotable.io (already used, but has limits)
// ZenQuotes.io (rate limited without key)
// Type.fit Quotes API (free, no auth, unlimited calls, returns a large list of quotes)
