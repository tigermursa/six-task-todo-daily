Step 1 : install redux tool kit in the project " npm install @reduxjs/toolkit react-redux "
Step 2 : make a folder for redux with any name I am using redux for the folder name ,
Step 3 : Create a store , create a file in the redux name store.js/jsx
Step 4: import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export default store;

Step 5 : add redux Provider in the main.jsx file 
Step 6 : 