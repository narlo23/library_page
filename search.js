/*
$("#detail_search_btn").click(function() {
    var modal = document.getElementById("search_modal");
    modal.style.display="block";
});


$("#detail_selectbox").on("change", function() {
    var selected = $(this).val();
    var detailfield = document.getElementById("detail_field");
    while(detailfield.hasChildNodes()) {
        detailfield.removeChild(detailfield.firstChild);
    }

    if(selected == "발행년도") {
        var numbertag = document.createElement("input");
        numbertag.setAttribute("type", "number");

        detailfield.appendChild(numbertag);
    } else {
        var texttag = document.createElement("input");
        texttag.setAttribute("type", "text");

        detailfield.appendChild(texttag);
    }
});
*/

$("#exitbtn").click(function() {        //창닫기 버튼, 모달 창으로 띄울 경우를 위해 구현해둠
    var modal = document.getElementById("search_modal");
    $("#search_modal").find('input').val('');
    selectreset();
    modal.style.display="none";
});

$("#resetbtn").click(function() {       //초기화 버튼, 해당 테이블에 있는 모든 정보를 초기화한다.
    $("#search_modal").find('input').val('');
    selectreset();
});

function selectreset() {
    $("#bookname_selectbox option:eq(0)").prop("selected", true);
    $("#op_selectbox1 option:eq(0)").prop("selected", true);
    $("#author_selectbox option:eq(0)").prop("selected", true);
    $("#op_selectbox2 option:eq(0)").prop("selected", true);
    $("#publisher_selectbox option:eq(0)").prop("selected", true);
    $("#op_selectbox3 option:eq(0)").prop("selected", true);
    $("#year_selectbox option:eq(0)").prop("selected", true);
}

$("#searchbtn").click(function() {      //검색 버튼 클릭
    var check = true;
    var bookname_selectbox = document.getElementById("bookname_selectbox").value;
    var detail_bookname = document.getElementById("detail_bookname").value;
    var op_selectbox1 = document.getElementById("op_selectbox1").value;

    var author_selectbox = document.getElementById("author_selectbox").value;
    var detail_author = document.getElementById("detail_author").value;
    var op_selectbox2 = document.getElementById("op_selectbox2").value;

    var publisher_selectbox = document.getElementById("publisher_selectbox").value;
    var detail_publisher = document.getElementById("detail_publisher").value;
    var op_selectbox3 = document.getElementById("op_selectbox3").value;

    var year_selectbox = document.getElementById("year_selectbox").value;
    var detail_startyear = document.getElementById("detail_startyear").value;
    var detail_endyear = document.getElementById("detail_endyear").value;

    if(bookname_selectbox == "bookname" && detail_bookname == "") { //도서명 입력 안했을 경우
        alert("도서명을 입력해주세요.");
        check = false;
    }
    if(author_selectbox == "author" && detail_author == "") {   //저자 입력 안했을 경우
        alert("저자명을 입력해주세요.");
        check = false;
    }
    if(publisher_selectbox == "publisher" && detail_publisher == "") {  //출판사 입력 안했을 경우
        alert("출판사를 입력해주세요.");
        check = false;
    }
    if(year_selectbox == "year" && detail_startyear == "" && detail_endyear == "") {    //발행년도 입력 안했을 경우
        alert("발행년도 범위를 입력해주세요.");
        check = false;
    }

    if((detail_startyear != "" || detail_endyear != "") && detail_startyear>detail_endyear) { 
        alert("발행년도 범위를 다시 지정해주세요.");
        check = false;
    }


    if(check) {     //검색을 위한 조건 만족
        var table = document.getElementById("result_table");
                
        $.ajax({    //주어진 조건들을 이용하여 검색
            url : "detailsearch.php"
              , type : "POST"
              , data : {
                  selectbook : bookname_selectbox,
                  bookname : detail_bookname.toLowerCase(),
                  op1 : op_selectbox1,
                  selectauthor : author_selectbox,
                  author : detail_author.toLowerCase(),
                  op2 : op_selectbox2,
                  selectpublisher : publisher_selectbox,
                  publisher : detail_publisher.toLowerCase(),
                  op3 : op_selectbox3,
                  selectyear : year_selectbox,
                  startyear : detail_startyear,
                  endyear : detail_endyear
              } 
            ,success : function(data) {     //검색 결과를 테이블에 동적으로 추가
                var result = JSON.parse(data);
                var result_len = result.length; 

                while(table.hasChildNodes()) {      //기존에 있던 결과를 모두 지우고
                     table.removeChild(table.firstChild);
                }

                var tr = document.createElement("tr");
                tr.id = "result_header";
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
                th.innerHTML = "작가";
                tr.appendChild(th);
                var th = document.createElement("th");
                th.innerHTML = "출판사";
                tr.appendChild(th);
                var th = document.createElement("th");
                th.innerHTML = "출판년도";
                tr.appendChild(th);
                
                table.appendChild(tr);      //테이블 헤더 추가
                
                if(result_len != 0) {       //검색 결과가 하나라도 있으면
                    for(var i = 0 ; i < result_len ; i++) {
                        var tr = document.createElement("tr");
                        tr.id = result[i].isbn;
                        var td = document.createElement("td");
                        td.innerHTML = (i+1);
                        tr.appendChild(td);
    
                        var td = document.createElement("td");
                        td.innerHTML = result[i].isbn;
                        tr.appendChild(td);
    
                        var td = document.createElement("td");
                        td.innerHTML = result[i].title;
                        tr.appendChild(td);
    
                        var td = document.createElement("td");
                        td.innerHTML = result[i].authors;
                        tr.appendChild(td);
    
                        var td = document.createElement("td");
                        td.innerHTML = result[i].publisher;
                        tr.appendChild(td);
                        
                        var td = document.createElement("td");
                        td.innerHTML = result[i].year;
                        tr.appendChild(td);
    
                        tr.addEventListener("mouseover", function() {   //검색 결과의 tr에 mouseover이벤트 발생 시 색상 변경
                            this.style.backgroundColor = "#d5d5d5";
                        });
                        tr.addEventListener("mouseout", function() {    //검색 결과의 tr에 mouseout이벤트 발생 시 원래대로 색상 변경
                            this.style.backgroundColor = "#EDEDED";
                        });
                        tr.addEventListener("click", function() {       //검색 결과의 tr click 시 책 정보를 sessionStorage에 저장
                            var clicktr = document.getElementById(this.id);
                            sessionStorage.setItem("isbn", clicktr.childNodes[1].innerHTML);
                            sessionStorage.setItem("bookname", clicktr.childNodes[2].innerHTML);
                            sessionStorage.setItem("author", clicktr.childNodes[3].innerHTML);
                            sessionStorage.setItem("publisher", clicktr.childNodes[4].innerHTML);
                            sessionStorage.setItem("year", clicktr.childNodes[5].innerHTML);
                            window.open("newpage.html");
                        });
                        table.appendChild(tr);
                    }
                } else  {
                    alert("출력할 결과가 없습니다.");
                }
            }
        });
    }

});