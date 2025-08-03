# Article Extractor 📰

This API automatically extracts the main content of an article from any website using the Mozilla Readability library. It's ideal for anyone who wants to obtain only the relevant text from news pages, blogs, or editorial portals, removing ads and unnecessary content.

## 🚀 Installation and Startup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <REPOSITORY_URL>
   cd extractor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Usage:**
   Open your browser and visit:
   ```
   http://localhost:3000/extract?url=ARTICLE_URL
   ```
   Replace `ARTICLE_URL` with the link to the article you want to extract.

   **Example:**
   ```
   http://localhost:3000/extract?url=https://www.corriere.it/politica/25_luglio_09/vannacci-rackete-non-ci-mancherai-762b78ea-e9c5-43f6-a466-2cbfa2aafxlk.shtml
   ```

## 📦 Main Dependencies

- **Express** (API server)
- **Axios** (HTTP requests)
- **JSDOM** (virtual DOM)
- **@mozilla/readability** (automatic content extraction)

---

## 📝 Notes

The extractor works well with most news websites, blogs, and editorial platforms. However, certain sites with complex layouts, multi-page articles, or dynamically loaded content (e.g. paywalls triggered after scrolling) may not be fully supported.

---

## ✅ Quick Start

```bash
npm start
```

**API URL (example):**
```
http://localhost:3000/extract?url=https://www.corriere.it/...
```
