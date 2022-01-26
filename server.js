const express = require("express");
const app = express();
const fs = require("fs");
const validation = require("./validator");
const schema = require("./schema");

const router = express.Router();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.sendFile("/home/abhishek008/Projects/node_exercise" + "/index.html");
});

router.get("/todos", (req, res) => {
  let data = fs.readFileSync("data.json");
  data = JSON.parse(data);
  res.status(200).send(data);
});

router.post("/todos", (req, res) => {
  let data = fs.readFileSync("data.json");
  data = JSON.parse(data);

  data.push({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });
  let newData = JSON.stringify(data);
  fs.writeFile("data.json", newData, (err) => {
    if (err) throw err;

    console.log("New data added");
  });
  res.status(200).send(data);
});

router.delete("/todos/:id", (req, res) => {
  let data = fs.readFileSync("data.json");
  data = JSON.parse(data);

  const found = data.some((object) => {
    return object.title === req.params.id;
  });

  if (found) {
    console.log(found);
    let newData = data.filter((object) => {
      return object.title !== req.params.id;
    });
    newData = JSON.stringify(newData);
    fs.writeFile("data.json", newData, (err) => {
      if (err) throw err;
    });
  } else {
    return res
      .status(400)
      .json({ msg: `No member with id of ${req.params.id}` });
  }
  return res.status(200).send(data);
});

router.put(
  "/todos/:title",
  validation.validateBody(schema.updateTodoSchema),
  (req, res) => {
    let data = fs.readFileSync("data.json");
    data = JSON.parse(data);

    data.forEach((object) => {
      if (object.title === req.params.title) {
        object.description = req.body.description;
        object.status = req.body.status;
      }
    });

    let newData = JSON.stringify(data);
    fs.writeFile("data.json", newData, (err) => {
      if (err) throw err;
    });

    res.status(200).send(data);
  }
);

router.post("/login", (req, res) => {
  const username = "un";
  const password = "pw";
  if (req.body.username === username && req.body.pasword === password) {
    const data = require("./data.json");
    console.log("success");
    res.status(200).send(data);
  } else {
    console.log("fail");
    res.send("fail");
  }
});

router.post("/register", (req, res) => {
  res.send("Trying to register!");
});

router.get("/logout", (req, res) => {
  res.send("Trying to logout!");
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
