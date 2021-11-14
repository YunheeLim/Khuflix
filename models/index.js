var mongoose = require('mongoose');

//사용자 스키마
var UserSchema = new mongoose.Schema({
    name: {type: String, required: false}, //false인 이유: 네이버 로그인 시 사용자 이름을 가져오지 못하는 issue 때문
    id: {type: String, required: true, unique: true},
    pw: {type: String, required: false} //false인 이유: 소셜로그인시 비밀번호 필요없음
});

//동영상 스키마(미완성)
var VideoSchema = new mongoose.Schema({
    title: {type: String},
    content: {type: String},
    cast:{type: String},
    genre:{type:String},
    feature:{type:String},
    episode: {type:Number},
    ost:{type:String}
})

exports.Users = mongoose.model('users', UserSchema);
exports.Videos = mongoose.model('videos', VideoSchema);