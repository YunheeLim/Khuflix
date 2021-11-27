var express = require('express');
var router = express.Router();
var model = require('../models');
var Users = model.Users;
var Videos = model.Videos;
var target_video; //재생하려는 비디오

//search_page 렌더링
router.get('/search', function(req, res){
    res.render('video/search_page',{result:null}); //result값: ejs(html)파일에 전달
})

//동영상 검색
router.post('/search', function(req, res){
    var keyword = req.body.keyword;
   // console.log('keyword:' + keyword);
    if(keyword =='') res.render('video/search_page', {result:false}); //검색어 없이 검색했을 경우
    else{
    Videos.findOne({title:keyword}, (err, video)=>{
        if (err) res.status(500).send('검색 에러');
        else if (video){ //정확히 찾는 동영상이 있을 경우
            res.render('video/search_page', {result:'true_for_title', video:video});
        }
        else if(!video){ //제목으로 나오지 않을 경우 내용과 출연진으로 검색
            Videos.find({$or: [{content: {$regex: keyword, $options: 'i'}}, {cast: {$regex: keyword, $options: 'i'}}]}, (err, videos)=>{
                if(videos.length != 0){
                   res.render('video/search_page', {result:'true_for_contents', result_videos:videos})
                }else { //내용과 출연진 검색으로도 나오지 않을 경우
                    result = false;
                    res.render('video/search_page', {result:false});
                }
            });
        }
    });}
});

//상세페이지
router.get('/detail/:video_title', function(req, res){
    var video_title = req.params.video_title;
    Videos.findOne({title:video_title},(err,video)=>{
        if(err) res.send('동영상 찾기 에러');
        target_video = video._doc;
        res.render('video/detail_page', {target_video:target_video});
     });    
});

//재생페이지
router.get('/streaming/:video_title/:episode', function(req, res){

    var title = req.params.video_title;
    var episode = req.params.episode;

    //사용자의 시청기록에서 현재 재생중인 동영상 검색
    Users.findOne({id:req.session.userId, 'history.title':title, 'history.episode':episode},(err,user)=>{
        if(!user){ //시청기록에 없으면 추가
            Users.findOneAndUpdate({id:req.session.userId},{$push : {history:{title:title,episode:episode}}}).exec();
        }
    });

    Videos.findOne({title:title},(err,target_video)=>{ //동영상 타입 가져오기
        if(err) res.send('동영상 찾기 에러');
        else if(!target_video) res.send('삭제된 동영상입니다.');
        else{
            if(target_video.type=='original'){
                res.render('video/original_player_page',{title:title});
            }else if(target_video.type=='youtube'){
                var epi_src = target_video.episode[episode-1].epi_src; //동영상 에피소드 유튜브링크 가져오기
                res.render('video/youtube_player_page', {epi_src:epi_src});
            }
        }
    }); 
});

module.exports = router;