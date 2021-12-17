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