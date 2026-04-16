import { Router } from "express";
const router = Router();

import {
  addSkill,
  getSkills,
} from "../controllers/skill.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

router.post("/", verifyJWT, addSkill);
router.get("/", getSkills);

export default router;
