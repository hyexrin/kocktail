const express = require("express"); // express 모듈 셋팅
const ejs = require("ejs"); // 페이지 로딩을 위해 필수
const app = express();

// view 엔진을 ejs를 쓰겠다는 설정
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// express-ejs-layouts 사용 설정
const layouts = require("express-ejs-layouts");
app.use(layouts);
app.set('layout', './layout'); // views/layout.ejs를 기본 레이아웃으로 설정, <%- body %> 부분에 html 문자열
app.set("layout extractScripts", true); // <%- script %> 부분에 script 문자열

// mongoose 사용 설정
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/user_db",{ useNewUrlParser: true }); // 여기서 user_db를 써도되는게 맞는지 모르겠음...
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


// 페이지 로딩 함수
app.get("/", function(req, res){
    //console.log(res);
    res.render("index", {}); // views 폴더 밑에 있는 파일을 참조함
});

app.get('/login', function(req, res){
    res.render("login", {});
});

app.get('/join', function(req, res){
    res.render("join", {});
});

// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(3000, function(){
    console.log("server running");
});

app.use(express.static('public'));