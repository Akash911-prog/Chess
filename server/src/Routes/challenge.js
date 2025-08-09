import express from "express";
import { auth } from "../middlewares/auth.js";
import { createChallenge, getChallenges, acceptChallenge, rejectChallenge } from "../Controllers/challenge.js";

const router = express.Router();
router.use(auth);

router.get("/", getChallenges);
router.post("/", createChallenge);
router.put("/accept", acceptChallenge);
router.put("/reject", rejectChallenge);

export default router;