import { useDispatch } from "react-redux";
import "./Product.css";
import { setProductInDeleteSelectedMap } from "../../state";
import { useState } from "react";
const Product = ({ sku, name, price, typeSpecificInformation }) => {
  const [isChecked, setIsChecked] = useState(false); // this to update the status of the check box
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setIsChecked((prevstate) => !prevstate);
    dispatch(setProductInDeleteSelectedMap({ sku })); // set this product to be deleted or not to be deleted depending on it's status (deleted=> not to be deleted,  not to be deleted=> deleted)
  };
  return (
    <div className="app__product">
      <div className="app__product-checkbox">
        <input
          type="checkbox"
          className="delete-checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
      </div>
      <div className="app__product-text">
        <h5>{sku}</h5>
        <h5>{name}</h5>
        <h5>{price} $</h5>
        <h5>{typeSpecificInformation}</h5>
      </div>
    </div>
  );
};

export default Product;
