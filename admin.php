<?php   //관리자 메뉴 - 조인을 이용한 질의
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

    $query = "SELECT ISBN, TITLE, PUBLISHER, DATERENTED, DATEDUE
    FROM EBOOK
    WHERE DATERENTED IS NOT NULL
    UNION
    SELECT P.ISBN, E.TITLE, E.PUBLISHER, P.DATERENTED, P.DATERETURNED
    FROM PREVIOUSRENTAL P JOIN EBOOK E
    ON P.ISBN = E.ISBN
    ORDER BY ISBN";

    $stmt = $conn -> prepare($query);
    $stmt -> execute();
        
    $result=[];
    while($row = $stmt->fetch(PDO::FETCH_NUM)) {
        array_push($result, $row);
    }
    echo json_encode($result);
?>