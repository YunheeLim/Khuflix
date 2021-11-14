//페이스북 로그인 시 query 끝에 생기는 '#_=_'를 제거
if (window.location.hash && window.location.hash == '#_=_') { 
    history.pushState("", document.title, window.location.pathname + window.location.search);
}