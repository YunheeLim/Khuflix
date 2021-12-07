## KhuFlix using AWS, Node js
경희대학교 컴퓨터공학과 이아영 박선하 임윤희

## KhuFlix
Node.js를 사용한 Netflix와 유사한 서비스 만들어보기<br>
Create similar service to Netflix with Node js

## Configuration
1. Frontend : Html, CSS, Vanilla Javascript, ejs
2. Backend : Node.js
3. Database : MongoDB
4. AWS : EC2

# Prerequisit
node v16.X
npm 8.x

## Required File
위 저장소를 클론한 후 config/secret.js 파일의 빈칸을 채워주세요. 내용은 다음과 같습니다.
```
module.exports={
    'mongoDB':{
        'password':'***********',
        'local_URL':'mongodb://localhost:27017/yourDBname'
    },
    'naver':{
        'clientID':'Yours',
        'clientSecret':'Yours',
        'callbackURL':'http://localhost:4000/auth/naver/callback'
    },
    'kakao':{
        'clientID': 'Yours',
        'callbackURL': 'http://localhost:4000/auth/kakao/callback'
    },
    'facebook':{
        'clientID': 'Yours',
        'clientSecret': 'Yours',
        'callbackURL':'http://localhost:4000/auth/facebook/callback'
    }
}
```


## Install
npm insatll

## Run program
npm start
포트번호는 4000입니다.

## Reference links
<a href="https://www.w3schools.com/">W3school</a><br>
<a href="https://developer.mozilla.org/ko/docs/Mozilla">Mozilla</a><br>
<a href="http://www.passportjs.org/">Passport JS<a/><br>
<a href="https://developers.naver.com/main/">Naver Developer</a><br>
<a href="https://developers.kakao.com/">Kakao Developer</a><br>
<a href="https://developers.facebook.com/?locale=ko_KR">Facebook Developer</a><br>
<a href="https://mongoosejs.com/">Mongoose</a><br>
<a href="https://aws.amazon.com/free/?trk=ps_a134p000003yHYmAAM&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=Google&sc_category=Core-Main&sc_country=KR&sc_geo=APAC&sc_outcome=acq&sc_detail=aws&sc_content=Brand_Core_aws_e&sc_segment=444218215904&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Core-Main|Core|KR|EN|Text&s_kwcid=AL!4422!3!444218215904!e!!g!!aws&ef_id=Cj0KCQiAqbyNBhC2ARIsALDwAsDK3D5JI3YOpoI3HUBy3nGyWe-N5Dr0FLUGNXLk7DEtpO3vOcfcQDgaAtodEALw_wcB:G:s&s_kwcid=AL!4422!3!444218215904!e!!g!!aws&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all">AWS</a>

## Pages
- First
- Login
- Signup
- Main
- Search
- Detail
- Movie
- TV program
- Like

## © License
- MIT License Copyright(c) [Sunha Park]<br>
- MIT License Copyright(c) [Ahyoung Lee]<br>
- MIT License Copyright(c) [Yunhui Lim]

## ✉ Contact
이용 중 궁금한 사항 있으시면 아래로 연락부탁드립니다.
- Email: khuflix@gmail.com