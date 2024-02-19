import { DataTypes } from "sequelize";
import { sequelize } from "../db/index";
import Course from "./Courses";

const Subject = sequelize.define("subject", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
  },

  deletedAt: {
    type: DataTypes.DATE,
  },

  courseId: {
    type: DataTypes.INTEGER,
  },
});

Course.hasMany(Subject);
Subject.belongsTo(Course, {
  foreignKey: "courseId",
  as: "courses",
});

Subject.sync({ alter: true }).then(() => {
  console.log("Subject Model synced");
});

export default Subject;
