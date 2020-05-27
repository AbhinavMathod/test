module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING
    }, {});
    User.beforeSave((user, options) => {
      if (User.changed('password')) {
        User.password = bcrypt.hashSync(User.password, bcrypt.genSaltSync(10), null);
      }
    });
    User.prototype.comparePassword = function (passw, cb) {
      bcrypt.compare(passw, this.password, function (err, isMatch) {
          if (err) {
              return cb(err);
          }
          cb(null, isMatch);
      });
    };
    User.associate = function(models) {
      // associations can be defined here
    };
    return User;
  };