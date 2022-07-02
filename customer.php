<?php
    $cno = $_POST['cno'];
    
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
    $query = "SELECT COUNT(*) FROM EBOOK WHERE CNO = :cno";
    $stmt = $conn -> prepare($query);
    $stmt -> bindParam(":cno", $cno);
    $stmt -> execute();

    $row = $stmt->fetch(PDO::FETCH_NUM);
    echo $row[0];
?>