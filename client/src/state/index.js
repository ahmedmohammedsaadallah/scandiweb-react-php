import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
enableMapSet();
const initialState = {
  deleteSelected: new Map(),
  newProduct: {
    sku: "",
    name: "",
    price: "",
    typeSpecificInformation: "",
    productType: "DVD",
  },
  errors: [
    { exist: 0, text: "please fill all the missing fields" },
    { exist: 0, text: "this sku is already taken" },
    {
      exist: 0,
      text: "please insert a valid number in the price field, numbers has to be greater or equal than 0.01 and has up to 2 decimal places",
    },
    {
      exist: 0,
      text: "please insert a valid number in the size field, numbers has to be greater or equal than 0.01 and has up to 2 decimal places",
    },
    {
      exist: 0,
      text: "please insert a valid number in the weight field, numbers has to be greater or equal than 0.01 and has up to 2 decimal places",
    },
    {
      exist: 0,
      text: "please insert a valid number in the height field, numbers has to be greater or equal than 0.01 and has up to 2 decimal places",
    },
    {
      exist: 0,
      text: "please insert a valid number in the width field, numbers has to be greater or equal than 0.01 and has up to 2 decimal places",
    },
    {
      exist: 0,
      text: "please insert a valid number in the length field, numbers has to be greater or equal than 0.01 and has up to 2 decimal places",
    },
    {
      exist: 0,
      text: "dummy error", //this is for elements with no validation requirements
    },
  ],
  massDeleteTrigger: false,
};

export const store = createSlice({
  name: "store",
  initialState,
  reducers: {
    setProductInDeleteSelectedMap: (state, action) => {
      const sku = action.payload.sku;
      if (state.deleteSelected.has(sku)) state.deleteSelected.delete(sku);
      else state.deleteSelected.set(sku, true);
    },
    clearDeleteSelectedMap: (state) => {
      state.deleteSelected.clear();
      state.massDeleteTrigger = state.massDeleteTrigger === true ? false : true;
    },
    setNewProductData: (state, action) => {
      state.newProduct = action.payload.product;
      if (action.payload.errorIndex === 9) {
        // this is for clearing Furniture validation errors
        state.errors[5].exist = 0;
        state.errors[6].exist = 0;
        state.errors[7].exist = 0;
      } else if (action.payload.errorIndex === 10) {
        // clearing all the errors
        for (let index = 0; index < state.errors.length; index++) {
          state.errors[index].exist = 0;
        }
      } else
        state.errors[action.payload.errorIndex].exist = action.payload.exist;
    },
  },
});

export const {
  setProductInDeleteSelectedMap,
  clearDeleteSelectedMap,
  setNewProductData,
} = store.actions;
export default store.reducer;
