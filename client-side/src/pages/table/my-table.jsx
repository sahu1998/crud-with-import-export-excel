import React, { useEffect, useState } from "react";
import MainLayout from "../../main-layout";
import { getApiHandler } from "../../api-handler";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

const columns = ["Id", "Name", "Age", "Email", "Contact"];

const MyTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [contact, setContact] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const history = useNavigate();

  const changePage = (e, pageNum) => {
    console.log("pageNum: ", pageNum);
    setPage(pageNum - 1);
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
  useEffect(() => {
    getContact(page);
  }, [page]);

  return (
    <MainLayout>
      <div style={{ textAlign: "center" }}>
        <h1>Dollop Infotech Team</h1>
      </div>
      <table className="my-table" cellPadding={10} width={"100%"}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={`col-${index}`}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contact.map((row, index) => (
            <tr key={`row-${index}`}>
              <td>{page * pageSize + index + 1}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.email}</td>
              <td>{row.contact}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <div className="">
                <Pagination
                  size="medium"
                  variant="outlined"
                  count={Math.floor(rowCount / pageSize)}
                  onChange={changePage}
                  shape="rounded"
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </MainLayout>
  );
};

export default MyTable;
