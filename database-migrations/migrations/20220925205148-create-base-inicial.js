'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.sequelize.transaction(() => {
      return Promise.all([
        queryInterface.createTable('previlegies_users', {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
          description: {
            type: Sequelize.DataTypes.STRING(20),
            allowNull: false,
          },
          force: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          }
        }),




        queryInterface.createTable('users', {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: Sequelize.DataTypes.STRING(70),
            allowNull: false,
            validate: {
              notEmpty: true
            }
          },
          userName: {
            type: Sequelize.DataTypes.STRING(70),
            allowNull: false,
            unique: true,
            validate: {
              notEmpty: true
            }
          },
          password: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            validate: {
              notEmpty: true
            }
          },
          phonenumber: {
            type: Sequelize.DataTypes.STRING(20),
            allowNull: false,
            unique: true
          },
          email: {
            type: Sequelize.DataTypes.STRING(70),
            allowNull: false,
            unique: true
          },
          idPrevilegies: {
            allowNull: false,
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 1,
            references: {
              model: 'previlegies_users',
              key: 'id'
            }
          }
        }),


        queryInterface.createTable('trainings',
          {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true,
            },
            title: {
              type: Sequelize.DataTypes.STRING(70),
              allowNull: false,
              validate: {
                notEmpty: true
              }
            },
            description: {
              type: Sequelize.DataTypes.STRING(70),
              allowNull: false,
              defaultValue: ''
            },
            userId: {
              allowNull: false,
              type: Sequelize.DataTypes.INTEGER,
              references: {
                model: 'users',
                key: 'id'
              }
            }
          }),



          
          
          queryInterface.createTable('weights',
          {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true,
            },
            weight: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              validate: {
                notEmpty: true
              }
            }
          }),
          
          
          queryInterface.createTable('exercices',
            {
              id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
              },
              description: {
                type: Sequelize.DataTypes.STRING(70),
                allowNull: false,
                validate: {
                  notEmpty: true
                }
              },
              weightId: {
                allowNull: false,
                type: Sequelize.DataTypes.INTEGER,
                references: {
                  model: 'weights',
                  key: 'id'
                }
              },
              trainingId: {
                allowNull: false,
                type: Sequelize.DataTypes.INTEGER,
                references: {
                  model: 'trainings',
                  key: 'id'
                }
              }
            }),
          
        queryInterface.createTable('history_users',
          {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true,
            },
            id_user: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false
            },
            name_user: {
              type: Sequelize.DataTypes.STRING(70),
              allowNull: false
            },
            id_training: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false
            },
            training_name: {
              type: Sequelize.DataTypes.STRING(70),
              allowNull: false
            },
            id_exercice: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false
            },
            exercice_name: {
              type: Sequelize.DataTypes.STRING(70),
              allowNull: false
            },
            id_pound: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false
            },
            pound: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false
            },
            dateInsert: {
              type: Sequelize.DataTypes.DATE,
              allowNull: false
            },
          })
        ]);
    });

  },

  async down(queryInterface, Sequelize) {

    return queryInterface.sequelize.transaction(() => {
      return Promise.all([
        queryInterface.dropTable('previlegies_users', { force: true }),
        queryInterface.dropTable('trainings', { force: true }),
        queryInterface.dropTable('weights', { force: true }),
        queryInterface.dropTable('exercices', { force: true }),
        queryInterface.dropTable('history_users'),
        queryInterface.dropTable('users',{ force: true })
      ]);
    });
  }
}