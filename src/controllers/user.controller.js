const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
const { compareSync, hashSync } = require('bcryptjs')

const userModel = require('../models/user.model');
const db = require('../../database/models');

const userController = {
  register: (req, res) => {
    const title = 'Registrar Usuario';
    db.Category.findAll().then(function (category) {
      res.render('./users/register', { title, category });
    })
  },

  processRegister: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render('./users/register', {
        errors: resultValidation.mapped(),
        oldData: req.body
      })
    }
    const userInBD = userModel.searchNaturalUserEmail(req.body.email);

    if (userInBD) {
      return res.render('./users/register', {
        errors: {
          email: {
            msg: 'este correo ya esta registrado'
          }
        },
        oldData: req.body
      })
    }
    const userToCreate = {
      ...req.body,
      password: hashSync(req.body.password, 10),
      avatar: req.file.filename
    }
    userModel.createNaturalUsers(userToCreate);
    res.redirect('/login');

  },

  login: (req, res) => {
    const error = false;
    const title = 'Iniciar Sesión';
    db.Category.findAll().then(function (category) {
      res.render('./users/login', { error, title, category });
    })
  },

  loginUser: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render('./users/login', {
        errors: resultValidation.mapped(),
        oldData: req.body
      })
    }

    // const userToLogin = userModel.searchNaturalUserEmail(req.body.email);
    const userToLogin = db.User.findByPk(req.body.id);
    console.log(`Aquí estamos revisando userToLogin: ${ userToLogin }`);

    /*if (userToLogin) {
      const comparePasswordUser = compareSync(req.body.password, userToLogin.password);
      if (comparePasswordUser) {
        req.session.userLogged = userToLogin
        return res.redirect("/admin");
      }
      return res.render('./users/login', {
        errors: { email: { msg: 'las credenciales no son correctas' }}
      })
    }*/
    return res.render('./users/login', {
      errors: { email: { msg: 'no se encontró el correo registrado' }}
    })
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  }
}
module.exports = userController;






