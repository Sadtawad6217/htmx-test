import express from "express";
import axios from "axios";
import createHomepageTemplate from "./views/index.js";
import createTemplate from "./views/post.js";
import createEditFormTemplate from "./views/edit.js";
import createPostFormTemplate from "./views/create.js";

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(createHomepageTemplate());
});

app.get("/posts", async (req, res) => {
  try {
    const { published, page = 1 } = req.query;

    const apiUrl =
      published === "false"
        ? `http://localhost:8080/api/v1/posts?published=false&page=${page}`
        : `http://localhost:8080/api/v1/posts?page=${page}`;

    const response = await axios.get(apiUrl);
    const postsData = response.data.posts.map((post) => ({
      id: post.ID,
      title: post.Title,
      content: post.Content,
      published: post.Published,
      created_at: post.CreatedAt,
    }));
    const totalPages = response.data.total_page;

    const listTemplate = /*html*/ `
      <ul>
        ${postsData.map(createTemplate).join("")}
      </ul>
      <div class="pagination">
        <button id="prev-page" hx-get="/posts?page=${Math.max(
          page - 1,
          1
        )}&published=${published || ""}" hx-target="#content" ${
      page <= 1 ? "disabled" : ""
    }>
          Previous
        </button>
        <button id="next-page" hx-get="/posts?page=${Math.min(
          page + 1,
          totalPages
        )}&published=${published || ""}" hx-target="#content" ${
      page >= totalPages ? "disabled" : ""
    }>
          Next
        </button>
      </div>
    `;
    res.send(listTemplate);
  } catch (error) {
    console.error("Error fetching post data:", error.message || error);
    res.status(500).send("Error fetching post data");
  }
});

app.delete("/delete-post", async (req, res) => {
  try {
    const { id } = req.body;
    await axios.delete(`http://localhost:8080/api/v1/posts/${id}`);

    res.send("");
  } catch (error) {
    console.error("Error deleting post:", error.message || error);
    res.status(500).send("Error deleting post");
  }
});

app.get("/edit-post/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `http://localhost:8080/api/v1/posts/${id}`
    );
    const post = response.data;

    const formHtml = createEditFormTemplate({
      id: post.ID,
      title: post.Title,
      content: post.Content,
    });

    res.send(formHtml);
  } catch (error) {
    console.error("Error fetching post for edit:", error.message || error);
    res.status(500).send("Error fetching post for edit");
  }
});

app.put("/edit-post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;

    const isPublished = published === "true" ? true : false;

    const response = await axios.put(
      `http://localhost:8080/api/v1/posts/${id}`,
      {
        Title: title,
        Content: content,
        Published: isPublished,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const updatedPost = response.data;
    const updatedPostHtml = createTemplate({
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      published: updatedPost.published,
      created_at: updatedPost.created_at,
    });

    res.send(updatedPostHtml);
  } catch (error) {
    console.error("Error updating post:", error.message || error);
    res.status(500).send("Error updating post");
  }
});

app.post("/post", async (req) => {
  try {
    const { title, content, published } = req.body;

    // Convert 'published' to boolean if it's a string
    const isPublished = published === "true" ? true : false;

    const response = await axios.post(
      `http://localhost:8080/api/v1/posts`,
      {
        Title: title,
        Content: content,
        Published: isPublished, // Use the boolean value
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const updatedPost = response.data;

    const updatedPostHtml = createPostFormTemplate({
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      published: updatedPost.published,
    });
  } catch (error) {
    console.error("Error updating post:", error.message || error);
    res.status(500).send("Error updating post");
  }
});

app.get("/create-draft", (req, res) => {
  const draftFormHtml = createPostFormTemplate(); // Pass an empty object or default values
  res.send(draftFormHtml);
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
