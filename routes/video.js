var express = require('express');
var router = express.Router();
var model = require('../models');
var Videos = model.Videos;

//(미완성)
router.post('/search', function(req, res){
    var keyWord = req.body.keyWord;
    Videos.findOne({$or: [ //동영상 제목 또는 내용, 출연진으로 검색
        {title: keyWord},
        {content: keyWord},
        {cast: keyWord}
        ]},(err, video)=>{
        if (err) res.status(500).send('검색 에러');
		else if (video){ //관련 동영상이 있을 경우
            //정확히 찾는 동영상이 있을 경우
            if(video.title == keyWord) {
                res.redirect('/result');
            }
            //찾는 동영상은 없지만 내용 또는 출연진이 일치하는 다른 동영상이 있을 경우
            else if(video.content ==keyWord || video.cast == keyWord){}
        } 
		else { //관련 동영상이 없을 경우
            res.redirect('/search');
        }
    });
});

router.get('/result', function(req, res){
   // res.render('/video/result_page');
})

module.exports = router;