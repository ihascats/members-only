const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Message = require('../models/Message');
const passport = require('passport');
const { check, validationResult } = require('express-validator');

exports.signupValidate = [
  check('first_name')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters')
    .trim()
    .escape(),
  check('last_name')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters')
    .trim()
    .escape(),
  check('username')
    .isLength({ min: 2 })
    .withMessage('Username must be at least 2 characters')
    .isLength({ max: 20 })
    .withMessage('Username must be at most 20 characters')
    .trim()
    .escape(),
  check('email', 'Must be a valid email')
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .matches('[0-9]')
    .withMessage('Password Must Contain a Number')
    .matches('[a-z]')
    .withMessage('Password Must Contain a Lowercase Letter')
    .matches('[A-Z]')
    .withMessage('Password Must Contain an Uppercase Letter')
    .matches(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
    .withMessage('Password Must Contain a Special Character')
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.confirm_password) {
        // trow error if passwords do not match
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    })
    .trim()
    .escape(),
];

exports.message_validate = [check('msg').trim().escape()];

exports.profile_change_validate = [
  check('first_name')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters')
    .trim()
    .escape(),
  check('last_name')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters')
    .trim()
    .escape(),
  check('username')
    .isLength({ min: 2 })
    .withMessage('Username must be at least 2 characters')
    .isLength({ max: 20 })
    .withMessage('Username must be at most 20 characters')
    .trim()
    .escape(),
];

exports.get_sign_up = (req, res) => {
  res.render('sign-up');
};

exports.get_log_in = (req, res) => {
  res.render('log-in');
};

exports.post_sign_up = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array().map((obj) => obj.msg);
      return res.status(422).json({ errors: errorsArray });
    } else {
      await bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
        if (error) {
          return next(error);
        }
        new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        }).save((error) => {
          if (error) {
            return next(error);
          }
          res.redirect('/log-in');
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.post_log_in = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
  failureFlash: true,
});

exports.get_log_out = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

exports.logged_in_access = (req, res, next) => {
  if (res.locals.currentUser) {
    res.redirect('/');
  } else {
    next();
  }
};

exports.limited_access = (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect('/');
  } else {
    next();
  }
};

exports.post_new_message = async (req, res, next) => {
  try {
    const newMessage = new Message({
      content: req.body.msg,
      author: res.locals.currentUser._id,
    });
    newMessage.save(async (error) => {
      if (error) {
        return next(error);
      } else {
        await User.findByIdAndUpdate(res.locals.currentUser._id, {
          $push: { messages: newMessage._id },
        });
        res.redirect('/');
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.get_index = async (req, res, next) => {
  res.render('index', {
    userMessages: await Message.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 }),
  });
};

exports.message_delete = async (req, res, next) => {
  try {
    const delMessage = await Message.findById(req.params.id);
    await User.findByIdAndUpdate(
      { _id: delMessage.author },
      { $pull: { messages: req.params.id } },
      async (error, obj) => {
        if (error) console.log(error);
        else {
          await Message.findByIdAndRemove(req.params.id);
          res.redirect('/');
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
};

exports.get_user = async (req, res, next) => {
  try {
    const userProfile = await User.findById(req.params.id).populate('messages');
    if (userProfile) {
      res.render('user', { profile: userProfile });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.log(1, error);
  }
};

exports.message_edit = (req, res, next) => {
  Message.findByIdAndUpdate(req.params.id, {
    content: req.body.msg,
  }).then(() => {
    res.redirect('/');
  });
};

exports.profile_edit = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
  }).then(() => {
    res.redirect(`/user-${req.params.id}`);
  });
};
