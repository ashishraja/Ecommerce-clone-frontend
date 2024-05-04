import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import MetaData from '../layout/MetaData';
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearErrors } from '../../actions/productAction';
import Loader from '../layout/Loading/Loader';
import { toast } from "react-toastify";
import ProductCard from './ProductCard';
import "./home.css";
import { toastDisplay } from '../User/LoginSignUp';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error , toastDisplay);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, toast]);


  return (
    <Fragment>
      {loading ? (<Loader />) : (
        <Fragment>

          <MetaData title="Ecommerce" />

          <div className="home-page">
            <p>Welcome to AshishCreations</p>
            <h1>Find Top Brands Amazing products here.</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="home-heading"> Featured Products </h2>

          <div className="container" id="container">

            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home;