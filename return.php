<?php       //반납하기 기능 구현 php
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

    //ISBN의 CNO, DATERENTED가져와 변수에 저장
    $query = "SELECT CNO, DATERENTED FROM EBOOK WHERE ISBN = :isbn";
    $stmt = $conn -> prepare($query);
    $stmt -> bindParam(":isbn", $isbn);
    $stmt -> execute();
    $row = $stmt->fetch(PDO::FETCH_NUM);

    $cno = $row[0];
    $daterented = $row[1]; 

    //EBOOK 테이블에서 대출 기록 업데이트
    $query = "UPDATE EBOOK
    SET CNO = NULL, EXTTIMES=0, DATERENTED=NULL, DATEDUE=NULL
    WHERE ISBN = :isbn";
    $stmt = $conn -> prepare($query);
    $stmt -> bindParam(":isbn", $isbn);
    $stmt -> execute();

    //PREVIOUSRENTAL 테이블에 대출 기록 추가
    $query = "INSERT INTO PREVIOUSRENTAL
    VALUES (:isbn, TO_DATE(:daterented, 'YY/MM/DD'), TO_DATE(SYSDATE, 'YY/MM/DD'), :cno)";
    $stmt = $conn -> prepare($query);
    $stmt -> bindParam(":isbn", $isbn);
    $stmt -> bindParam(":daterented", $daterented);
    $stmt -> bindParam(":cno", $cno);
    $stmt -> execute();

?>