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
node v16.X<br>
npm 8.x

## Required File
위 저장소를 클론한 후 config/secret.js 파일의 빈칸을 채워주세요. 내용은 다음과 같습니다.
```
module.exports={
    'mongoDB':{
        'password':'',
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
동영상을 재생시키고 싶다면 데이터 베이스에 아래와 같은 형식의 동영상 데이터를 추가해주세요.<br>
예시
```
{
    "title":"지옥",
    "src":"https://www.youtube.com/embed/ga3pXJEngms?controls=0",
    "content":"어느 날 기이한 존재로부터 지옥행을 선고받은 사람들. 충격과 두려움에 휩싸인 도시에 대혼란의 시대가 도래한다. 신의 심판을 외치며 세를 확장하려는 종교단체와 진실을 파헤치는 자들의 이야기.",
    "cast":"유아인, 김현주, 박정민",
    "feature":"폭력적인, 어두운, 긴장감 넘치는",
    "genre":"TV 프로그램·미스터리, TV 프로그램·범죄, 웹툰 원작 한국 드라마",
    "ost":[
        {"song":"인트로(Intro)","singer":"Unknown","ost_src":"https://www.youtube.com/embed/8gTTmo-9Qbw?controls=0"},
        {"song":"엔딩테마","singer":"Unknown","ost_src":"https://www.youtube.com/embed/GNBkuCCp2w4?controls=0"}
        ],
    "episode":[
        {"time":48,"epi_content":"대낮에 도시 한복판에서 한 남자를 무자비하게 죽이는 괴생물체들. 새진리회 의장 정진수는 공포에 질린 시민들에게 설파한다. 죄지은 자들에게 지옥행이 선고된 것이라고.","epi_src":"https://www.youtube.com/embed/huTOivFBXFY"},
        {"time":53,"epi_content":"또 다른 지옥행이 예고되었다. 5일 후 죽는다는 신의 고지를 받고 정진수를 찾아간 박정자. 새진리회는 거액을 제안한다. 그 대가는? 지옥 시연을 생방송으로 중계하는 것.","epi_src":"https://www.youtube.com/embed/JbRiuqg6Sy4"},
        {"time":53,"epi_content":"인간은 더욱 정의로워질 수 있습니다. 방송에서 신의 심판이 도래했음을 경고하는 정진수. 진경훈 형사가 가출한 딸을 찾는 동안 화살촉은 민혜진 변호사에게 응징을 가한다.","epi_src":"https://www.youtube.com/embed/JbRiuqg6Sy4"},
        {"time":42,"epi_content":"무언가를 숨긴 채 사라진 동료를 찾아 나선 배영재 피디. 외진 낚시터에서 끔찍한 광경을 목격하고 아연실색한다. 한편, 전혀 예상치 못한 장소에서 천사의 예언이 전달된다.","epi_src":"https://www.youtube.com/embed/JbRiuqg6Sy4"},
        {"time":55,"epi_content":"반드시 답을 찾아야 한다. 절망에 빠진 배영재는 간절한 마음으로 한 남자를 추적한다. 증발한 자들의 행적을 쫓던 새진리회. 소문으로 떠돌던 수상한 단체의 꼬리를 잡는다.","epi_src":"https://www.youtube.com/embed/JbRiuqg6Sy4"},
        {"time":60,"epi_content":"세상에 알려지면 대혼란이 일어날 것이다. 다음 시연 당사자의 놀라운 정체를 알게 된 새진리회는 필사의 추적을 시작한다. 무슨 일이 있어도 시연의 공개를 막아야 한다.","epi_src":"https://www.youtube.com/embed/JbRiuqg6Sy4"}
        ],
    "type":"youtube",
    "category":"TV"
}
```

## Install
npm insatll

## Run program
npm start<br>
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
> MIT License Copyright(c) [Sunha Park]<br>
> MIT License Copyright(c) [Ahyoung Lee]<br>
> MIT License Copyright(c) [Yunhui Lim]

## ✉ Contact
이용 중 궁금한 사항 있으시면 아래로 연락부탁드립니다.
- Email: khuflix@gmail.com