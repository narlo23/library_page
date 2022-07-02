$(document).ready(function() {
    var isbn = document.getElementById("isbn");
    var book = document.getElementById("book");
    var author = document.getElementById("author"); 
    var publisher = document.getElementById("publisher");
    var year = document.getElementById("year");
    var borrow_info = document.getElementById("borrow_info");

    var borrow;
    $.ajax({    //도서 상세 페이지의 대출 정보를 출력하기 위한 ajax
        url : "borrow.php",
        type : "POST", 
        data : {
        isbn : sessionStorage.getItem("isbn")
        }, success : function(data) {
        var result = JSON.parse(data);
        borrow = result[1]; //CNO
        if(borrow == null) {    //대출한 사람이 없음
            borrow_info.innerHTML = "대출 가능";
            $("#borrow_btn").attr('disabled', false);
            $("#reserve_btn").attr('disabled', true);
        } else {    //대출한 사람이 있음
            borrow_info.innerHTML = "대출중(예약 가능)";
            $("#borrow_btn").attr('disabled', true);
            $("#reserve_btn").attr('disabled', false);
        }
        }
    });

    isbn.innerHTML = sessionStorage.getItem("isbn");
    book.innerHTML = sessionStorage.getItem("bookname");
    author.innerHTML = sessionStorage.getItem("author");
    publisher.innerHTML = sessionStorage.getItem("publisher");
    year.innerHTML = sessionStorage.getItem("year");

    $.ajax({    //도서 상세 페이지의 예약 정보를 출력하기 위한 ajax
        url : "reserved.php",
        type : "POST", 
        data : {
        isbn : sessionStorage.getItem("isbn")
        }, success : function(data) {  //질의 결과로 받아온 data를 이용하여 테이블 동적 생성
        var result = JSON.parse(data);
        var result_len = result.length;
        var table = document.getElementById("reserved_table");

        while(table.hasChildNodes()) {
                table.removeChild(table.firstChild);
        }

        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.innerHTML = "Index";
        tr.appendChild(th);

        var th = document.createElement("th");
        th.innerHTML = "ISBN";
        tr.appendChild(th);

        var th = document.createElement("th");
        th.innerHTML = "CNO";
        tr.appendChild(th);

        var th = document.createElement("th");
        th.innerHTML = "DATETIME";
        tr.appendChild(th);

        table.appendChild(tr);

        for(var i = 0 ; i < result_len ; i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerHTML = i + 1;
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = result[i][0];
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = result[i][1];
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = result[i][2];
            tr.appendChild(td);

            table.appendChild(tr);
            } 
        }
        
    });

    $("#borrow_btn").click(function() { //대출하기 버튼 클릭
        var cno = sessionStorage.getItem("cno");
        var isbn = sessionStorage.getItem("isbn");
    
        $.ajax({
            url : "borrow_book.php",
            type : "POST", 
            data : {
            cno : cno,
            isbn : isbn
            }, success : function(data) {
                if(data == "success") {
                    alert("대출 완료");
                    document.getElementById("borrow_info").innerHTML = "대출중(예약 가능)";
                    $("#borrow_btn").attr('disabled', true);
                    $("#reserve_btn").attr('disabled', false);
                } else {
                    alert("최대 대출 권수를 넘습니다.");
                }
            }
        });
    });

    $("#reserve_btn").click(function() {    //예약하기 버튼 클릭
        var cno = sessionStorage.getItem("cno");
        var isbn = sessionStorage.getItem("isbn");
    
        $.ajax({
            url : "reserve_book.php",
            type : "POST", 
            data : {
            cno : cno,
            isbn : isbn
            }, success : function(data) {
                if(data == "success") {
                    alert("예약 완료");
                } else if(data == "duplicate") {
                    alert("이미 예약되었습니다.");
                } else if(data == "max") {
                    alert("최대 예약 건수를 넘습니다.");
                }             
                location.reload();
            }
        });
    });
});



