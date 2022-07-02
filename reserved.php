<?php   //도서 상세 페이지의 예약 정보 출력을 위한 php
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

    $query = "SELECT ISBN, CNO, DATETIME FROM RESERVE WHERE ISBN = :isbn";
    $stmt = $conn -> prepare($query);
    $stmt -> bindParam(":isbn", $isbn);
    $stmt -> execute();

    $result=[];
    while($row = $stmt->fetch(PDO::FETCH_NUM)) {
        array_push($result, $row);
    }
    echo json_encode($result);
?>