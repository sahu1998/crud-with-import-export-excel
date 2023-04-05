import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Table from "../pages/table";
import UserForm from "../pages/form";
import MyTable from "../pages/table/my-table";
export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contactlist" element={<Table />} />
      <Route path="/mytable" element={<MyTable />} />
      <Route path="/addcontact" element={<UserForm />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
