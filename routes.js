const express = require('express');
const { extractGenericArticle } = require('./functions');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Estrai Articolo</title>
  <style>
    body { font-family: sans-serif; padding: 40px; max-width: 600px; margin: auto; }
    h1 { font-size: 24px; }
    input[type="text"] {
      width: 100%;
      padding: 10px;
      margin: 12px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 10px 20px;
      background-color: #007acc;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #005fa3;
    }
  </style>
</head>
<body>
  <h1>Inserisci il link all'articolo</h1>
  <form method="get" action="/extract">
    <input type="text" name="url" placeholder="https://esempio.com/articolo" required />
    <button type="submit">Estrai</button>
  </form>
</body>
</html>
  `);
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
