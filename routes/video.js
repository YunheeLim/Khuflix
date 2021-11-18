var express = require('express');
var router = express.Router();
var model = require('../models');
var Videos = model.Videos;

router.get('/search', function(req, res){
    res.render('video/search_page',{result:null});
})

router.post('/search', function(req, res){
    var keyword = req.body.keyword;
    console.log('keyword:' + keyword);
    if(keyword =='') res.render('video/search_page', {result:false});
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

module.exports = router;