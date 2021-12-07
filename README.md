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
W3school
Mozilla
Passport JS
Naver Developer
Kakao Developer
Facebook Developer
Mongoose
AWS

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
- [x]MIT License Copyright(c) [Sunha Park]
MIT License Copyright(c) [Ahyoung Lee]
MIT License Copyright(c) [Yunhui Lim]

## ✉ Contact
이용 중 궁금한 사항 있으시면 아래로 연락부탁드립니다.
- Email: khuflix@gmail.com