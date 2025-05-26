import express from "express";
import {
  createFinance,
  getFinance,
  updateFinance,
  deleteFinance,
} from "../controllers/finance.controller.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// Add authentication middleware to all routes
router.use(userAuth);

router.get("/", getFinance);
router.post("/", createFinance);
router.put("/:id", updateFinance);
router.delete("/:id", deleteFinance);

export default router;
