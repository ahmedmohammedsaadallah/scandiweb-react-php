import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { clearDeleteSelectedMap, setNewProductData } from "../../state";
const Header = ({ title, action1, action2 }) => {
  const dummyProduct = {
    sku: "",
    name: "",
    price: "",
    typeSpecificInformation: "",
    productType: "DVD",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteSelectedMap = useSelector((state) => state.deleteSelected); // represent all the element that will be deleted
  const newProduct = useSelector((state) => state.newProduct); // the new product that will be added
  const errors = useSelector((state) => state.errors); // all the possible errors
  const insertProduct = async (product) => {
    const response = await fetch(
      "https://scandiweb-test-react-php.000webhostapp.com/server/api/insertProduct.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product }),
      }
    );
    const result = await response.json();
    if (result === "existing sku") {
      // not unique sku
      dispatch(setNewProductData({ product, errorIndex: 1, exist: 1 })); // showing sku error
    } else {
      dispatch(setNewProductData({ dummyProduct, errorIndex: 8, exist: 0 }));
      navigate("/");
    }
  };
  const deleteProducts = async (deleteSelected) => {
    const response = await fetch(
      "https://scandiweb-test-react-php.000webhostapp.com/server/api/deleteProducts.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...deleteSelected]),
      }
    );
    const result = await response.json();
    console.log(result);
    dispatch(clearDeleteSelectedMap());
  };
  const handleChange = (e) => {
    // handle buttons clicks
    let missingData = false;
    let validationErrorsExist = false;
    const text = e.target.innerHTML;
    if (text === "Cancel") {
      const product = {
        sku: "",
        name: "",
        price: "",
        typeSpecificInformation: "",
        productType: "DVD",
      };
      dispatch(setNewProductData({ product, errorIndex: 10, exist: 0 })); // errorIndex:10 means clearing all the errors
      navigate("/");
    } else if (text === "Save") {
      for (const key in newProduct) {
        // checking for the missing data
        if (newProduct[key] === "") {
          missingData = true;
          dispatch(setNewProductData({ newProduct, errorIndex: 0, exist: 1 }));
          break;
        }
      }
      if (missingData === false) {
        dispatch(setNewProductData({ newProduct, errorIndex: 0, exist: 0 }));

        for (let index = 0; index < errors.length; index++) {
          // checking for the validation errors before inserting product
          if (errors[index].exist === 1) {
            validationErrorsExist = true;
            break;
          }
        }
        if (validationErrorsExist === false) {
          insertProduct(newProduct);
        }
      }
    } else if (text === "ADD") {
      dispatch(clearDeleteSelectedMap()); // going to add product page results in clearing the delete selected map
      navigate("/addproduct");
    } else if (text === "MASS DELETE") {
      deleteProducts(deleteSelectedMap);
    }
  };
  return (
    <div className="app__header">
      <div className="app__header-title">
        <h1>{title}</h1>
      </div>
      <div className="app__header-buttons">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleChange}
        >
          {action1}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          id={action2 === "MASS DELETE" ? "delete-product-btn" : ""}
          onClick={handleChange}
        >
          {action2}
        </button>
      </div>
    </div>
  );
};

export default Header;
