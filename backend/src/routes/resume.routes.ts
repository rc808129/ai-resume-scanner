import express from "express";

import upload from "../middleware/upload.middleware";
import { uploadResume, matchResumeWithJob } from "../controllers/resume.controller";

const router = express.Router();

router.post(
  "/upload",
  upload.single("resume"),
  uploadResume
);
router.post(
  "/job-match",
  upload.single("resume"),
  matchResumeWithJob
);

export default router;