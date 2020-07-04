
const UserModel = require('../models/users');
var fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { use } = require('passport');

exports.updateInfoUser = function (req, res, next) {
    let id = req.params.userId;

    UserModel.findById(id, function(err, doc) {
      if (err) {
        console.log(err);
      }

      doc.nameSchool = req.body.nameSchool;
      doc.hometown = req.body.homeTown;
      doc.birthDay = req.body.birthDay;

      doc.save();
    })   
}

exports.updateImageUser = function (req, res, next) {
    let id = req.params.userId;

    UserModel.findById(id, function(err, doc) {

    if (err) { 
        console.log(err) 
    }

    // var data = fs.readFileSync(req.file.path);
    // const img = cv.imdecode(data);
    // var resizeImage = img.resize(150, 150);
    // const outBase64 = cv.imencode('.png', resizeImage);
    // var resultImage = Buffer(outBase64, 'base64').toString('base64');    

    // doc.imageUser.data = resultImage;

    // doc.imageUser.contentType = req.file.mimetype;

    // doc.save()
        // .then(result => {
        //   res.status(200).json({
        //       success: true,
        //       document: outBase64
        //   })
        // })
        // .catch(err => console.log(err))
    })
}

exports.registerUser = function (req, res, next) {
    UserModel.findOne({ email: req.body.email })
          .then(user => {
            bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(req.body.password, salt, function (err, hash) {

                const newUser = new UserModel({
                  email: req.body.email,
                  password: hash,
                  confirm_password: hash,
                  phone_number: req.body.phone_number,
                });
                
                newUser.save()
                  .then(newUser => res.json(newUser))
                  .catch(err => console.log(err))
              })
            })
          })
          .catch(err => console.log(err))
}

exports.loginUser = function (req, res, next) {
    UserModel.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          console.log('user', req.body.password);

          bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                  if (isMatch) {
                    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' }, function (err, token) {
                      return res.json({
                        success: true,
                        token: token
                      })
                    })
                  } else {
                    return res.status(404).json({err: "lỗi hệ thống"});
                  }
                })
        } else {
          return res.status(404).json({err: "errrr"})
        }
      })
}

exports.getAllUser = function (req, res, next) {
    res.json({
        _id: req.user._id,
        email: req.user.email,  
        fullName: req.user.fullName,
        numberPhone: req.user.numberPhone,
        imageUser: req.user.imageUser,
        nameSchool: req.user.nameSchool,
        hometown: req.user.hometown,
        birthDay: req.user.birthDay
      })
}