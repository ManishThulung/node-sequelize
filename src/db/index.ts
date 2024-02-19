import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "node-sequelize",
  "postgres",
  "password",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
