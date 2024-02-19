import { NextFunction, Request, Response } from "express";
import Student from "../models/Students";
import Course from "../models/Courses";
import Subject from "../models/Subjects";
import { Op } from "sequelize";

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await Student.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null,
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });
    res.status(200).json({
      success: true,
      message: "this is to get all students details",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await Student.findOne({
      where: {
        [Op.and]: {
          id: req.params.id,
          deletedAt: null,
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "courseId", "deletedAt"],
      },
      include: [
        {
          model: Course,
          as: "courses",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },

          include: [
            {
              model: Subject,
              as: "subjects",
              attributes: {
                exclude: ["createdAt", "updatedAt", "courseId", "deletedAt"],
              },
            },
          ],
        },
      ],
    });

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "get student by id",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, age, courseId } = req.body;

    console.log(courseId, "body");
    let student;
    if (courseId) {
      const course = await Course.findByPk(courseId);
      if (course) {
        console.log(course, "course");
        student = await Student.create({
          fullName,
          age,
          courseId,
        });
      } else {
        throw new Error("id not found");
      }
    } else {
      throw new Error("id not found");
    }
    res.status(200).json({
      success: true,
      message: "this is to get all students details",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Student.update(
      { age: req.body.age },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      success: true,
      message: "update successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Student.update(
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
