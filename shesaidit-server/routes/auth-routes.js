const express = require("express");
const { protect } = require("../middleware/auth-middleware");

const router = express.Router();
const { register, login } = require("../controllers/auth-controller");
const {
  createPost,
  getAllPosts,
  vote,
  savePost,
  getUser,
  getOnePost,
  getOneSubCategory,
  getSavedPosts,
  getSubmittedPosts,
  getSearchedPost,
  getPopular,
  deletePost,
} = require("../controllers/post-controller");
const {
  createCategory,
  createSubcategory,
  getAllCategories,
  getAllSubcategories,
} = require("../controllers/category-controller");

const {
  createComment,
  getComments,
  commentVote,
  deleteComment,
} = require("../controllers/comment-controller");

router.post("/login", login);
router.post("/register", register);
router.post("/createPost", protect, createPost);
router.post("/createCategory", protect, createCategory);
router.post("/createSubcategory", protect, createSubcategory);
router.post("/createComment", protect, createComment);

router.get("/", getAllPosts);
router.get("/posts/:sortType", getAllPosts);
router.get("/categories", getAllCategories);
router.get("/subcategories", getAllSubcategories);
router.get("/user", protect, getUser);
router.get("/savedPosts", protect, getSavedPosts);
router.get("/submittedPosts", protect, getSubmittedPosts);
router.get("/post/:postId", getOnePost);
router.get("/sub/:subcategory", getOneSubCategory);
router.get("/comments/:postId", getComments);
router.get("/search/:query", getSearchedPost);

router.delete("/deletePost", protect, deletePost);
router.put("/deleteComment", protect, deleteComment);

router.put("/vote", protect, vote);
router.put("/commentVote", protect, commentVote);

router.put("/savePost", protect, savePost);

module.exports = router;
