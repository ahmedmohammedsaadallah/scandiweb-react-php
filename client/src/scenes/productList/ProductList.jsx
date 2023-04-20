import { useEffect, useState } from "react";
import { Product } from "../../components";
import { Header } from "../index";
import { useSelector } from "react-redux";
import "./ProductList.css";
const PorductList = () => {
  const massDeleteTrigger = useSelector((state) => state.massDeleteTrigger); // trigger to re-fetching the products
  const [products, setProducts] = useState([]); // triggers rerendering the page
  const fetchProducts = async () => {
    // fetching the products from mysql
    const response = await fetch(
      "https://scandiweb-test-react-php.000webhostapp.com/server/api/readAll.php",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const products = await response.json();
    setProducts(products);
  };
  useEffect(() => {
    /*when the add button is clicked and some product checkboxes were checked,
     the checked mark doesn't disappear so i trigger the useeffect and set the product to an empty array
      to display the newly fetched product with a not checked check box */
    setProducts([]);
    fetchProducts();
  }, [massDeleteTrigger]);
  return (
    <div className="app__productlist">
      <Header title="Product List" action1="ADD" action2="MASS DELETE" />
      <div className="app__productlist-products">
        {products.length > 0
          ? products.map((product) => (
              <Product
                key={product.sku}
                sku={product.sku}
                name={product.name}
                price={product.price}
                typeSpecificInformation={product.type_specific_information}
              />
            ))
          : "There are no products"}
      </div>
    </div>
  );
};

export default PorductList;
