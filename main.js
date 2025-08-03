const express = require('express');
const { extractGenericArticle } = require('./functions');

const app = express();
const port = 3000;

app.get('/extract', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Parametro URL mancante');
  }

  const html = await extractGenericArticle(url);
  res.set('Content-Type', 'text/html');
  res.send(html);
});

app.listen(port, () => {
  console.log(`API in ascolto su http://localhost:${port}`);
});
