import { Router } from "express";
import {
  createStudent,
  createStudentDB,
  deleteStudent,
  getStudentById,
  getStudentByIdDB,
  getStudents,
  getStudentsDB,
  updateStudent,
} from "../controllers/student-controllers";

const router = Router();

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", createStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

router.get("/db/fn", getStudentsDB);
router.get("/db/fn/:id", getStudentByIdDB);
router.post("/db/fn", createStudentDB);

export default router;
