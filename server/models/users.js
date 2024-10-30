import  { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  minecraftName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isCracked: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

export default User;
