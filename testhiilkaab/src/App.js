import "./App.css";
import Home from "./client/screens/home";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Shop from "./client/screens/shop";
import Cart from "./client/screens/cart";
import Wishlist from "./client/screens/wishlist";
import Account from "./client/screens/account";
import Checkout from "./client/screens/checkout";
import ProfileInfo from "./client/screens/profile-info";
import ManageAddress from "./client/screens/managed";
import ChangePassword from "./client/screens/change-password";
import Product from "./client/screens/product";
import Register from "./client/screens/Register";
import Login from "./client/screens/login";
import { useStateContext } from "./admin/contexts/ContextProvider";
import App2 from "../src/admin/App";
import Logout from "./admin/pages/Logout";
import CategoryScreen from "./admin/screens/CategoryScreen";
import SubCategoryScreen from "./admin/screens/SubCategoryScreen";
import ProductsScreen from "./admin/screens/ProductsScreen";
import { useEffect } from "react";
import { ThemeSettings } from "./admin/components";
import SettingsScreens from "./admin/screens/SettingsScreens";
import UserScreen from "./admin/screens/UserScreen";
import OrdersScreen from "./admin/screens/OrdersScreen";
import OrdersScreen2 from "./client/screens/OrdersScreen";
import SliderScreen from "./admin/screens/SliderScreen";
import AddProductScreen from "./admin/screens/AddProductScreen";
import AddCategoryScreen from "./admin/screens/AddCategoryScreen";
import AddSubCategoryScreen from "./admin/screens/AddSubCategoryScreen";
import AddUserScreen from "./admin/screens/AddUserScreen";
import UpdateCategoryScreen from "./admin/screens/UpdateCategoryScreen";
import UpdateSubCategoryScreen from "./admin/screens/UpdateSubCategoryScreen";
import UpdateProductsScreen from "./admin/screens/UpdateProductsScreen";
import SliderUpdateScreen from "./admin/screens/SliderUpdateScreen";
import UpdateSettingsScreen from "./admin/screens/UpdateSettingsScreen";
import About from "./client/screens/About";
import TopCategoryScreen from "./admin/screens/TopCategory/TopCategoryScreen";
import AddTopCategoryScreen from "./admin/screens/TopCategory/AddTopCategoryScreen";
import UpdateTopCategoryScreen from "./admin/screens/TopCategory/UpdateTopCategoryScreen";
import PlaceOrderScreen from "./client/screens/placeOrderScreen";
import DiscountScreen from "./admin/screens/discount/DiscountScreen";
import AddDiscountScreen from "./admin/screens/discount/AddDiscountScreen";
import OderComplateScreen from "./client/screens/OderComplateScreen";
import MyOrdersScreen from "./client/screens/MyOrdersScreen";
import ScrollToTop from "./client/components/ScrollToTop";


function App() {
  const { setCurrentColor, setCurrentMode, currentMode, themeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
    <BrowserRouter>
    <div className="dark:bg-main-dark-bg">
      
    {themeSettings && (<ThemeSettings />)}
    
     
     <Routes>  
        <Route path="/" element={<Home/> } />
        <Route path="/shop/:id?" element={<Shop/> } />
        <Route path="/search/:keyword" element={<Shop/> } />
        <Route path="/cart/:id?" element={<Cart/> } />
        <Route path="/wishlist" element={<Wishlist/> } />
        <Route path="/account" element={<Account/> } />
        <Route path="/checkout" element={<Checkout/> } />
        <Route path="/placeorder" element={<PlaceOrderScreen/> } />
        <Route path="/order/:id" element={<OrdersScreen2/> } />
        <Route path="/profile" element={<ProfileInfo/> } />
        <Route path="/manag-address" element={<ManageAddress/>} />
        <Route path="/change-password" element={<ChangePassword/> } />
        
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/related/product/:id" element={<Product/>} />
        
        <Route path="/register" element={<Register/> } />
        <Route path="/about" element={<About/> } />
        <Route path="/login" element={<Login/>} />
        <Route path="/success" element={<OderComplateScreen/>} />
        <Route path="/myorders" element={<MyOrdersScreen/>} />

        {/* Dashboard  */}
        <Route path="/dashboard" element={<App2/>} />

        {/* category  */}
        <Route path="/admin/category" element={<CategoryScreen/> } />
        <Route path="/addcategory" element={<AddCategoryScreen/> } />
        <Route path="/updateCategory/:id" element={<UpdateCategoryScreen/> } />


        {/* Topcategory  */}
        <Route path="/admin/topcategory" element={<TopCategoryScreen/> } />
        <Route path="/addtopcategory" element={<AddTopCategoryScreen/> } />
        <Route path="/updateTopCategory/:id" element={<UpdateTopCategoryScreen/> } />


        {/* subCategory  */}
        <Route path="/admin/subCategory" element={<SubCategoryScreen/> } />
        <Route path="/addsubCategory" element={<AddSubCategoryScreen/> } />
        <Route path="/updateSubCategory/:id" element={<UpdateSubCategoryScreen/> } />

        {/* products  */}
        <Route path="/adminproducts" element={<ProductsScreen/> } />
        <Route path="/addproducts" element={<AddProductScreen/> } />
        <Route path="/updateproduct/:id" element={<UpdateProductsScreen/> } />



        {/* discounts products  */}
        <Route path="/discount" element={<DiscountScreen/> } />
        <Route path="/addproductdiscount" element={<AddDiscountScreen/> } />
        <Route path="/updateproduct/:id" element={<UpdateProductsScreen/> } />


        {/* sliders  */}
        <Route path="/sliders" element={<SliderScreen/> } />
        <Route path="/updateSlider/:id" element={<SliderUpdateScreen/> } />

        {/* orders  */}
        <Route path="/orders" element={<OrdersScreen/> } />

        {/* users  */}
        <Route path="/users" element={<UserScreen/> } />
        <Route path="/adduser" element={<AddUserScreen/> } />

        {/* Settings  */}
        <Route path="/settings" element={<SettingsScreens/> } />
        <Route path="/updateSettings/:id" element={<UpdateSettingsScreen/> } />
        <Route path="/Logout" element={<Logout/> } />
        </Routes> 
      
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
