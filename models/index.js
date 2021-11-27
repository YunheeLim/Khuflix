var mongoose = require('mongoose');

//사용자 스키마
var UserSchema = new mongoose.Schema({
    name: {type: String, required: false},
    id: {type: String, required: true, unique: true},
    pw: {type: String, required: false}, //false인 이유: 소셜로그인시 비밀번호 필요없음
    history:[{title:String, episode:Number}]
});

//동영상 스키마
var VideoSchema = new mongoose.Schema({
    title: String,
    src: String,
    content: String,
    cast: String,
    feature: String,
    genre: String,
    ost: [{song: String, singer: String, ost_src: String}],
    episode: [{time: Number, epi_content: String, epi_src: String}],
    type: String //유튜브 동영상인지 오리지날 동영상인지
});

exports.Users = mongoose.model('users', UserSchema);
exports.Videos = mongoose.model('videos', VideoSchema);