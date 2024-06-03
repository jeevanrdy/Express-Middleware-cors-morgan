let mongoose = require("mongoose");
let nodemon = require("nodemon");
let express = require("express");
let cors = require("cors");
let morgan = require("morgan");
let path = require("node:path");
let fs = require("node:fs");

let app = express();

app.use(cors());
app.use(morgan("tiny"));

let mwf1 = (req, res, next) => {
  console.log("This is MWF1");
  next();
};
let mwf2 = (req, res, next) => {
  console.log("This is MWF2");
  next();
};
let mwf3 = (req, res, next) => {
  console.log("This is MWF3");
  next();
};

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

// app.use(mwf1);
// app.use(mwf2);
// app.use(mwf3);

app.get("/countriesList", async (req, res) => {
  let countriesList = await Employee.find().distinct("country");
  res.json(countriesList);
});
app.get("/departmentList", async (req, res) => {
  let departmentList = await Employee.find().distinct("department");
  res.json(departmentList);
});
app.get("/genderList", async (req, res) => {
  let genderList = await Employee.find().distinct("gender");
  res.json(genderList);
});

app.get("/employees", mwf1, mwf2, mwf3, async (req, res) => {
  console.log(req.query);
  let employees = await Employee.find().and([
    { country: req.query.country },
    { department: req.query.department },
    { gender: req.query.gender },
  ]);
  res.json(employees);
});

app.listen(4444, () => {
  console.log("Listening to port 4444");
});

let employeeSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  age: Number,
  profilepicture: String,
  country: String,
  salary: Number,
});

let Employee = new mongoose.model("employee", employeeSchema);

let connectToMongoDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://jeevanrdy:jeevanrdy@skynet.ycaxxus.mongodb.net/FakeOffice?retryWrites=true&w=majority&appName=SkyNet"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Unable to connect to MongoDB");
  }
};

connectToMongoDB();
