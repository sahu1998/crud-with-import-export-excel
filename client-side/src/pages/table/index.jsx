import React from "react";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  deleteApiHandler,
  getApiHandler,
  putApiHandler,
} from "../../api-handler";
import MainLayout from "../../main-layout";
import { downloadExcel, downloadPdf } from "../../utils";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="secondary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default function Table() {
  const [contact, setContact] = useState([]);
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [checked, setChecked] = useState(true);
  const columns = [
    {
      field: "id",
      headerName: "S No.",
      width: 70,
      renderCell: (params) =>
        page * pageSize + params.api.getRowIndex(params.row._id) + 1,
    },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    { field: "age", headerName: "Age", width: 20 },
    { field: "contact", headerName: "Contact", width: 150 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <FormControlLabel
    //         control={
    //           <Switch
    //             checked={params.row.status === "active" ? true : false}
    //             onClick={(e) => {
    //               const check =
    //                 params.row.status === "active" ? "active" : "deactive";
    //               changeStatus(params.row._id, check);
    //             }}
    //           />
    //         }
    //         label={params.row.status}
    //       />
    //     );
    //   },
    // },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="warning"
            // color="warning"
            onClick={() => {
              deleteContact(params.row._id);
            }}
            endIcon={<DeleteOutlineIcon />}
          >
            Delete
          </Button>
        );
      },
    },
    {
      field: "update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              history(`/addContact?id=${params.row._id}`);
            }}
            endIcon={<EditIcon />}
          >
            Update
          </Button>
        );
      },
    },
  ];

  const deleteContact = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    });

    if (willDelete) {
      const result = await deleteApiHandler(`/delete/${id}`);
      if (result.status === 200) {
        await swal(
          "Deleted!",
          "Your imaginary file has been deleted!",
          "success"
        );
        await getContact();
      }
    }
  };

  const getContact = async (currentPage = page) => {
    console.log("akjsdjfkd: ", page);
    setOpen(true);
    const temp = await getApiHandler(`/get/${currentPage * 5}/${pageSize}`);
    console.log("data: ", temp);
    if (temp.status === 200) {
      setContact(temp.data);
      setRowCount(temp.length);
    }
    setOpen(false);
  };

  const changeStatus = async (id, status) => {
    const result = await putApiHandler(`/update-status/${id}/${status}`);
    console.log("result status: ", result);
    await getContact();
  };

  useEffect(() => {
    getContact(page);
  }, [page]);

  return (
    <MainLayout>
      <Container>
        <div style={{ textAlign: "center" }}>
          <h1>Dollop Infotech Team</h1>
        </div>
        <div className="d-flex gap-2 justify-content-end">
          <Button
            variant="contained"
            color="success"
            className="mb-4"
            onClick={() => downloadExcel(contact)}
          >
            Export to Excel
          </Button>
          <Button
            variant="contained"
            // color="success"
            className="mb-4"
            onClick={() => downloadPdf(contact)}
          >
            Export to Pdf
          </Button>
        </div>
        <div
          style={{
            height: 500,
            width: "100%",
            backgroundColor: "whitesmoke",
            border: "1px solid #252525",
            borderRadius: "8px",
          }}
        >
          <DataGrid
            rows={contact}
            rowCount={rowCount}
            loading={open}
            columns={columns}
            rowsPerPageOptions={[5]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            getRowId={(row) => row._id}
            density="comfortable"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            components={{
              Pagination: CustomPagination,
            }}
          />
        </div>
      </Container>
    </MainLayout>
  );
}
