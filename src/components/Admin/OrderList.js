import React, { Fragment, useEffect, useState } from "react";
import { DataGrid , GridToolbar } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loading/Loader";
import { toastDisplay } from "../User/LoginSignUp";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataGridReady, setDataGridReady] = useState(false);

  const { error, orders, loading } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

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
      toast.success("Order Deleted Successfully", toastDisplay);
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    setDataGridReady(true);

    dispatch(getAllOrders());
  }, [dispatch, toast, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: .3 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: .1,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: .1,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 100,
      flex: .2,
    },

    {
      field: "actions",
      flex: .1,
      headerName: "Actions",
      minWidth: 200,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteOrderHandler(params.row.id)}>
              <DeleteIcon className="deleteIcon" color="danger" style={{ marginTop: "-16px", marginLeft: "20px", color: "rgba(0, 0, 0, 0.637)" }} />
            </Button>
            <Link className="editIcon" to={`/admin/order/${params.row.id}`}>
              <EditIcon classname="editIcon" style={{ marginTop: "13px", color: "rgba(0, 0, 0, 0.637)" }} />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      {loading ? (<Loader />) : (
        <Fragment>
          <MetaData title={`ALL ORDERS - Admin`} />

          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL ORDERS</h1>
              {
                orders && dataGridReady && (
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    slots={{
                      toolbar: GridToolbar,
                    }}
                    disableRowSelectionOnClick
                  />
                )
              }
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderList;