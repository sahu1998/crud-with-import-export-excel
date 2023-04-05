// Uncomment the next line for use in NodeJS:
// const XLSX = require("xlsx"), axios = require("axios");

(async () => {
  /* fetch JSON data and parse */
  const url = "https://theunitedstates.io/congress-legislators/executive.json";
  const raw_data = (await axios(url, { responseType: "json" })).data;

  /* filter for the Presidents */
  const prez = raw_data.filter((row) =>
    row.terms.some((term) => term.type === "prez")
  );

  /* flatten objects */
  const rows = prez.map((row) => ({
    name: row.name.first + " " + row.name.last,
    birthday: row.bio.birthday,
  }));

  /* generate worksheet and workbook */
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

  /* fix headers */
  XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

  /* calculate column width */
  const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
  worksheet["!cols"] = [{ wch: max_width }];

  /* create an XLSX file and try to save to Presidents.xlsx */
  XLSX.writeFile(workbook, "Presidents.xlsx");
})();
