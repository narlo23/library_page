<?php       //마이 페이지의 예약 정보 출력을 위한 php
    $cno = $_POST["cno"];
    $isbn = $_POST["isbn"];
    $tns = "
	(DESCRIPTION=
		(ADDRESS_LIST=
			(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))
		)
		(CONNECT_DATA=
			(SERVICE_NAME=XE)
		)
	)";
    $url = "oci:dbname=".$tns.";charset=utf8";
    $username = '계정이름';
    $password = '비밀번호';
    try {
        $conn = new PDO($url, $username, $password);
    } catch (PDOException $e) {
        echo("에러 내용: ".$e -> getMessage());
    }
    
    $query = "SELECT E.ISBN, E.TITLE, E.PUBLISHER, R.DATETIME
    FROM EBOOK E, RESERVE R
    WHERE E.ISBN = R.ISBN AND R.CNO = :cno";        // 예약 일자 출력을 위해 EBOOK, RESERVE JOIN
    $stmt = $conn -> prepare($query);
    $stmt -> bindParam(":cno", $cno);
    $stmt -> execute();

    $result=[];     //result 배열을 이용하여 결과 저장
    while($row = $stmt->fetch(PDO::FETCH_NUM)) {
        array_push($result, $row);
    }
    echo json_encode($result);      //json 형태로 반환
?>