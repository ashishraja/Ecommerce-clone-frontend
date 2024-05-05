import React, { Fragment, useEffect, useMemo, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { server } from "../../store";
import image from "./../../assets/images/1.png";

const Payment = () => {
  const orderInfo = useMemo(() => JSON.parse(sessionStorage.getItem("orderInfo")), []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (cartItems?.length === 0 || shippingInfo?.length === 0) {
      navigate("/cart");
    }
  }, [navigate, user, cartItems , shippingInfo, orderInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const totalPrice = orderInfo && orderInfo.totalPrice;
    try {
      const { data: { key } } = await axios.get(`${server}/getkey`, {
        withCredentials: true,
      });

      const { data: { order } } = await axios.post(`${server}/payment/process`, {
        totalPrice
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo?.subtotal,
        taxPrice: orderInfo?.tax,
        shippingPrice: orderInfo?.shippingCharges,
        totalPrice: orderInfo?.totalPrice,
        user: user._id,
        paymentInfo: {
          id: null,
          status: "Pending"
        }
      };

      const options = {
        key,
        amount: order.totalPrice,
        currency: "INR",
        name: "Pushpaben Creations",
        description: "Tutorial of RazorPay",
        image: image,
        order_id: order.id,
        callback_url: `${server}/paymentverification`,
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9999999999"
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#121212"
        },
        handler: function (response) {
          if (response.razorpay_payment_id) {
            orderData.paymentInfo.id = response.razorpay_payment_id;
            orderData.paymentInfo.status = "Paid";
            dispatch(createOrder(orderData));
            navigate("/success");
          }
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      toast.error(error.response.data.message , toastDisplay);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, toastDisplay);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast ]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo?.totalPrice || 0}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
