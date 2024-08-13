var scholarly = require("scholarly");

// To search for a specific topic

// To list articles a user co-authored
// scholarly.user("H18-9fkAAAAJ").then((data) => {
//   console.log(data);
// });
const express = require("express");
const cors=require("cors")
const app = express();
// app.use(() => {
//   console.log("got a hit!!");
// });
app.use(cors())
let router = express.Router();

router.get("/", (req, res) => {
  res.json("Hello from my server!");
});

router.get("/search/:search_text", (req, res) => {
  const { search_text } = req.params;
  console.log("search_text : " + search_text);
  console.log(search_text);

  scholarly
    .search(search_text)
    .then((data) => {
      console.log(data);
      res.status(200).json({
        status: "success",
        data,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: "fail",
        message: "Request failed",
      });
    });
});

app.use("/api", router);

app.all("*", (req, res) => {
  console.log("why are you here!!");
  res.send("<h1>Why r u here!</h1>");
});

app.listen(8000, () => {
  console.log("server listening on port 8000...............");
});
