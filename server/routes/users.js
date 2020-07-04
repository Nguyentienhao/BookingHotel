const router = require('express').Router();
const passport = require('passport');
const multer = require('multer');
const userController = require('../controller/users');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {    
    callback(null, './uploads');    
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

const upload = multer({ 
  storage: storage, 
  limits: {
    fieldSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.route('/updateInfoUser/:userId')
    .put((req, res, next) => {
        userController.updateInfoUser(req, res, next);
    })

router.route('/updateImageUser/:userId')
    .put(upload.single('imageData'), (req, res, next) => {
        userController.updateImageUser(req, res, next);
    });

router.route("/register")
    .post((req, res, next) => {
      userController.registerUser(req, res, next);
    });
   

router.route('/login')
  .post((req, res, next) => {  
    userController.loginUser(req, res, next);    
  });

router.route('/')
  .get(passport.authenticate('jwt', { session: false }),(req, res, next)=> {
    userController.getAllUser(req, res, next);
  });

module.exports = router;
