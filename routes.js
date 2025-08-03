const express = require('express');
const path = require('path');
const { extractGenericArticle } = require('./functions');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/extract', async (req, res) => {
  let url = req.query.url;
  if (!url) {
    return res.status(400).send('Parametro URL mancante');
  }

  const html = await extractGenericArticle(url);
  res.set('Content-Type', 'text/html');
  res.send(html);
});

module.exports = router;
