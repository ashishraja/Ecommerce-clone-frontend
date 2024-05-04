import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loading/Loader";
import { toast } from "react-toastify";
import {useParams} from "react-router-dom";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error , toastDisplay);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, toast , error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
             
              <fieldset className="legend">
                <legend>Order Id</legend>
                <div className="orderDetailsContainerBox">
                  #{order && order._id}
                </div>
              </fieldset>

              <fieldset className="legend">
                <legend> Shipping Info </legend>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name :</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone :</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className="address">
                  <p>Address :</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              </fieldset>

              <fieldset className="legend">
                <legend>Payment Info</legend>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "Paid"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "Paid"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount :</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
              </fieldset>

              <fieldset className="legend"> 
                <legend>Order Status</legend>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
              </fieldset>
            </div>
            

            <div className="orderDetailsCartItems">
              <fieldset className="legend">
                <legend>Order Items </legend>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;