import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

var passwordValid = false;

function passwordCheck(req, res, next) {
  if (req.body["password"] == "Test") {
    passwordValid = true;
  }
  next();
}

app.use(passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (passwordValid) {
    //res.sendFile(__dirname + "/public/secret.html");
    const today = new Date();
    const day = today.getDay();

    let type = "a weekday";
    let msg = "carry on with your work lad!";

    if (day === 0 || day === 6) {
      type = "a weekend";
      msg = "lets get plastered.";
    }
    res.render("profile.ejs", {
      dayType: type,
      message: msg,
    });
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is Running on port: ${port}`);
});
