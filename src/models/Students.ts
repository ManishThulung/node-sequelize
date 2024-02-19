import { DataTypes } from "sequelize";
import { sequelize } from "../db/index";
import Course from "./Courses";

const Student = sequelize.define("student", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  fullName: {
    type: DataTypes.STRING,
  },

  age: {
    type: DataTypes.INTEGER,
  },

  deletedAt: {
    type: DataTypes.DATE,
  },

  courseId: {
    type: DataTypes.INTEGER,
  },
});

Course.hasMany(Student);
Student.belongsTo(Course, {
  foreignKey: "courseId",
  as: "courses",
});

Student.sync({ alter: true }).then(() => {
  console.log("Student Model synced");
});

export default Student;
