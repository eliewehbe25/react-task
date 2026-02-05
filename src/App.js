import { useState } from "react";
import "./App.css";
import ProductItemsPage from "./productlist";

export default function App() {
  const [search, setSearch] = useState("");


  return (
    <div className="container">
      <h1>Product List</h1>
        <ProductItemsPage/>
    </div>
  );
}


