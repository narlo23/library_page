<?php       //예약 취소 기능을 구현한 php
    $isbn = $_POST["isbn"];
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

    //RESERVE 테이블에서 회원이 예약한 책 중 선택된 책에 대한 예약 정보 삭제
    $stmt = $conn -> prepare("DELETE
    FROM RESERVE
    WHERE ISBN = :isbn and CNO = :cno");
    $stmt -> bindParam(":cno", $cno);
    $stmt -> bindParam(":isbn", $isbn);
    $stmt -> execute();
    $row = $stmt->fetch(PDO::FETCH_NUM);

    
?>
