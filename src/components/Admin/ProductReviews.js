import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loading/Loader";
import { toastDisplay } from "../User/LoginSignUp";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");
  const [showReviews, setShowReviews] = useState(false); 

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
    setShowReviews(true); 
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      toast.error(error , toastDisplay);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError , toastDisplay);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully" , toastDisplay);
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch , error, deleteError, navigate, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`ALL REVIEWS - Admin`} />

          <div className="dashboard">
            <SideBar />
            <div className="productReviewsContainer">
              <form
                className="productReviewsForm"
                onSubmit={productReviewsSubmitHandler}
              >
                <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                <div>
                  <Star />
                  <input
                    type="text"
                    placeholder="Product Id"
                    required
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading || productId === ""}
                >
                  Search
                </Button>
              </form>

              {showReviews && reviews && reviews.length > 0 ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
                  autoHeight
                />
              ) : showReviews ? (
                <h1 className="productReviewsFormHeading">No Reviews Found</h1>
              ) : null}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductReviews;
