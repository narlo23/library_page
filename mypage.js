$(function() {
    var customer_name = document.getElementById("customer_name");
    var customer_cno = document.getElementById("customer_cno");
    var customer_pw = document.getElementById("customer_pw");
    var customer_email = document.getElementById("customer_email");
    var customer_admin = document.getElementById("customer_admin");

    //고객 정보 sessionStorage에서 꺼내오기
    customer_name.innerHTML = sessionStorage.getItem("name");
    customer_cno.innerHTML = sessionStorage.getItem("cno")
    customer_pw.innerHTML = sessionStorage.getItem("passwd");
    customer_email.innerHTML = sessionStorage.getItem("email");
    customer_admin.innerHTML = sessionStorage.getItem("admin");

    $.ajax({        //마이 페이지의 대출 정보 출력을 위한 ajax
        type : "post",
        url : "mypage_borrow.php",
        data : {
        cno : sessionStorage.getItem("cno")},
        success : function(data){
            var table = document.getElementById("borrow_table");
            var result = JSON.parse(data);
            var result_len = result.length; 
            sessionStorage.setItem("borrow_len", result_len);

            while(table.hasChildNodes()) {
                    table.removeChild(table.firstChild);
            }

            var tr = document.createElement("tr");
            var th = document.createElement("th");
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.id = "all_br_checkbox";
            checkbox.addEventListener("change", all_br_check);
            th.appendChild(checkbox);
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "Index";
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "ISBN";
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "책 제목";
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "출판사";
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "연장 횟수";
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "대출일자";
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "반납예정일";
            tr.appendChild(th);

            table.appendChild(tr);

            for(var i=0;i<result_len;i++) {
                var tr = document.createElement("tr");

                var td = document.createElement("td");
                var checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.id = "br_checkbox" + i;
                td.appendChild(checkbox);
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = i+1;
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = result[i][0];
                td.id = "brtd" + i;
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = result[i][1];
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = result[i][2];
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = result[i][3];
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = result[i][4];
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = result[i][5];
                tr.appendChild(td);

                table.appendChild(tr);
            }
        }
    });

    $.ajax({        //마이 페이지에 예약 정보 출력을 위한 ajax
        type : "post",
        url : "mypage_reserve.php",
        data : {
        cno : sessionStorage.getItem("cno"),
        isbn : sessionStorage.getItem("isbn")},
        success : function(data){
            var table = document.getElementById("reserve_table");
            var result = JSON.parse(data);
            var result_len = result.length;
            sessionStorage.setItem("reserve_len", result_len); 

            while(table.hasChildNodes()) {
                    table.removeChild(table.firstChild);
            }

            var tr = document.createElement("tr");
            var th = document.createElement("th");
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.id = "all_rs_checkbox";
            checkbox.addEventListener("change", all_rs_check);
            th.appendChild(checkbox);
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "Index";
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "ISBN";
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "책 제목";
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "출판사";
            tr.appendChild(th);

            var th = document.createElement("th");
            th.innerHTML = "예약일자";
            tr.appendChild(th);

            table.appendChild(tr);

            for(var i=0;i<result_len;i++) {
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.id = "rs_checkbox" + i;
                td.appendChild(checkbox);
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = i+1;
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = result[i][0];
                td.id = "rstd" + i;
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = result[i][1];
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = result[i][2];
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = result[i][3];
                tr.appendChild(td);

                table.appendChild(tr);
            }
        }
    });

    $("#return_btn").click(function() {     //반납하기 버튼 클릭 시
        for(var i = 0; i < sessionStorage.getItem("borrow_len"); i++) {
            var tmpid = "br_checkbox" + i;
            var checkbox = document.getElementById(tmpid);
            
            var tdid = "brtd" + i;
            if(checkbox.checked) {  //check되어 있는 row들에 한해 return.php 실행
                $.ajax({
                    url : "return.php",
                    type : "POST",
                    data : {
                    isbn : document.getElementById(tdid).innerHTML},
                    success : function(){
                        location.reload();      //페이지 reload
                    }
                });
            }        
        }
    });

    $("#extend_btn").click(function() {     //연장하기 버튼 클릭 시
        for(var i = 0; i < sessionStorage.getItem("borrow_len"); i++) {
            var tmpid = "br_checkbox" + i;
            var checkbox = document.getElementById(tmpid);
            
            var tdid = "brtd" + i;
            if(checkbox.checked) {  //check되어 있는 row들에 한해 extend_possible.php 실행
                $.ajax({
                    url : "extend_possible.php",
                    type : "POST",
                    data : {
                    isbn : document.getElementById(tdid).innerHTML},
                    success : function(data){
                        if(data == "success") {
                            alert("연장되었습니다.");
                        } else if(data == "exceed") {
                            alert("연장 횟수가 초과되었습니다.");
                        } else {
                            alert("연장이 불가능합니다.");
                        }
                        location.reload();  //페이지 reload
                    }
                });
            }        
        }
    });
    
    $("#delete_btn").click(function() {     //삭제하기 버튼 클릭 시 (예약취소)
        for(var i = 0; i < sessionStorage.getItem("borrow_len"); i++) {
            var tmpid = "rs_checkbox" + i;
            var checkbox = document.getElementById(tmpid);
            
            var tdid = "rstd" + i;
            if(checkbox.checked) {  //check되어 있는 row들에 한해 reserve_cancel.php 실행
                $.ajax({
                    url : "reserve_cancel.php",
                    type : "POST",
                    data : {
                    isbn : document.getElementById(tdid).innerHTML,
                    cno : sessionStorage.getItem("cno")},
                    success : function(){
                        alert("예약이 취소되었습니다.");
                        location.reload();
                    }
                });
            }        
        }
    });
});

function all_br_check() {       //대출 - 모든 행 선택 버튼
    for(var i = 0; i < sessionStorage.getItem("borrow_len"); i++) {
        var tmpid = "br_checkbox" + i;
        var checkbox = document.getElementById(tmpid);
        if(checkbox.checked) {
            checkbox.checked=false;
        } else {
            checkbox.checked = true;
        }

    }
}

function all_rs_check() {   //예약 - 모든 행 선택 버튼
    for(var i = 0; i < sessionStorage.getItem("reserve_len"); i++) {
        var tmpid = "rs_checkbox" + i;
        var checkbox = document.getElementById(tmpid);
        if(checkbox.checked) {
            checkbox.checked=false;
        } else {
            checkbox.checked = true;
        }

    }
}

