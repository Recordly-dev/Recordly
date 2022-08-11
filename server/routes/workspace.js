import express from "express";

import modWorkspace from "#models/workspace.js";

const router = express.Router();

router.get("/session", (req, res, next) => {
  console.log(req.session);
  console.log(req.user);
});

router.post("/", async (req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  try {
    // console.log(req);
    const { title, workspaceType } = req.body;
    // console.log(req.user);
    const { id: writerId } = req.user;
    const workspace = await modWorkspace.create({
      title,
      workspaceType,
      createdAt: Date.now(),
      editedAt: Date.now(),
      writer: writerId,
    });
    res.status(201);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// router.route("/").post(async (req, res, next) => {
//   try {
//     // console.log(req);
//     const { title, workspaceType } = req.body;
//     console.log(req.user);
//     const { id: writerId } = req.user;
//     const workspace = await modWorkspace.create({
//       title,
//       workspaceType,
//       createdAt: Date.now(),
//       editedAt: Date.now(),
//       writer: writerId,
//     });
//     res.status(201);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

export default router;
