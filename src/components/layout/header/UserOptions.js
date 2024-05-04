import React, { Fragment, useState } from "react";
import "./header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
// import Backdrop from "@material-ui/core/Backdrop";
import { Backdrop } from '@mui/material';
// import DashboardIcon from "@material-ui/icons/Dashboard";
import DashboardIcon from '@mui/icons-material/Dashboard';
// import PersonIcon from "@material-ui/icons/Person";
import PersonIcon from "@mui/icons-material/Person";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import ListAltIcon from "@material-ui/icons/ListAlt";
import ListAltIcon from '@mui/icons-material/ListAlt';
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const UserOptions = () => {
  const { cartItems } = useSelector((state) => state.cart);
  let { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user) {
    if (user.role === "admin") {
      options.unshift({
        icon: <DashboardIcon />,
        name: "Dashboard",
        func: dashboard,
      });
    }
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    // alert.success("Logout Successfully");
    Cookies.remove('userToken');
    navigate("/");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user && user.avatar && user.avatar.url}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;