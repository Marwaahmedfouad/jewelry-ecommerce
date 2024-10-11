import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import OrderConfirmation from "./pages/OrderConfirmation";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
// import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import HeadlessDemo from "./components/HeadlessDemo";
  
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>} />
            <Route path="/cart" element={<Cart />}/>
            <Route path="/checkout" element={<Checkout />}/>
            <Route path="/orderConfirmation" element={<OrderConfirmation />}/>
            <Route path="/product" element={<Product />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/productDetail" element={<ProductDetail />}/>
            <Route path="/HeadlessDemo" element={<HeadlessDemo />}/>
            <Route path="/Signup" element={<Signup />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
