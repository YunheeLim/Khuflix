var express = require('express');
var router = express.Router();
var model = require('../models');
var Videos = model.Videos;
var target_video; //재생하려는 비디오

//search_page 렌더링
router.get('/search', function(req, res){
    res.render('video/search_page',{result:null}); //result값: ejs(html)파일에 전달
})

//동영상 검색
router.post('/search', function(req, res){
    var keyword = req.body.keyword;
    console.log('keyword:' + keyword);
    if(keyword =='') res.render('video/search_page', {result:false}); //검색어 없이 검색했을 경우
    else{
    Videos.findOne({title:keyword}, (err, video)=>{
        if (err) res.status(500).send('검색 에러');
        else if (video){ //정확히 찾는 동영상이 있을 경우
            console.log(video.cast);
            res.send(video);
            //res.render('video/search_page', {result:true});
        }
        else if(!video){ //제목으로 나오지 않을 경우 내용과 출연진으로 검색
            Videos.find({$or: [{content: {$regex: keyword, $options: 'i'}}, {cast: {$regex: keyword, $options: 'i'}}]}, (err, videos)=>{
                if(videos.length != 0){
                    res.send(videos);
                }else { //내용과 출연진 검색으로도 나오지 않을 경우
                    result = false;
                    res.render('video/search_page', {result:false});
                }
            });
        }
    });}
});

//test data
Videos.findOne({title:'연모'},(err,video)=>{
   console.log(video._doc);
    target_video = video._doc;
});

//상세페이지
router.get('/detail', function(req, res){
    console.log(target_video);
    res.render('video/detail_page', {target_video:target_video});
});

/*
router.get('/detail_test', function(req, res){
    res.render('video/detail_page_test');
});*/


module.exports = router;