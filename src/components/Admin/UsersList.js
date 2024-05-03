import React, { Fragment, useEffect , useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import {useNavigate} from "react-router-dom";
import Loader from "../layout/Loading/Loader";
const UsersList = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const alert = useAlert();
  const [dataGridReady, setDataGridReady] = useState(false);
  const { error, users ,loading} = useSelector((state) => state.allUsers);
  
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
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    setDataGridReady(true);

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 1 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      flex:1,
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
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
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
            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
            <Link className="editIcon" to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
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
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
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