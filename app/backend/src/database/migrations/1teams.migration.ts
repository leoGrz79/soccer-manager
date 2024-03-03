import { Model, QueryInterface, DataTypes } from 'sequelize';
import ITeams from '../../Interfaces/ITeams';
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
    return queryInterface.createTable<Model<ITeams>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name',     // Thank you, linter!
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};
