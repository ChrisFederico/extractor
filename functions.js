const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const fs = require('fs');
const path = require('path');

function loadTemplate(fileName) {
  const filePath = path.join(__dirname + '/templates/', fileName);
  return fs.readFileSync(filePath, 'utf8');
}

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

    let htmlTemplate = loadTemplate('article.html');
    htmlTemplate = htmlTemplate
      .replace(/{{title}}/g, article.title)
      .replace(/{{content}}/g, article.content)
      .replace(/{{url}}/g, url);

    return htmlTemplate;
  } catch (err) {
    let errorTemplate = loadTemplate('error.html');
    errorTemplate = errorTemplate.replace(/{{errorMessage}}/g, err.message);
    return errorTemplate;
  }
}

module.exports = { extractGenericArticle };
