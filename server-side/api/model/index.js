const mongoose = require("mongoose");

const workersSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  contact: String,
  position: {
    type: String,
    enum: ["Trainee", "Intern", "Developer"],
  },
  status: {
    type: String,
    enum: ["active", "deactive"],
    default: "deactive",
  },
});

const workersModal = mongoose.model(process.env.COLLECTION, workersSchema);

const postData = async (values) => {
  console.log("post data: ", values);
  try {
    const data = await workersModal.create(values);
    return { data, message: "success", status: 200 };
  } catch (error) {
    console.log("Post data error: ", error);
    return { error, message: "error", status: 400 };
  }
};

const getData = async (id = null) => {
  try {
    const data = id
      ? await workersModal.findById(id)
      : await workersModal.find();
    return { data, message: "success", status: 200 };
  } catch (error) {
    return { error, message: "error", status: 400 };
  }
};

const getDataByQuery = async (query, skip, limit) => {
  try {
    const data = await workersModal
      .find({
        $or: [
          { name: { $regex: query } },
          { email: { $regex: query } },
          { workers: { $regex: query } },
        ],
      })
      .skip(skip)
      .limit(limit);

    const length = await workersModal
      .find({
        $or: [
          { name: { $regex: query } },
          { email: { $regex: query } },
          { workers: { $regex: query } },
        ],
      })
      .count();

    return {
      data,
      message: "success",
      status: 200,
      length,
    };
  } catch (error) {
    return { data: error, message: "error", status: 400 };
  }
};

const getPaginationData = async (skip, limit) => {
  try {
    const data = await workersModal
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    const length = await workersModal.count();
    return {
      data,
      message: "success",
      status: 200,
      length,
    };
  } catch (error) {
    return { error, message: "error", status: 400 };
  }
};

const deleteData = async (id) => {
  try {
    const data = await workersModal.findByIdAndDelete(id);
    return { data, message: "success", status: 200 };
  } catch (error) {
    return { error, message: "error", status: 400 };
  }
};

const putData = async (id, values) => {
  console.log("put:----- ", values);
  try {
    const data = await workersModal.findByIdAndUpdate(id, values);
    return { data, message: "success", status: 200 };
  } catch (error) {
    return { error, message: "error", status: 400 };
  }
};
module.exports = {
  workersModal,
  postData,
  getData,
  deleteData,
  putData,
  getPaginationData,
  workersModal,
  getDataByQuery,
};
