import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loading/Loader";
import { toastDisplay } from "../User/LoginSignUp";
const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataGridReady, setDataGridReady] = useState(false);
  const { error, users, loading } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      toast.success(message , toastDisplay);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    setDataGridReady(true);

    dispatch(getAllUsers());
  }, [dispatch, toast , error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 1 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 230,
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 1,
      cellClassName: (params) => {
        return params.value === "admin" ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: .7,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteUserHandler(params.row.id)}>
              <DeleteIcon className="deleteIcon" color="danger" style={{ marginTop: "-18px", marginLeft: "20px", color: "tomato" }} />
            </Button>
            <Link className="editIcon" to={`/admin/user/${params.row.id}`}>
              <EditIcon classname="editIcon" style={{ marginTop: "15px", color: "tomato" }} />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      {
        loading ? (<Loader />) : (
          <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="dashboard">
              <SideBar />
              <div className="productListContainer">
                <h1 id="productListHeading">ALL USERS</h1>
                {
                  users && dataGridReady && (
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
                      disableRowSelectionOnClick
                    />
                  )
                }
              </div>
            </div>
          </Fragment>
        )
      }
    </Fragment>
  );
};

export default UsersList;