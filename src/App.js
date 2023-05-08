import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import { sendCardData } from "./store/cart-slice";

let isFirstRender = true;
function App() {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    dispatch(sendCardData(cart));
  }, [cart, dispatch]);
  return (
    <div className="App">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          open={notification.open}
        />
      )}
      {isLoggedIn ? <Layout /> : <Auth />}
    </div>
  );
}

export default App;
