import { NextFunction, Request, Response } from "express";
import Course from "../models/Courses";
import Subject from "../models/Subjects";
import { Op } from "sequelize";

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await Course.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null,
        },
      },
      attributes: { exclude: ["updatedAt", "createdAt", "deletedAt"] },
    });
    res.status(200).json({
      success: true,
      message: "this is to get all Courses details",
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await Course.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ["updatedAt", "createdAt", "deletedAt"] },
      include: [
        {
          model: Subject,
          as: "subjects",
          attributes: {
            exclude: ["updatedAt", "createdAt", "deletedAt", "courseId"],
          },
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: "get course by id",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await Course.create({
      name: req.body.name,
    });
    res.status(200).json({
      success: true,
      message: "this is to get all courses details",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

// export const updateStudent = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await Student.update(
//       { age: req.body.age },
//       { where: { id: req.params.id } }
//     );
//     res.status(200).json({
//       success: true,
//       message: "update successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Course.update(
      { deletedAt: Date.now() },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      success: true,
      message: "deleted",
    });
  } catch (error) {
    next(error);
  }
};
