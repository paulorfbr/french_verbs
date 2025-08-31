const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT;

// enabling CORS for some specific origins only.
let corsOptions = {
   origin : ['https://french-verbs-front.onrender.com'],
}
app.use(cors(corsOptions));

// Load verbs data
const verbsFile = path.join(__dirname, 'verbs.json');
let verbs = [];
try {
  const data = fs.readFileSync(verbsFile, 'utf8');
  verbs = JSON.parse(data);
} catch (err) {
  console.error('Error loading verbs data:', err);
}

// Search by verb name (partial, case-insensitive)
app.get('/api/verbs', (req, res) => {
  const { search, preposition } = req.query;
  let results = verbs;

  if (search) {
    const s = search.toLowerCase();
    results = results.filter(v => v.verb.toLowerCase().includes(s));
  }

  if (preposition) {
    if (preposition === 'none') {
      results = results.filter(v => !v.preposition || v.preposition === '');
    } else {
      results = results.filter(v => v.preposition === preposition);
    }
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 