const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

// EXAMPLE OF POST

/* 
posts = {
    // first post
  j123j42: {
    id: "j123j42",
    title: "post title",
    comments: [
      {
        id: "klj3kl",
        content: "comment!",
      },
    ],
  },
  // second post 
  j123j40: {
    id: "j123j40",
    title: "post title",
    comments: [
      {
        id: "klj3k1",
        content: "comment!",
      },
    ],
  },
};
so on ...
*/

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }
  console.log(posts);
  res.send({});
});

app.listen("4002", () => console.log("Listening on 4002"));
