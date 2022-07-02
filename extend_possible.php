<?php       //연장 기능을 구현한 php
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

    //ISBN의 예약 기록 있는지 확인
    $stmt = $conn -> prepare("SELECT COUNT(*) FROM RESERVE WHERE ISBN = :isbn");
    $stmt -> bindParam(":isbn", $isbn);
    $stmt -> execute();
    $row = $stmt->fetch(PDO::FETCH_NUM);

    if($row[0] == 0) {  //예약한 사람이 없다면
        //연장 횟수 확인
        $stmt = $conn -> prepare("SELECT EXTTIMES FROM EBOOK WHERE ISBN = :isbn");
        $stmt -> bindParam(":isbn", $isbn);
        $stmt -> execute();
        $row2 = $stmt->fetch(PDO::FETCH_NUM);
        if($row2[0] < 2) {  //연장 횟수가 2보다 작다면 연장 가능, DATEDUE에 10 더해주기
            $stmt = $conn -> prepare("UPDATE EBOOK
            SET EXTTIMES = EXTTIMES + 1, DATEDUE = DATEDUE + 10
            WHERE ISBN = :isbn");
            $stmt -> bindParam(":isbn", $isbn);
            $stmt -> execute();
            echo "success"; //성공
        } else {
            echo "exceed";  //연장 횟수 초과
        }
    } else {
        echo "fail";        //예약한 회원 있음, 연장 실패
    }
?>
