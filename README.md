# Markdown Editor

A simple and powerful markdown editor built for clarity, speed, and productivity.  
Write notes, documents, and code — all in markdown.

---

### Features

- Live markdown preview using [marked](https://github.com/markedjs/marked)  
- Sanitized HTML output with [DOMPurify](https://github.com/cure53/DOMPurify) for security  
- Beautiful GitHub-style markdown styling using [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)  
- Fast and responsive UI  

---

### Tech Stack

- **React** – Framework used to build the interactive markdown editor interface
- **TypeScript** - Adds type safety to the project
- **marked** – Markdown parser and compiler 
- **DOMPurify** – Sanitizing HTML output  
- **github-markdown-css** – GitHub-style markdown styling  

---

### 1. Clone the repo

```bash
git clone https://github.com/your-username/markdown-editor.git
cd markdown-editor
```

### 2. Install dependencies

```bash
npm install marked dompurify github-markdown-css
```

### 3. Start the app

If you have a development server setup (like Vite, webpack, or similar), run:

```bash
npm run dev
```

### 4. Usage

Import and use the packages in your JavaScript code like this:

```js
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import 'github-markdown-css/github-markdown.css';

// Example markdown text
const markdownText = '# Hello Markdown Editor!';

// Convert markdown to HTML
const rawHtml = marked(markdownText);

// Sanitize the HTML to prevent XSS attacks
const cleanMD = DOMPurify.sanitize(rawHtml);

// Insert sanitized HTML into preview container
document.getElementById('preview').innerText = cleanMD;
```



