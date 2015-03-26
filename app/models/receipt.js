module.exports = function (sequelize, DataTypes){

  var Receipt = sequelize.define("Receipt", {
    payee: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: true
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
      get: function() {
        var note = this.getDataValue('note');
        if (note === null) {
          return null;
        }
        return note.replace(/\\r\\n/g, '\r\n');
      },
      set: function(v) {
        this.setDataValue('note', v.replace(/\r\n/g, '\\r\\n'));
      }
    }
  }, {
    classMethods: {
      associate: function (models){
        Receipt.belongsTo(models.Property);
        Receipt.belongsTo(models.PropertyReport);
      }
    }
  });

  return Receipt;

};