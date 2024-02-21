import { NextFunction, Request, Response } from "express";
import Student from "../models/Students";
import Course from "../models/Courses";
import Subject from "../models/Subjects";
import { Op } from "sequelize";
import * as fs from "fs";
import { sequelize } from "../db";
import { QueryOptions, QueryOptionsWithType, QueryTypes } from "sequelize";
import path from "path";

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const result = await Student.findAll({
    //   where: {
    //     deletedAt: {
    //       [Op.eq]: null,
    //     },
    //   },
    //   attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    // });

    let sql;

    const filePath = path.resolve(
      __dirname,
      "../db/functions/get_students.sql"
    );
    try {
      sql = fs.readFileSync(filePath).toString();
    } catch (error) {
      console.log(error);
    }

    await sequelize.query(sql, {
      type: QueryTypes.RAW,
    } as QueryOptions | QueryOptionsWithType<QueryTypes.RAW>);

    const [result, ...other] = await sequelize.query(
      "SELECT * FROM get_students()"
    );

    res.status(200).json({ result });
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

    res.status(200).json({ student });
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
    const { id, fullName, age, courseId, courseName, subjects } = req.body;

    // if (subjects) {
    //   subjects.forEach(async (subject: any) => {
    //     const existSubject = await Subject.findOne({
    //       where: {
    //         name: subject,
    //       },
    //     });

    //     let newSubject;
    //     if (!existSubject) {
    //       newSubject = await Subject.create({
    //         name: subject,
    //         courseId: course?.dataValues?.id ?? newCourse?.dataValues?.id,
    //       });
    //     }
    //   });
    // }

    // const student = await Student.findOne({
    //   where: { fullName },
    //   attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    // });

    const courseData = {
      id: courseId,
      name: courseName,
    };

    const courseInstance = await Course.upsert(courseData, {
      returning: true,
    });

    const data = {
      id: id,
      fullName,
      age,
      courseId: courseInstance[0]?.dataValues?.id,
    };

    const instance = await Student.upsert(data, {
      returning: true,
    });

    if (instance) {
      return res.status(201).json({ data: instance[0] });
    }
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
