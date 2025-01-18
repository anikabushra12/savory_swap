import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/Loginpage";
import CreateAccount from "./pages/CreateAccount";
import AdminPage from "./pages/AdminPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProtectedPage from "./pages/ProtectedPage";
import Userprofilepage from "./pages/Userprofilepage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import Minimart from "./pages/MinimartPage";
import Cart from "./pages/Cart";
import CreateRecipe from "./pages/CreateRecipe";
import CategoryPage from "./pages/CategoryPage";
import Search from "./pages/Search";
import Checkout from "./pages/CheckoutPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

import FryingpanSpinner from "./components/FryingpanSpinner";
import CalendarPage from "./pages/CalendarPage"; // Import CalendarPage
import { useState } from "react";
import ViewOthersProfile from "./pages/ViewOthersProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState([]);

  function addCart(newItems) {
    setCart((prevcart) => {
      const item = prevcart.find((previtem) => previtem.name === newItems.name);
      return item ? prevcart : [...prevcart, newItems];
    });
  }

  function deleteItem(index) {
    setCart((prevcart) => prevcart.filter((_, idx) => index !== idx));
  }

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <BrowserRouter>
        <Header items={cart.length} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/loader" element={<FryingpanSpinner />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forget-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/calendar" element={<CalendarPage />} />



          {/* Minimart Routes */}
          <Route
            path="/minimart"
            element={
              <Minimart
                cart={cart}
                setCart={setCart}
                addCart={addCart}
                deleteItem={deleteItem}
              />
            }
          />
          <Route
            path="/minimart/cart"
            element={<Cart cart={cart} setCart={setCart} deleteItem={deleteItem} />}
          />
          <Route
            path="/minimart/checkout"
            element={<Checkout cart={cart} />}
          />

          {/* Protected Routes */}
          <Route path="/userprofile" element={<ProtectedPage />}>
            <Route index element={<Userprofilepage />} />
            <Route path="createrecipe" element={<CreateRecipe />} />
            <Route path="editprofile" element={<EditProfilePage />} />
          </Route>

          {/* Admin and View Profile */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/viewprofilepage/:id" element={<ViewOthersProfile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
