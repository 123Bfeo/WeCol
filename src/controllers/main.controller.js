const db = require('../../database/models');

const mainController = {
<<<<<<< HEAD

  index: async (req, res) => {

    const products = productModel.read();
    const title = 'Home';
    /*let data = {
      categorias: null,
      productos: null
    }

    data.categorias = await db.Category.findAll()

    data.productos = await db.Product.findAll()

    console.log('=================================================================', data);
    res.render('index', { data, products })*/
    let reqCategory = db.Category.findAll();
    let reqProduct = db.Product.findAll();

    Promise.all([reqCategory, reqProduct]).then(function ([category, product]) {
      res.render('index', { category, product, title, products })
    })
=======
  index: (req, res) => {
    const title = 'Home';
    const reqCategory = db.Category.findAll();
    const reqProduct = db.Product.findAll();
  
    Promise.all([reqCategory, reqProduct])
      .then(([category, product]) => {
        res.render('index', { title, category, product })
      })
>>>>>>> d94c57af963923b458f2c95a2bbe9d732b9ad648
  },

  aboutUs: (req, res) => {
    const title = 'Detalle de producto';
    db.Category.findAll().then(function (category) {
      res.render('aboutUs', { title, category });
    });
  },
  contact: (req, res) => {
    const title = 'Contacto';
    res.render('contact', { title });
  },
  privacyPolitics: (req, res) => {
    const title = 'Política de Privacidad';
    res.render('privacyPolitics', { title });
  },
  agreePolitics: (req, res) => {
    const title = 'Políticas';
    res.render('agreePolitics', { title });
  },
  adminCreate: (req, res) => {
    const title = 'Administrador Productos';
    const products = productModel.read();
    res.render('./admin/adminCreate', { products, title });
  },
};

module.exports = mainController;



