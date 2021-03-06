var UserModel = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

    /**
     * UserController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, Users) {
            if (err) {
                return res.json({
                    message: 'Error when getting User.',
                    error: err
                });
            }
            return res.json(Users);
        });
    },

    /**
     * UserController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, User) {
            if (err) {
                return res.json({
                    message: 'Error when getting User.',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }
            return res.json(User);
        });
    },

    /**
     * UserController.create()
     */
    create: function (req, res) {
        if(req.body.password.length > 8 && req.body.password.length < 16) {
          var User = new UserModel({
    			email : req.body.email,
    			username : req.body.username,
    			password : bcrypt.hashSync(req.body.password, saltRounds)
                });
          User.save(function (err, User) {
              if (err) {
                  return res.json({
                      message: 'Invalid username & email',
                      error: err
                  });
              }
              return res.status(201).json(User);
          });
        } else {
          return res.json({
              message: 'Password must be within 8 to 16 characters'
          });
        }
    },

    /**
     * UserController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, User) {
            if (err) {
                return res.json({
                    message: 'Error when getting User',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            User.email = req.body.email ? req.body.email : User.email;			User.username = req.body.username ? req.body.username : User.username;			User.password = req.body.password ? req.body.password : User.password;
            User.save(function (err, User) {
                if (err) {
                    return res.json({
                        message: 'Error when updating User.',
                        error: err
                    });
                }

                return res.json(User);
            });
        });
    },

    /**
     * UserController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        UserModel.findByIdAndRemove(id, function (err, User) {
            if (err) {
                return res.json({
                    message: 'Error when deleting the User.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
