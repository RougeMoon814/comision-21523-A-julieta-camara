import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("db_task", "root", "", {
  host: "localhost",
  dialect: "mysql",
  database: 'db_task',
  port: 3307
});

export const startDb = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
