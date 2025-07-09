const express = require("express");
const morgan = require("morgan");
const app = express();
const userModel = require("./models/user");
const dbConnection = require("./config/db");

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.send("About page");
});
app.get("/profile", (req, res) => {
  res.send("Profile page");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await userModel.create({
    username: username,
    email: email,
    password: password,
  });

  res.send(newUser);
});

app.get("/get-users", (req, res) => {
  userModel.find().then((users) => {
    res.send(users);
  });
});

app.get("/update-user", async (req, res) => {
  await userModel.findOneAndUpdate(
    {
      username: "a",
    },
    {
      email: "c@c.com",
    }
  );
  res.send("user updated");
});

app.get('/delete-user', async (req,res) => {
  await userModel.findOneAndDelete({
    username:"b"
  })
  res.send("user delete");
})

app.post("/form-data", (req, res) => {
  console.log(req.body);
  res.send("data received");
});

app.listen(3000);
