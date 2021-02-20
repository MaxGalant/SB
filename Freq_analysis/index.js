const express = require("express");
const bodyParseer = require("body-parser");
const cors = require("cors");
const app = express();

const mySql = require("mysql");
const db = mySql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "freq",
  port: "3306",
});

const PORT = 3001;
app.use(express.json());
app.use(bodyParseer.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    optionsSuccessStatus: 200,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.get("/", (req, res) => {
  res.send("Server");
});
app.post("/saveEng", (req, res) => {
  const dict = req.body.dict;
  const text = req.body.text;
  dict["Text"] = text;
  const sqlInsert = "INSERT INTO eng Set ?";
  db.query(sqlInsert, dict, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
    res.send(result);
    console.log("Result", result);
  });
});

app.post("/saveUk", (req, res) => {
  const dict = req.body.dict;
  const text = req.body.text;
  dict["Text"] = text;
  const sqlInsert = "INSERT INTO uk Set ?";
  db.query(sqlInsert, dict, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
    res.send(result);
    console.log("Result", result);
  });
});
app.put("/etalonEng", (req, res) => {
  const etalon = req.body.etalon;
  const count = req.body.count;
  const save = req.body.save;
  etalon["Sum"] = count;
  for (let key in etalon) {
    etalon[key] = etalon[key] + save[key];
  }
  let sqlUpdate = " UPDATE etaloneng SET ? WHERE Id=1";
  db.query(sqlUpdate, etalon, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    } else {
      res.send(result);
      console.log("UPDATE", result);
    }
  });
});
app.get("/getEtalonEng", (req, res) => {
  const sqlSelect = "SELECT * FROM  `etaloneng`";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    res.send(result);
  });
});

app.put("/etalonUkr", (req, res) => {
  const etalon = req.body.etalon;
  const count = req.body.count;
  const save = req.body.save;
  etalon["Sum"] = count;
  for (let key in etalon) {
    etalon[key] = etalon[key] + save[key];
  }
  let sqlUpdate = " UPDATE etalonukr SET ? WHERE Id=1";
  db.query(sqlUpdate, etalon, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    } else {
      res.send(result);
      console.log("UPDATE", result);
    }
  });
});
app.get("/getEtalonUkr", (req, res) => {
  const sqlSelect = "SELECT * FROM  `etalonukr`";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    res.send(result);
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Running on port ${PORT}`);
});
