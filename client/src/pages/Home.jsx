import React from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Product from "../pages/Product";
import Register from "./Register";
import Login from "../pages/Login";
import Cart from "./Cart";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      {/* <Product /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Cart /> */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
