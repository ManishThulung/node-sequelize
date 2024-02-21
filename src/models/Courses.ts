import { DataTypes } from "sequelize";
import { sequelize } from "../db/index";
import Subject from "./Subjects";

const Course = sequelize.define("course", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },

  name: {
    type: DataTypes.STRING,
  },

  deletedAt: {
    type: DataTypes.DATE,
  },
});

Course.sync({ alter: true }).then(() => {
  console.log("course Model synced");
});

export default Course;
