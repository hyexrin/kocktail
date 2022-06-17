// usersController
// 회원 정보 관리

const User = require("../models/user"),
  passport = require("passport"),
  getUserParams = body => {
    return {
      nick : body.nick,
      password : body.password,
      name : body.name,
      phone : body.phone
    };
  };

  module.exports = {

    // users 값 find()해서 불러오기
    index: (req, res, next) => {
      User.find()
        .then(users => {
          res.locals.users = users;
          next();
        })
        .catch(error => {
          console.log(`Error fetching users: ${error.message}`);
          next(error);
        });
    },

    // admin 페이지에서 회원 목록 조회 가능한 users 페이지로 이동
    userView: (req, res) => {
      res.render("admin/users");
    },
  
    // 회원가입(join) 페이지로 render
    join: (req, res) => {
      res.render("join");
    },
  
    // /join에서 회원가입 할 시, post 할 함수
    joined: (req, res, next) => {
      if (req.skip) next();
      let newUser = new User(getUserParams(req.body));
      User.register(newUser, req.body.password, (e, user) => {
        if (user) {
          req.flash("success", `${user.Name}'s account created successfully!`);
          res.locals.redirect = "/users";
          next();
        } else {
          req.flash("error", `Failed to create user account because: ${e.message}.`);
          res.locals.redirect = "/join";
          next();
        }
      });
    },
  
    // redirect할 페이지를 받아와 redirect 하는 함수
    redirectView: (req, res, next) => {
      let redirectPath = res.locals.redirect;
      if (redirectPath !== undefined) res.redirect(redirectPath);
      else next();
    },
  
    // myPage에 user 본인의 정보를 불러올 수 있도록 하는 함수
    myPage: (req, res, next) => {
      let userId = req.params.id;
      User.findById(userId)
        .then(user => {
          res.locals.user = user;
          next();
        })
        .catch(error => {
          console.log(` ${error.message}`);
          next(error);
        });
    },
  
    // login한 회원의 myPage 주소를 가리켜 줌
    // admin의 id와 같으면 admin으로 구분
    myPageView: (req, res) => {
      let userId = req.params.id;
      if (userId == "62aaf56a51b61d57a279d0a7" ){
        res.render("admin/index");
      } else {
      res.render("users/myPage" );
      }
    },

    // admin 이 users 정보를 수정하기 위한 함수
    edit: (req, res, next) => {
      let userId = req.params.id;
      User.findById(userId)
        .then(user => {
          res.render("users/edit", {
            user: user
          });
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
    },
  
    // admin이 edit에서 회원 정보를 수정한 것을 저장하기 위한 함수
    update: (req, res, next) => {
      let userId = req.params.id,
        userParams = getUserParams(req.body);
  
      User.findByIdAndUpdate(userId, {
        $set: userParams
      })
        .then(user => {
          res.locals.redirect = "/users";
          res.locals.user = user;
          next();
        })
        .catch(error => {
          console.log(`Error updating user by ID: ${error.message}`);
          next(error);
        });
    },
    
    // admin의 users 페이지에서 회원 삭제를 위한 함수
    delete: (req, res, next) => {
      let userId = req.params.id;
      User.findByIdAndRemove(userId)
        .then(() => {
          res.locals.redirect = "/users";
          next();
        })
        .catch(error => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next();
        });
    },
    login: (req, res) => {
      res.render("login");
    },

    // 회원가입(join)시, phone 번호가 중복일 경우, password가 null일 경우 회원가입을 막기 위한 함수
    validate: (req, res, next) => {
      req
        .check("phone", "phone number is invalid")
        .notEmpty()
        .isInt()
        .isLength({
          min: 11,
          max: 11
        })
        .equals(req.body.phone);
      req.check("password", "Password cannot be empty").notEmpty();
      req.getValidationResult().then(error => {
        if (!error.isEmpty()) {
          let messages = error.array().map(e => e.msg);
          req.skip = true;
          req.flash("error", messages.join(" and "));
          res.locals.redirect = "/join";
          next();
        } else {
          next();
        }
      });
    },

    // 로그인 실패 시, 띄울 문구와 redirect할 주소 설정 함수
    authenticate:  passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Failed to login."
    }),

    // 관리자 아이디("admin")을 구분하기 위한 함수
    adminFilter : (req, res) => {
      if (req.user.nick == "admin") {
        res.redirect('/admin/index');
      } else {
        res.redirect('/');
      }
    },

    // 로그인 후 로그아웃을 위한 함수
    logout: (req, res, next) => {
      req.logout();
      req.flash("success", "You have been logged out!");
      res.locals.redirect = "/";
      next();
    }
  };
  