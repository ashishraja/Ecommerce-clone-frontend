import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loading/Loader";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [dataGridReady, setDataGridReady] = useState(false);

  const { error, products , loading } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    // dispatch(getAdminProduct());
  };

  const columns = [
    { field: "id", headerName: "Product ID",
     minWidth: 250,
     flex: 1 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 240,
      flex: 1,
    },

    {
      field: "actions",
      flex: .8,
      headerName: "Actions",
      minWidth: 185,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            
               
               

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon  className="deleteIcon" />
            </Button>
             <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon className="editIcon" />
            </Link>
            
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item, index) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      // navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    // Mark the DataGrid as ready when the component has been rendered
    setDataGridReady(true);

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  return (
    <Fragment>
      { loading ? (
            <Loader />
            ) : (
              <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          {products && dataGridReady && (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          )}
        </div>
      </div>
      </Fragment>
      )}
    </Fragment>
  );
};

export default ProductList;
