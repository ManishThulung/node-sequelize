import { Router } from "express";
import {
  createSubject,
  getSubjectById,
  getSubjects,
  deleteSubject,
  updateSubject,
  createSubjectDB,
  getSubjectsDB,
} from "../controllers/subject-controllers";

const router = Router();

router.get("/", getSubjects);
router.get("/:id", getSubjectById);
router.post("/", createSubject);
router.patch("/:id", updateSubject);
router.delete("/:id", deleteSubject);

router.get("/db/fn", getSubjectsDB);
router.get("/db/fn/:id", getSubjectById);
router.post("/db/fn", createSubjectDB);
router.patch("/db/fn/:id", updateSubject);
router.delete("/db/fn/:id", deleteSubject);

export default router;
