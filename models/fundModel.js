const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
    const Fund = sequelize.define('Fund', {
        type:{
            type:Sequelize.ENUM('INCOME','EXPENDITURE', 'FUND_TRANSFER'),
            allowNull: false,
            validate: {
                isIn: {
                    args: [['INCOME', 'EXPENDITURE', 'FUND_TRANSFER']],
                    message: "Must be INCOME, EXPENDITURE or FUND_TRANSFER "
                  }
            }
        },
        content:{
            type:DataTypes.STRING,
            allowNull: false
        },
        tag:{
            type:Sequelize.ENUM('DEPOSIT','ADVANCE_PAYMENTS', 'REMITTER', 'REMITTEE'),
            allowNull: false,
            validate: {
                isIn: {
                    args: [['DEPOSIT', 'ADVANCE_PAYMENTS', 'REMITTER', 'REMITTEE']],
                    message: "Must be DEPOSIT, ADVANCE_PAYMENTS, REMITTER  or REMITTEE "
                  }
            }
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull: true,
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull: true,
        },
        sum:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        date:{
            type:DataTypes.STRING,
            allowNull: false
          
        },
        recorderName:{
            type:DataTypes.STRING,
            allowNull: true
        },
        note:{
            type:DataTypes.STRING,
            allowNull: true
        },
        reviewStatus:{
            type:Sequelize.ENUM('UNDER_REVIEW','ACCEPTED', 'REJECTED'),
            allowNull: true,
            validate: {
                isIn: {
                    args: [['UNDER_REVIEW', 'ACCEPTED', 'REJECTED']],
                    message: "Must be UNDER_REVIEW, ACCEPTED or REJECTED "
                  }
            }
        }

    },{
        paranoid: true,
    });

    return Fund;
};

