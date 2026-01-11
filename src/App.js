import { useState } from "react";
import "./App.css";

const articles = [
  {
    id: 1,
    title: "Understanding the difference between grid-template and grid-auto",
    content:
      "CSS Grid is a powerful layout system. grid-template defines explicit tracks while grid-auto handles implicit tracks."
  },
  {
    id: 2,
    title: "Getting started with Flexbox",
    content:
      "Flexbox is a one-dimensional layout method for arranging items in rows or columns."
  },
  {
    id: 3,
    title: "A complete guide to CSS Grid",
    content:
      "CSS Grid Layout excels at dividing a page into major regions or defining relationships in terms of size."
  }
];

function highlightText(text, query) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
}

export default function App() {
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Search</h1>

      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p><span className="postFound"> {filteredArticles.length} posts</span> were found.</p>

      <div className="results">
        {filteredArticles.map((article) => (
          <div key={article.id} className="article">
            <h3 className="title">{highlightText(article.title, search)}</h3>
            <p className="content">{highlightText(article.content, search)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


