if(sessionStorage.length != 0) {        //sessionStorage에 정보가 존재한다면 로그인 한 상태
    login.innerHTML = "로그아웃";
    loginid.innerHTML = sessionStorage.getItem("name") + "님 환영합니다.";
}

$("#home").click(function() {       //홈버튼 클릭 시 main.html로 이동
    location.replace="main.html";

    var login = document.getElementById("login");
    var loginid = document.getElementById("loginid");
    var name = sessionStorage.getItem("name");
    if(name != null) {
        login.innerHTML = "로그아웃";
        loginid.innerHTML = sessionStorage.getItem("name") + "님 환영합니다.";
    }
});

$("#login").click(function() {      //로그인 된 상태인 경우 로그아웃, 로그인 안 된 상태인 경우 로그인
    var login = document.getElementById("login");
    if(login.innerHTML == "로그인") {       //로그인을 위한 모달창 띄우기
        var modal = document.getElementById("login_modal");
        modal.style.display="block";
    } else {                                //sessionStorage 비우기(로그아웃)
        sessionStorage.clear();
        location.href="./main.html";
    }
});

$("#loginbtn").click(function() {           //모달 창의 로그인 버튼
    var cnum = document.getElementById("customer_num").value;
    var cpw = document.getElementById("customer_pw").value;

    var login = document.getElementById("login");
    var loginid = document.getElementById("loginid");
    if(cnum == "" || cpw == "") {       //아이디 또는 패스워드를 입력하지 않았다면
        alert("아이디와 패스워드를 입력하세요.");
    }
    else{                               //둘 다 입력한 경우 EBOOKCUSTOMER에서 정보 비교
        $.ajax({
            type : "post",
            url : "login.php",
            data : {
            id : cnum,
            pw : cpw},
            success : function(data){   //EBOOKCUSTOMER의 회원 정보와 비교한 결과
                if(data != 0) {
                    var modal = document.getElementById("login_modal");     //모달창 닫고
                    cnum="";
                    cpw="";
                    modal.style.display="none";
                    login.innerHTML = "로그아웃";                           //로그인 되었으니까 로그아웃으로 innerHTML 변경
    
                    var dataarr = data.split(" ");                          //회원정보 sessionStorage에 저장
                    sessionStorage.setItem("cno", dataarr[0]);
                    sessionStorage.setItem("name", dataarr[1]);
                    sessionStorage.setItem("passwd", dataarr[2]);
                    sessionStorage.setItem("email", dataarr[3]);
                    sessionStorage.setItem("admin", dataarr[4]);
                    loginid.innerHTML = dataarr[1] + "님 환영합니다.";
                } else {                //로그인 실패
                    alert("아이디 또는 패스워드가 잘못되었습니다.");
                    cnum="";
                    cpw="";
                }
            }
        });
    }
});

$("#signup").click(function() {     //회원가입 버튼을 누른경우
    window.open("signup.html");     //회원가입 창 열기(상세기능 구현 X)
});

$("#exitbtn").click(function() {    //창닫기 버튼을 누른 경우
    var modal = document.getElementById("login_modal");
    var num = document.getElementById("customer_num");
    var pw = document.getElementById("customer_pw");

    num.value = "";
    pw.value = "";
    modal.style.display="none";     //회원번호, 비밀번호 원래 상태로 초기화 하고 모달창 닫기
});


$("#search_book").click(function() {    //자료 검색 클릭
    var name = sessionStorage.getItem("name");
    if(name == null) {      //sessionStorage에 name 정보가 없다면 로그인 안 된 상태
        alert("로그인 후 이용 가능합니다.");
    } else {                //로그인 된 상태라면 search.html 열기
        window.open("./search.html");
    }
});

$("#mypage").click(function() {        //마이 페이지 클릭
    var name = sessionStorage.getItem("name");
    if(name == null) {      //로그인 후 이용 가능
        alert("로그인 후 이용 가능합니다.");
    } else {
        window.open("./mypage.html");
    }
})

$("#admin_menu").click(function() {     //관리자 메뉴 클릭
    var name = sessionStorage.getItem("name");
    if(name != "sys") {     //관리자 계정 이름 : sys, sys가 아닌 경우 관리자 아님
        alert("관리자 계정만 접속 가능합니다.");
    } else {
        window.open("./admin.html");
    }
})
