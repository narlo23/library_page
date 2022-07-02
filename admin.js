$(document).ready(function() {
    $.post("admin.php", function(data) {    //admin.php에 접근하여 조인을 이용한 질의 결과를 data로 받아온다.
        var result = JSON.parse(data);
        var result_len = result.length;

        for(var i=0;i<result_len;i++) {     //결과를 이용하여 동적으로 테이블 생성
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerHTML = i+1;
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

            var td = document.createElement("td");
            td.innerHTML = result[i][3];
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = result[i][4];
            tr.appendChild(td);

            join_table.appendChild(tr);
        }
    });

    var group_table = document.getElementById("group_table");
    $.post("admin2.php", function(data) {       //admin2.php에 접근하여 그룹 함수를 이용한 질의 결과를 data로 받아온다.
        var result = JSON.parse(data);
        var result_len = result.length;

        for(var i=0;i<result_len;i++) {         //결과를 이용하여 동적으로 테이블 생성
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerHTML = i+1;
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

            group_table.appendChild(tr);
        }
    });

    var window_table = document.getElementById("window_table");
    $.post("admin3.php", function(data) {       //admin3.php에 접근하여 윈도우 함수를 이용한 질의 결과를 data로 받아온다.
        var result = JSON.parse(data);
        var result_len = result.length;

        for(var i=0;i<result_len;i++) {         //결과를 이용하여 동적으로 테이블 생성
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerHTML = i+1;
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

            var td = document.createElement("td");
            td.innerHTML = result[i][3];
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = result[i][4];
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = parseFloat(result[i][5]);
            tr.appendChild(td);

            window_table.appendChild(tr);
        }
    });
});