const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const home = require(__dirname + "/home.js");
const about = require(__dirname + "/about.js");
const contact = require(__dirname + "/contact.js");
const _ = require("lodash");
const app = express();
let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    pageName: home.pageName,
    pageIntro: home.pageContent(),
    postData: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("index", {
    pageName: about.pageName,
    pageIntro: about.pageContent(),
  });
});

app.get("/contact", (req, res) => {
  res.render("index", {
    pageName: contact.pageName,
    pageIntro: contact.pageContent(),
  });
});

app.get("/post", (req, res) => {
  res.sendFile(__dirname + "/post.html");
});

app.post("/post", (req, res) => {
  let postHead = req.body.title;
  let postContent = req.body.content;
  let newPost = { title: postHead, content: postContent };
  posts.push(newPost);
  console.log(newPost);
  console.log(posts);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  const key = req.params.postName;
  posts.forEach((element) => {
    if (element.title == key) {
      console.log("Found");
      res.render("postDescription", {
        postTitle: element.title,
        postContent: element.content,
      });
    }
  });
  console.log("Not found");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000.");
});
