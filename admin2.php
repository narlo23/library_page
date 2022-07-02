<?php   //관리자 메뉴 - 그룹 함수를 이용한 질의
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

    $query = "SELECT
    CASE GROUPING(PUBLISHER)
    WHEN 1 THEN 'All Publisher'
    ELSE PUBLISHER END AS \"출판사\",
    CASE GROUPING(TITLE)
    WHEN 1 THEN 'All Book'
    ELSE TITLE END AS \"책 제목\",
    COUNT(*) \"대출 횟수\"
    FROM RENTAL
    GROUP BY ROLLUP(PUBLISHER, TITLE)";

    $stmt = $conn -> prepare($query);
    $stmt -> execute();
        
    $result=[];
    while($row = $stmt->fetch(PDO::FETCH_NUM)) {
        array_push($result, $row);
    }
    echo json_encode($result);
?>