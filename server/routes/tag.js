import express from "express";

import tagApi from "#controllers/tagApi.js";

const router = express.Router();

router.route("/").get(tagApi.getTagsOfCurrentUser);

router.route("/").post(tagApi.createTag);

export default router;
