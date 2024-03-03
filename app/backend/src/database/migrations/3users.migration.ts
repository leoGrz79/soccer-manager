import { Model, QueryInterface, DataTypes } from 'sequelize';
import IUser from '../../Interfaces/IUser';
// import IExample from '../../Interfaces/Example';

// export default {
//   up(queryInterface: QueryInterface) {
//     return queryInterface.createTable<Model<IExample>>('trybe_eval', {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//     });
//   },
//   down(queryInterface: QueryInterface) {
//     return queryInterface.dropTable('trybe_eval');
//   },
// };

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUser>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};