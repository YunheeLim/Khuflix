var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var kakaoStrategy = require('passport-kakao').Strategy;
var naverStrategy = require('passport-naver').Strategy;
var config = require('../config/secret');
var model = require('../models');

var Users = model.Users;

router.get('/',(req, res)=>{
    res.send('메인페이지');
});

//회원가입
router.post('/signup', function(req, res, next){
    var new_user = new Users(req.body);
    new_user.save(function(err){
        if(err) return res.status(500).send('회원가입 에러');
        else return res.status(200).send('회원가입 완료');
    });
});

//로그인
var userId;
router.post('/login', function(req,res) {
	Users.findOne({ id: req.body.id, password: req.body.password }, (err, user) => {
		if (err) return res.status(500).send('로그인 에러');
		else if (user){
            req.session.is_logined = true;
            req.session.save((err)=>{if(err) console.log("세션 저장 실패")});
            userId = req.body.id;
            res.redirect('/');
        } 
		else return res.status(404).send('로그인 실패');
	});
});

//카카오 로그인 및 회원가입
passport.use('kakao-login', new kakaoStrategy({ 
    clientID: config.kakao.clientID, 
    callbackURL: config.kakao.callbackURL, 
}, async (accessToken, refreshToken, profile, done) => { 
   Users.findOne({ id : profile.id}, (err,user)=>{
       if(err) return res.status(500).send('카카오 로그인 에러');
       else if(user) return done(null, user);
       else{
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
    failureRedirect: '/', 
}), (req, res) => { res.redirect('/'); 
});
passport.serializeUser(function(user, done) { 
    done(null, user);
});

passport.deserializeUser(function(req, user, done) { 
    req.session.is_logined = true; 
    console.log("Session Check :" +req.session.is_logined); 
    done(null, user); 
});

//네이버 로그인 및 회원가입
passport.use('naver-login', new naverStrategy({ 
    clientID: config.naver.clientID, 
    clientSecret: config.naver.clientSecret,
    callbackURL: config.naver.callbackURL, 
}, async (accessToken, refreshToken, profile, done) => { 
    //console.log(profile);
   Users.findOne({ id : profile.id}, (err,user)=>{
       if(err) return res.status(500).send('네이버 로그인 에러');
       else if(user) return done(null, user);
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

router.get('/naverLogin', passport.authenticate('naver-login')); 
router.get('/auth/naver/callback', passport.authenticate('naver-login', {
    failureRedirect: '/', 
}), (req, res) => { res.redirect('/'); 
});

//로그아웃
router.get('/logout', function(req, res){
    if(req.session.is_logined){
        req.session.is_logined = false;
        return res.status(200).send('로그아웃');
    }else{
        return res.status(404).send('로그인 해주세요');
    }
});

//회원탈퇴
router.delete('/remove', function(req, res){
    if(req.session.is_logined){
        Users.remove({id: userId}, function(err, removed){
            if(err){
                return res.status(500).send('탈퇴 에러');
            }else{
                req.session.destroy((err)=>{
                    if(err) throw err;
                    return res.status(200).send('탈퇴 완료');
                })
            }
        })
    }
});

module.exports = router;
