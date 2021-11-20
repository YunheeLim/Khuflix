var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var kakaoStrategy = require('passport-kakao').Strategy;
var naverStrategy = require('passport-naver').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var config = require('../config/secret');
var model = require('../models');//사용자 모델 스키마 가져오기
var Users = model.Users; //사용자 객체 생성을 위한 오브젝트 생성
var remember_Id; //입력받은 id(이메일)를 ejs(html)파일의 placeholder로 사용하기 위함

//첫페이지
//first_page 렌더링
router.get('/first', function(req, res){
    res.render('login/first_page');
})
// 이메일 주소(전화번호) 데이터 저장
router.post('/first', function(req, res){
    remember_Id = req.body.id;
    Users.findOne({ id: req.body.id}, (err, user) =>{
        if(user) res.redirect('/login'); //회원일 경우 로그인 페이지로
        else res.redirect('/signup'); //회원이 아닐 경우 회원가입 페이지로
    });  
});

//메인페이지
router.get('/main', function(req, res){
    res.render('login/main_page');
});

//회원가입
//signup_page 렌더링
router.get('/signup', function(req, res){
    res.render('login/signup_page', {remember_Id:remember_Id});
})

//아이디,비밀번호 데이터 저장
router.post('/signup', function(req, res){
    remember_Id = req.body.id;
    var userId = req.body.id;
    var userName = userId.split('@')[0]; //이메일 앞부분을 사용자 이름으로 지정
    var userPw = req.body.pw;
    console.log(userId, userName, userPw);
    var new_user = new Users({name:userName,id:userId,pw:userPw}); //새로운 회원 저장을 위한 객체생성
    new_user.save(function(err){ //새로운 회원 데이터베이스에 저장
        if(err) res.status(500).send('회원가입 에러');
        else res.redirect('/login'); //회원가입 성공시 로그인페이지로
    });
});

//일반 로그인
//login_page 렌더링
router.get('/login',function(req, res){
    res.render('login/login_page', {remember_Id:remember_Id}); //first_page에서 입력받은 id(email)를 login_page에 전달
})

//아이디, 비밀번호 데이터 받아서 일치하는지 체크
router.post('/login', function(req,res) {
    if(req.body.id == null) res.send('아이디를 입력해주세요');
	Users.findOne({ id: req.body.id}, (err, user) => { //회원인지 확인
		if (err) res.status(500).send('로그인 에러');
		else if (user){ //회원일 경우
            Users.findOne({ id: req.body.id, pw: req.body.pw }, (err,user)=>{
                if(user){ //비밀번호가 올바를 경우
                    req.session.is_logined = true;
                    req.session.userId = req.body.id;
                    req.session.userName = req.body.name;
                    req.session.save((err)=>{if(err) console.log("세션 저장 실패")}); //일반 로그인 세션저장
                    res.redirect('/main'); //메인페이지로
                }else{ //비밀번호가 틀렸을 경우
                    res.redirect('/loginFail'); //로그인 실패 페이지로
                }
            });
        } 
		else { //아이디가 틀렸을 경우 또는 회원이 아닐 경우 로그인 실패 페이지로
            res.redirect('/loginFail');
        }
	});
});

//로그인 실패
router.get('/loginFail', function(req, res){
    res.render('login/login_fail_page');
});


//카카오 회원가입 및 로그인
passport.use('kakao-login', new kakaoStrategy({ 
    clientID: config.kakao.clientID, 
    callbackURL: config.kakao.callbackURL, 
}, async (accessToken, refreshToken, profile, done) => { 
    console.log(profile);
    Users.findOne({ id : profile.id}, (err,user)=>{
       if(err) res.status(500).send('카카오 로그인 에러');
       else if(user) { //이미 회원일 경우
            return done(null, user);
    }
       else{ //회원이 아닐 경우 데이터베이스에 저장
           var new_user = new Users({
               id: profile.id,
               name: profile.username
           });
           new_user.save((user)=>{
               return done(null, user);
           });
       }
   });
}));

router.get('/kakaoLogin', passport.authenticate('kakao-login')); 
router.get('/auth/kakao/callback', passport.authenticate('kakao-login', {
    failureRedirect: '/login', // 회원가입이라면 다시 로그인페이지로
}), (req, res) => { res.redirect('/main'); // 이미 회원이라면 메인페이지로
});

//네이버 회원가입 및 로그인
passport.use('naver-login', new naverStrategy({ 
    clientID: config.naver.clientID, 
    clientSecret: config.naver.clientSecret,
    callbackURL: config.naver.callbackURL, 
}, async (accessToken, refreshToken, profile, done) => { 
    //console.log(profile);
    var userName = profile.emails[0].value.split('@')[0];
    Users.findOne({ id : profile.emails[0].value}, (err,user)=>{
       if(err) res.status(500).send('네이버 로그인 에러');
       else if(user) {
            return done(null, user);
        }
       else{
           var new_user = new Users({
               id: profile.emails[0].value,
               name: userName 
           });
           new_user.save((user)=>{
               return done(null, user);
           });
       }
   });
}));

router.get('/naverLogin', passport.authenticate('naver-login')); 
router.get('/auth/naver/callback', passport.authenticate('naver-login', {
    failureRedirect: '/login', 
}), (req, res) => { res.redirect('/main'); 
});

//페이스북 회원가입 및 로그인
passport.use('facebook-login', new facebookStrategy({ 
    clientID: config.facebook.clientID, 
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
}, async (accessToken, refreshToken, profile, done) => { 
    Users.findOne({ id : profile.id}, (err,user)=>{
       if(err) res.status(500).send('페이스북 로그인 에러');
       else if(user) {
            return done(null, user);
        }
       else{
           var new_user = new Users({
               id: profile.id,
               name: profile.displayName
           });
           new_user.save((user)=>{
               return done(null, user);
           });
       }
   });

}));

router.get('/facebookLogin', passport.authenticate('facebook-login')); 
router.get('/auth/facebook/callback', passport.authenticate('facebook-login', {
    failureRedirect: '/login', 
}), (req, res) => { res.redirect('/main'); 
});

//소셜로그인 세션 저장
passport.serializeUser(function(user, done) { 
    done(null, user);
    //console.log(user);
});

passport.deserializeUser(function(req, user, done) { 
    req.session.is_logined = true;
    req.session.userId = user.id;
    req.session.userName= user.name;
	//console.log("Session Check :" +req.session.userId, req.session.userName);
    done(null, user); 
});

//로그아웃
router.get('/logout', function(req, res){
    if(req.session.is_logined){
        req.session.destroy((err)=>{ //세션제거
            if(err) throw err;
            res.redirect('/first'); //로그아웃 성공 시 첫페이지로
        })
    }else{//로그아웃 실패
        res.status(404).send('로그인 해주세요');
    }
});

//회원탈퇴
router.delete('/remove', function(req, res){
    if(req.session.is_logined){
        Users.remove({id: userId}, function(err, removed){
            if(err){
                res.status(500).send('탈퇴 에러');
            }else{
                req.session.destroy((err)=>{ //세션제거
                    if(err) throw err;
                    res.redirect('/first'); //탈퇴완료 시 첫페이지로
                })
            }
        })
    }else res.send('로그인 해주세요');
});

module.exports = router;
