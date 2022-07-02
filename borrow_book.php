<?php   //대출하기 기능을 구현한 php
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

    //현재 로그인 된 회원의 대출 권수
    $query = "SELECT COUNT(*) FROM EBOOK WHERE CNO = :cno";
    $stmt = $conn -> prepare($query);
    $stmt -> bindParam(":cno", $cno);
    $stmt -> execute();

    $row = $stmt->fetch(PDO::FETCH_NUM);
    if($row[0] < 3) {   //대출 권수가 3을 넘지 않는다면 대출 가능
        //EBOOK의 CNO, DATERENTED, DATEDUE 정보를 업데이트 하여 대출 기록 추가
        $query = "UPDATE EBOOK
        SET CNO = :cno, DATERENTED =  TO_DATE(SYSDATE, 'YYYY/MM/DD'), DATEDUE = TO_DATE(SYSDATE, 'YYYY/MM/DD') + (INTERVAL '10' DAY)
        WHERE ISBN = :isbn AND CNO IS NULL";
        $stmt = $conn -> prepare($query);
        $stmt -> bindParam(":cno", $cno);
        $stmt -> bindParam(":isbn", $isbn);
        $stmt -> execute();
        echo "success";
    } else {        //대출 권수가 3을 넘으므로 대출 불가
        echo "fail";
    }
?>