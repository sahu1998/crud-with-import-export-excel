import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
export const downloadExcel = (value) => {
  const data = value.map((row, index) => ({
    name: row.name,
    email: row.email,
    age: row.age,
    contact: row.contact,
  }));
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);

  XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Email", "Age", "Contact"]], {
    origin: "A1",
  });
  XLSX.writeFile(workbook, "report.xlsx");
};

export const downloadPdf = (value) => {
  console.log("downloadPdf");
  const doc = new jsPDF();
  doc.text("Team Details", 85, 10);
  doc.autoTable({
    theme: "grid",
    columns: [
      { title: "Name", field: "name", dataKey: "name" },
      { title: "Email", field: "email", dataKey: "email" },
      { title: "Age", field: "age", dataKey: "age" },
      { title: "Contact", field: "contact", dataKey: "contact" },
    ],
    body: value,
  });
  doc.save("report.pdf");
};

// const downloadExcel = async () => {
//   // const temp = await getApiHandler(`/json-to-excel/${page * 5}/${pageSize}`);
//   // if (temp.isConverted) {
//   const url = `http://localhost:8055/api/download-excel/data.xlsx`;
//   const aTag = document.createElement("a");
//   aTag.href = url;
//   aTag.setAttribute("download", "data.xlsx");
//   document.body.appendChild(aTag);
//   aTag.click();
//   aTag.remove();
//   // }
//   // console.log("downloadExcel: ", temp);
// };
