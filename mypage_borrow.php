<?php   //마이 페이지의 대출 정보 출력을 위한 php
    $cno = $_POST["cno"];

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

    $query = "SELECT ISBN, TITLE, PUBLISHER, EXTTIMES, DATERENTED, DATEDUE
    FROM EBOOK WHERE CNO = :cno";       //CNO가 나의 cno인 row 선택
    $stmt = $conn -> prepare($query);
    $stmt -> bindParam(":cno", $cno);
    $stmt -> execute();
    
    $result=[];     //result라는 list에 저장하여
    while($row = $stmt->fetch(PDO::FETCH_NUM)) {
        array_push($result, $row);
    }
    echo json_encode($result);  //json형태로 반환
?>