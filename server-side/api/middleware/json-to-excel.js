const { getPaginationData, getData } = require("../model");
const XLSX = require("xlsx");
const jsonToExcel = async (req, res, next) => {
  console.log("json to excel middleware...");
  const skip = req.params.skip;
  const limit = req.params.limit;

  const result = await getPaginationData(skip, limit);

  if (result.status !== 200) {
    res.send(result);
  }
  const data = result.data?.map((value) => {
    const { name, email, contact, age, position } = value;
    return {
      name,
      email,
      age,
      contact,
      position,
    };
  });
  try {
    const worksheet = XLSX.utils.json_to_sheet(
      JSON.parse(JSON.stringify(data))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["Name", "Email", "Age", "Contact", "Position"]],
      { origin: "A1" }
    );
    XLSX.writeFile(workbook, "storage/data.xlsx");
    req.excelConverted = { status: 200, isConverted: true };
    next();
  } catch (error) {
    res.send(error);
  }
};

module.exports = { jsonToExcel };
