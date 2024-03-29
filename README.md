# KhuFlix using AWS, Node js
> 경희대학교 컴퓨터공학과 이아영 박선하 임윤희

![image1](https://github.com/YunheeLim/Khuflix/assets/92131041/1c87628d-b56b-458f-ab6c-f43d3e7d3d35)
![image2](https://github.com/YunheeLim/Khuflix/assets/92131041/22243e1d-7267-4811-b9f5-f6c0e12f6ec7)
![image3](https://github.com/YunheeLim/Khuflix/assets/92131041/fd0c4ea4-4f9c-41a1-941d-cc5dd608cec4)


## :heart: KhuFlix
- Node.js를 사용한 Netflix와 유사한 서비스 만들어보기 
- Create similar service to Netflix with Node js

## :wavy_dash: Configuration
1. Frontend : Html, CSS, Vanilla Javascript, ejs
2. Backend : Node.js
3. Database : Mongo Atlas
4. AWS : EC2

## :point_down: Branch Name
- aylee, shPark: Front-End
- yhLim: Back-End

## :scroll: DB Schema
### Users collection
```
{
    name: {type: String, required: false},
    id: {type: String, required: true, unique: true},
    pw: {type: String, required: false}, 
    history:[{title:String, episode:Number}], 
    like:[{title:String}] 
}
```
### Vidoes collection
```
{
    title: String,
    src: String, 
    content: String,
    cast: String,
    feature: String,
    genre: String,
    ost: [{song: String, singer: String, ost_src: String}],
    episode: [{time: Number, epi_content: String, epi_src: String, epi_title: String}],
    type: String, 
    category: String 
}
```

## :banana: Prerequisit
- node v16.X<br>
- npm v8.x<br>
- <a href="https://www.mongodb.com/try/download/enterprise">Mongo DB v5.X</a><br>
- <a href="https://developers.kakao.com/console/app">카카오 로그인 API KEY발급</a>(필수 동의 항목: 닉네임)<br>
- <a href="https://developers.naver.com/apps/#/register">네이버 로그인 API KEY발급</a>(필수 동의 항목: 회원이름, 이메일주소)<br>
- <a href="https://developers.facebook.com/docs/facebook-login/">페이스북 로그인 API KEY발급</a>

## :monkey: Required File
위 저장소를 클론한 후 config/secret.js 파일의 빈칸을 채워주세요. 내용은 다음과 같습니다.
```
module.exports={
    'mongoDB':{
        'password':"***you don't need to fill this out when using local DB***",
        'local_URL':'mongodb://localhost:27017/***yourDBname***'
    },
    'naver':{
        'clientID':'***yours***',
        'clientSecret':'***yours***',
        'callbackURL':'http://localhost:4000/auth/naver/callback'
    },
    'kakao':{
        'clientID': '***yours***',
        'callbackURL': 'http://localhost:4000/auth/kakao/callback'
    },
    'facebook':{
        'clientID': '***yours***',
        'clientSecret': '***yours***',
        'callbackURL':'http://localhost:4000/auth/facebook/callback'
    }
}
```

## :star2: Install
```sh
npm insatll
```

## :alien: Run program
```sh
npm start
```
동영상 데이터 셋팅을 위해 <a href="http://localhost:4000/set_videos">localhost:4000/set_videos</a>에 접속해주세요.<br>
모든 준비가 완료 되었습니다. <a href="http://localhost:4000/first">localhost:4000/first</a>로 접속하여 영상을 즐겨주세요.


## :grey_exclamation: Reference links
<a href="https://www.w3schools.com/">W3school</a><br>
<a href="https://developer.mozilla.org/ko/docs/Mozilla">Mozilla</a><br>
<a href="http://www.passportjs.org/">Passport JS</a><br>
<a href="https://developers.naver.com/main/">Naver Developer</a><br>
<a href="https://developers.kakao.com/">Kakao Developer</a><br>
<a href="https://mongoosejs.com/">Mongoose</a><br>
<a href="https://aws.amazon.com/free/?trk=ps_a134p000003yHYmAAM&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=Google&sc_category=Core-Main&sc_country=KR&sc_geo=APAC&sc_outcome=acq&sc_detail=aws&sc_content=Brand_Core_aws_e&sc_segment=444218215904&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Core-Main|Core|KR|EN|Text&s_kwcid=AL!4422!3!444218215904!e!!g!!aws&ef_id=Cj0KCQiAqbyNBhC2ARIsALDwAsDK3D5JI3YOpoI3HUBy3nGyWe-N5Dr0FLUGNXLk7DEtpO3vOcfcQDgaAtodEALw_wcB:G:s&s_kwcid=AL!4422!3!444218215904!e!!g!!aws&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all">AWS</a>

## :heavy_check_mark: Pages
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
> MIT License Copyright(c) [Sunha Park]<br>
> MIT License Copyright(c) [Ahyoung Lee]<br>
> MIT License Copyright(c) [Yunhui Lim]

## :envelope: Contact
이용 중 궁금한 사항 있으시면 아래로 연락부탁드립니다.
- Email: khuflix@gmail.com
