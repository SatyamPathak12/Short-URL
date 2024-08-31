const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const dotEnv = require("dotenv");
const app = express();

dotEnv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

//remote
const con = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

con.connect(function (error) {
  if (error) {
    console.log(error);
    console.log("Database connection failed");
  } else {
    console.log("Database connected");
  }
});

// UUID generator
app.post("/api/create-short-url", function (request, response) {
  let uniqueID = Math.random()
    .toString(36)
    .replace(/[^a-z0-9]/gi, "")
    .substr(2, 10);
  let sql = `INSERT INTO links(longurl,shorturlid) VALUES('${request.body.longurl}','${uniqueID}')`;
  try {
    con.query(sql, function (error, result) {
      if (error) {
        response.status(500).json({
          status: "notok",
          message: "Something went wrong",
        });
      } else {
        response.status(200).json({
          status: "ok",
          shorturlid: uniqueID,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/get-all-short-urls", function (request, response) {
  let sql = `SELECT * FROM links`;
  try {
    con.query(sql, function (error, result) {
      if (error) {
        response.status(500).json({
          status: "notok",
          message: "Something went wrong",
        });
      } else {
        response.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/:shorturlid", function (request, response) {
  let shorturlid = request.params.shorturlid;

  let sql = `SELECT * FROM links WHERE shorturlid='${shorturlid}' LIMIT 1`;
  try {
    con.query(sql, function (error, result) {
      if (error) {
        response.status(500).json({
          status: "notok",
          message: "Something went wrong",
        });
      } else {
        sql = `UPDATE links SET count=${
          ((result[0] && result[0].count) || 0) + 1
        } WHERE id='${(result[0] && result[0].id) || 0}' LIMIT 1`;
        con.query(sql, function (error, result2) {
          if (error) {
            response.status(500).json({
              status: "notok",
              message: "Something went wrong",
            });
          } else {
            response.redirect(result[0].longurl);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// console.log(process.env.PORT);
app.listen(PORT, () => {
  console.log("app running on port", PORT);
});
