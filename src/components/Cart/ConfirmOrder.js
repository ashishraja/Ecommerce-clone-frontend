import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { cartItems , shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  useEffect(()=>{
    if(shippingInfo.length === 0 || cartItems.length === 0){
      navigate("/cart");
    }
  },[shippingInfo.length , cartItems.length , navigate]);

  const phone = shippingInfo?.phoneNo;

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;

  const proceedToPayment = async() => {

    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");

  }


  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <div className="order-steps">
        <CheckoutSteps className="checkoutSteps" activeStep={1} />
      </div>
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <fieldset>
              <legend className="legend">Shipping Info</legend>
              <div className="confirmshippingAreaBox">
                <div>
                  <p>Name :</p>
                  <span>{user?.name}</span>
                </div>
                <div>
                  <p>Phone :</p>
                  <span>{phone}</span>
                </div>
                <div className="address-span">
                  <p className="address">Add :</p>
                  <span>{address && address}</span>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="confirmCartItems">
            <fieldset>
              <legend className="legend">Your Cart Items</legend>
              <div className="confirmCartItemsContainer">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </fieldset>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal </p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges </p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST </p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total </b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;