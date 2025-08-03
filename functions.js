const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

async function extractGenericArticle(url) {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const dom = new JSDOM(response.data, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article) {
      throw new Error("Impossibile estrarre l'articolo.");
    }

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${article.title}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 24px; color: #333; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>${article.title}</h1>
  ${article.content}
  <p><small>Articolo estratto da: <a href="${url}">${url}</a></small></p>
</body>
</html>`;
    
    return htmlTemplate;
  } catch (err) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Errore</title>
</head>
<body>
  <h1>Errore durante l'estrazione</h1>
  <p>${err.message}</p>
</body>
</html>`;
  }
}

module.exports = { extractGenericArticle };
