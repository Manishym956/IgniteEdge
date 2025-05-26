import express from "express";
import {
  createFinance,
  getFinance,
  updateFinance,
  deleteFinance,
} from "../controllers/finance.controller.js";

const router = express.Router();

router.get("/", getFinance);
router.post("/", createFinance);
router.put("/:id", updateFinance);
router.delete("/:id", deleteFinance);

export default router;
