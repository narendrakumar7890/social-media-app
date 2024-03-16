import { db } from "../dbConnection/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//const conn
export const register = (req, res) => {
  //console.log("req.body: ", req.body);
  const query = "SELECT * FROM users WHERE username=?";

  //console.log("query: ", query);
  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?,?,?,?)";
    const values = [
      req.body.username,
      req.body.email,
      hashPassword,
      req.body.name,
    ];
    //console.log("q: ", q);
    //console.log("values: ", values);

    db.query(q, values, (err1, data1) => {
      console.log("err1: ", err1);
      if (err1) return res.status(500).json(err1);

      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  console.log("req.body: ", req.body);
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  console.log("req.body: ", req.body);

  return res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
