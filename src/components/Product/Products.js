import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loading/Loader";
import ProductCard from "../HomePage/ProductCard";
import Pagination from "react-js-pagination";
import { Slider } from '@mui/material';
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { toastDisplay } from "../User/LoginSignUp";

const Products = () => {
  const dispatch = useDispatch();
  const  keyword  = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 150000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const {
    products,
    loading,
    error,
    productsCount,
    resultPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  
  const keywords = keyword && keyword.keyword ;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      toast.error(error , toastDisplay);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keywords, currentPage, price, category, ratings));
  }, [dispatch, keywords, currentPage, price, category, ratings, toast , error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography className="filters" style={{ fontSize: "1.2vmax" }}>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={125000}
            />

            <Typography className="category" style={{ fontSize: "1.2vmax" }}>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                  // onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography className="rating" component="legend">Ratings Above </Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPage >= filteredProductsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
