<?php   //예약하기 기능을 구현한 php
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

    $query = "SELECT NVL(CNO, 0) FROM EBOOK WHERE ISBN = :isbn";    //대출한 사람이 나인지 확인
    $stmt = $conn -> prepare($query);
    $stmt -> bindParam(":isbn", $isbn);
    $stmt -> execute();
    $row = $stmt->fetch(PDO::FETCH_NUM);

    $query = "SELECT COUNT(*) FROM RESERVE WHERE CNO = :cno";   //내가 예약한 횟수 확인
    $stmt = $conn -> prepare($query);
    $stmt -> bindParam(":cno", $cno);
    $stmt -> execute();
    $row2 = $stmt->fetch(PDO::FETCH_NUM);
    
    if((int)$row[0] == $cno) {  //대출한 사람이 나야
        echo "duplicate";
    } else {
        if($row2[0] < 3) {  //최대 예약 건수가 3회이므로 3을 넘지 않는 경우 예약 가능
            //reserve 테이블에 정보 추가
            $query = "INSERT INTO RESERVE
            VALUES(:isbn, :cno, TO_DATE(SYSDATE, 'YY/MM/DD'))";
            $stmt = $conn -> prepare($query);
            $stmt -> bindParam(":isbn", $isbn);
            $stmt -> bindParam(":cno", $cno);
            $stmt -> execute(); 
            echo "success";   
        } else {    //예약 불가능
            echo "max";
        }
    }
    
?>