import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourseByIdDB,
  getCourses,
  getCoursesDB,
} from "../controllers/course-controllers";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.delete("/:id", deleteCourse);

router.get("/db/fn", getCoursesDB);
router.get("/db/fn/:id", getCourseByIdDB);
router.post("/", createCourse);
router.delete("/:id", deleteCourse);

export default router;
