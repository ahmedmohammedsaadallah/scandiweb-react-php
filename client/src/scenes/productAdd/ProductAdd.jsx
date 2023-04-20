import "./ProductAdd.css";
import { Header } from "../index.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewProductData } from "../../state/index.js";
const PorductAdd = () => {
  const productGeneralProperties = [
    // this array is mapped to 3 divs that represent 3 inputs [sku,name,price]
    { name: "sku", label: "SKU" },
    { name: "name", label: "Name" },
    { name: "price", label: "price" },
  ];
  const FurnitureProperties = [
    // this array is mapped to 3 divs that represent 3 input [height,width,dimensions]
    { name: "height", label: "Height" },
    { name: "width", label: "Width" },
    { name: "length", label: "Length" },
  ];
  /* // this object has keys and values that match with the errors array that exists in the state/index.js 
  so if we want to display the array of the "sku" key we just say errorIndexing[Key]
  i needed to make the errors an array because i will map its elements to an alert div so i couldn't make it an object */
  const errorIndexing = {
    missing: 0,
    sku: 1,
    price: 2,
    size: 3,
    weight: 4,
    height: 5,
    width: 6,
    length: 7,
  };
  //records all the inputs that must contains number to run number validation on them and igoner other inputs
  const mustBeNumber = ["price", "size", "weight", "height", "width", "length"];
  // if the product type is changed then we need to clear the error related to the previous product type so we access the errorIndexing with the value we get from this array
  const productTypeSpecificProperties = { Book: "weight", DVD: "size" };
  const [product, setProduct] = useState({
    // this product object matchs with the newProduct object in state/index.js and it represents the initial values
    sku: "",
    name: "",
    price: "",
    /* typeSpecificInformation represents the size or weight or (height,width,length) and depends on the product type,
     if furniture then the value will be the dimensions separated by an 'x' character */
    typeSpecificInformation: "",
    productType: "DVD",
  });
  const [dimenstions, setDimensions] = useState({
    // represents the dimension of the product if it has a furniture product type
    height: "",
    width: "",
    length: "",
  });
  //this is for number validation
  const regexp1 = /^([1-9]|[1-9][0-9]+)$/;
  const regexp2 = /^([1-9][0-9]*\.([0-9]?[1-9]))$/;
  const regexp3 = /^((0)\.([0-9]?[1-9]))$/;

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors); // represents all the possible errors
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const elementId = e.target.id; // this is needed because in the case of weight and size their name is typeSpecificInformation so i use their id which is weight and size
    const previousProductType = product.productType; // if the e.target.name is product type then we need to clear the errors related to the previous product type
    let result = true;
    if (mustBeNumber.includes(elementId)) {
      result = regexp1.test(value);
      result ||= regexp2.test(value);
      result ||= regexp3.test(value);
    }
    setProduct({ ...product, [key]: value });
    if (key === "productType") {
      dispatch(
        setNewProductData({
          product: {
            ...product,
            productType: value,
            typeSpecificInformation: "",
          },
          errorIndex:
            previousProductType === "Furniture"
              ? 9 // the number 9 matches to a for made in the setNewProductData function that clears the dimensions error
              : errorIndexing[
                  productTypeSpecificProperties[previousProductType]
                ],
          exist: 0,
        })
      );
      setProduct({
        ...product,
        /*  productType: value this is required because without it, when this function is called and the same function is called
         before the if condition only the typeSpecificInformation is altered */
        productType: value,
        typeSpecificInformation: "",
      });
    } else {
      dispatch(
        setNewProductData({
          product: {
            ...product,
            [key]: value,
          },
          errorIndex: errorIndexing.hasOwnProperty(elementId) // it is required because some element doesn't have validation requirement so i gave them a dummy error that is never shown
            ? errorIndexing[elementId]
            : 8,
          exist: result === false && value !== "" ? 1 : 0,
        })
      );
    }
  };
  const handleFurnitureDimensionsChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const updatedDimensions = { ...dimenstions, [key]: value };
    setDimensions({ ...dimenstions, [key]: value });
    setProduct({
      ...product,
      typeSpecificInformation:
        updatedDimensions.height +
        "x" +
        updatedDimensions.width +
        "x" +
        updatedDimensions.length,
    });
    //number validation
    let result = regexp1.test(value);
    result ||= regexp2.test(value);
    result ||= regexp3.test(value);

    /* the if condition is required because when save button is clicked i have to check if there any missing data so i can't put a value
     in the typeSpecificInformation in this case with only 1 or 2 values because then i wouldn't be able to know if there is a missing value */
    if (
      updatedDimensions.height === "" ||
      updatedDimensions.width === "" ||
      updatedDimensions.length === ""
    ) {
      dispatch(
        setNewProductData({
          product: {
            ...product,
            typeSpecificInformation: "",
          },
          errorIndex: errorIndexing.hasOwnProperty(key)
            ? errorIndexing[key]
            : 8,
          exist: result === false && value !== "" ? 1 : 0,
        })
      );
    } else {
      dispatch(
        setNewProductData({
          product: {
            ...product,
            typeSpecificInformation:
              updatedDimensions.height +
              "x" +
              updatedDimensions.width +
              "x" +
              updatedDimensions.length,
          },
          errorIndex: errorIndexing.hasOwnProperty(key)
            ? errorIndexing[key]
            : 8,
          exist: result === false && value !== "" ? 1 : 0,
        })
      );
    }
  };
  return (
    <div className="app__productadd">
      <Header title="Product Add" action1="Save" action2="Cancel" />
      <div className="app__productadd-form">
        <form id="product_form">
          {productGeneralProperties.map((productGeneralProperty) => (
            <div key={productGeneralProperty.name} className="mb-3">
              <label
                htmlFor={productGeneralProperty.name}
                className="form-label"
              >
                {productGeneralProperty.label}
              </label>
              <input
                type="text"
                className="form-control"
                id={productGeneralProperty.name}
                name={productGeneralProperty.name}
                onChange={handleChange}
                value={product[productGeneralProperty.name]}
              />
            </div>
          ))}
          <div className="mb-3">
            <label htmlFor="productType" className="form-label">
              select type
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={product.productType}
              onChange={handleChange}
              id="productType"
              name="productType"
            >
              <option id="DVD" value="DVD">
                DVD
              </option>
              <option id="Furniture" value="Furniture">
                Furniture
              </option>
              <option id="Book" value="Book">
                Book
              </option>
            </select>
          </div>
          <label className="form-label">
            Please Provide
            {product.productType === "DVD" && " size in MB"}
            {product.productType === "Book" && " Weight in KG"}
            {product.productType === "Furniture" &&
              " Dimensions in HxWxL format"}
          </label>
          {product.productType === "DVD" && (
            <div className="mb-3">
              <label htmlFor="size" className="form-label">
                Size
              </label>
              <input
                type="text"
                className="form-control"
                id="size"
                name="typeSpecificInformation"
                onChange={handleChange}
                value={product.typeSpecificInformation}
              />
            </div>
          )}
          {product.productType === "Book" && (
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Weight
              </label>
              <input
                type="text"
                className="form-control"
                id="weight"
                name="typeSpecificInformation"
                onChange={handleChange}
                value={product.typeSpecificInformation}
              />
            </div>
          )}
          {product.productType === "Furniture" && (
            <div>
              {FurnitureProperties.map((FurnitureProperty) => (
                <div key={FurnitureProperty.name} className="mb-3">
                  <label
                    htmlFor={FurnitureProperty.name}
                    className="form-label"
                  >
                    {FurnitureProperty.label}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={FurnitureProperty.name}
                    name={FurnitureProperty.name}
                    onChange={handleFurnitureDimensionsChange}
                    value={dimenstions[FurnitureProperty.name]}
                  />
                </div>
              ))}
            </div>
          )}
        </form>
        <div className="alert alert-danger custom-alert" role="alert">
          {errors.map(
            (error) => error.exist === 1 && <p key={error.text}>{error.text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PorductAdd;
