import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loading/Loader";
import { toastDisplay } from "../User/LoginSignUp";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataGridReady, setDataGridReady] = useState(false);

  const { error, products, loading } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    // dispatch(getAdminProduct());
  };

  const columns = [
    {
      field: "id", headerName: "Product ID",
      minWidth: 250,
      flex: 1
    },

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
        console.log(params.row.id);
        return (
          <Fragment>
            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon className="deleteIcon" color="danger" style={{ marginTop: "-18px", marginLeft: "20px", color: "tomato" }} />
            </Button>
            <Link className="editIcon" to={`/admin/product/${params.row.id}`}>
              <EditIcon classname="editIcon" style={{ marginTop: "15px", color: "tomato" }} />
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
      toast.error(error , toastDisplay);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError , toastDisplay);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully" , toastDisplay);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    // Mark the DataGrid as ready when the component has been rendered
    setDataGridReady(true);

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  return (
    <Fragment>
      {loading ? (
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
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  pageSizeOptions={[]}
                  disableRowSelectionOnClick
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
