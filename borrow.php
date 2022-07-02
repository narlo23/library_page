<?php       //도서 상세 페이지의 대출 정보를 출력하기 위한 php
    $isbn = $_POST['isbn'];

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

    $stmt = $conn -> prepare("SELECT ISBN, CNO, EXTTIMES, DATERENTED, DATEDUE 
    FROM EBOOK
    WHERE ISBN = :isbn");
    $stmt -> bindParam(":isbn", $isbn);
    $stmt -> execute();
        
    $row = $stmt->fetch(PDO::FETCH_NUM);
    echo json_encode($row);
    
?>