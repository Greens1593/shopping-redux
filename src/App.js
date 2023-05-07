import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";

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
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request...",
          type: "warning",
        })
      );
      const res = await fetch(
        "https://redux-shopping-8d6d5-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Request Sent successfully",
          type: "success",
        })
      );
    };
    sendRequest().catch((err) => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Request Failed",
          type: "error",
        })
      );
    });
  }, [cart]);
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
