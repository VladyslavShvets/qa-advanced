const assert = require("node:assert/strict");
const { describe, test } = require("node:test");

const { apiClient } = require("./apiClient");

function assertPostShape(post) {
  assert.equal(typeof post.userId, "number");
  assert.equal(typeof post.id, "number");
  assert.equal(typeof post.title, "string");
  assert.equal(typeof post.body, "string");
}

function assertCommentShape(comment) {
  assert.equal(typeof comment.postId, "number");
  assert.equal(typeof comment.id, "number");
  assert.equal(typeof comment.name, "string");
  assert.equal(typeof comment.email, "string");
  assert.equal(typeof comment.body, "string");
}

describe("JSONPlaceholder API tests with axios", { concurrency: false }, () => {
  test("GET /posts повертає список постів", async () => {
    const response = await apiClient.get("/posts");

    assert.equal(response.status, 200);
    assert.ok(response.headers["content-type"].includes("application/json"));
    assert.ok(Array.isArray(response.data));
    assert.equal(response.data.length, 100);
    assertPostShape(response.data[0]);
  });

  test("GET /posts/1 повертає коректний пост", async () => {
    const response = await apiClient.get("/posts/1");

    assert.equal(response.status, 200);
    assert.ok(response.headers["content-type"].includes("application/json"));
    assert.equal(response.data.id, 1);
    assert.equal(response.data.userId, 1);
    assert.equal(
      response.data.title,
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    );
    assert.ok(response.data.body.includes("quia et suscipit"));
    assertPostShape(response.data);
  });

  test("GET /comments?postId=1 повертає коментарі тільки для потрібного поста", async () => {
    const response = await apiClient.get("/comments", {
      params: { postId: 1 },
    });

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.data));
    assert.ok(response.data.length > 0);

    response.data.forEach((comment) => {
      assert.equal(comment.postId, 1);
      assert.match(comment.email, /@/);
      assertCommentShape(comment);
    });
  });

  test("POST /posts створює новий пост", async () => {
    const newPost = {
      title: "qa-advanced homework",
      body: "Creating API tests with axios for JSONPlaceholder",
      userId: 11,
    };

    const response = await apiClient.post("/posts", newPost);

    assert.equal(response.status, 201);
    assert.ok(response.headers["content-type"].includes("application/json"));
    assert.equal(response.data.title, newPost.title);
    assert.equal(response.data.body, newPost.body);
    assert.equal(response.data.userId, newPost.userId);
    assert.equal(response.data.id, 101);
  });

  test("POST /comments створює новий коментар", async () => {
    const newComment = {
      postId: 1,
      name: "QA Advanced Student",
      email: "student@example.com",
      body: "Axios interceptors are working correctly.",
    };

    const response = await apiClient.post("/comments", newComment);

    assert.equal(response.status, 201);
    assert.ok(response.headers["content-type"].includes("application/json"));
    assert.equal(response.data.postId, newComment.postId);
    assert.equal(response.data.name, newComment.name);
    assert.equal(response.data.email, newComment.email);
    assert.equal(response.data.body, newComment.body);
    assert.equal(response.data.id, 501);
  });
});
