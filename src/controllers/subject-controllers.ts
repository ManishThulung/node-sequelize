import { NextFunction, Request, Response } from "express";
import Subject from "../models/Subjects";
import { Op } from "sequelize";

export const getSubjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subjects = await Subject.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null,
        },
      },
      attributes: { exclude: ["updatedAt", "createdAt", "deletedAt"] },
    });
    res.status(200).json({
      success: true,
      message: "this is to get all subjects details",
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subject = await Subject.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      success: true,
      message: "get subject by id",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

export const createSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subject = await Subject.create({
      name: req.body.name,
      courseId: req.body.courseId,
    });
    res.status(200).json({
      success: true,
      message: "this is to get all subjects details",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Subject.update(
      { name: req.body.name },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      success: true,
      message: "updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Subject.update(
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
