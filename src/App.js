import { useState } from "react";
import "./App.css";
import ProductItemsPage from "./productlist";
import Test from "./test";

export default function App() {
  const [search, setSearch] = useState("");

  // const filteredArticles = articles.filter(
  //   (article) =>
  //     article.title.toLowerCase().includes(search.toLowerCase()) ||
  //     article.content.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div className="container">
      <h1>Product List</h1>
        <ProductItemsPage/>
    </div>
  );
}


