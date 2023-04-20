import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductList, ProductAdd } from "./scenes/index.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />}></Route>
          <Route path="/addproduct" element={<ProductAdd />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
