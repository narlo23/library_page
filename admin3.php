<?php   //관리자 메뉴 - 윈도우 함수를 이용한 질의

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

    $query = "SELECT TITLE \"책 제목\", PUBLISHER \"출판사\", RENT \"대출 횟수\",
    RANK() OVER (ORDER BY RENT DESC) \"순위\",
    FIRST_VALUE(TITLE) OVER (PARTITION BY PUBLISHER ORDER BY RENT DESC ROWS UNBOUNDED PRECEDING) AS \"출판사별 대표책\",
    ROUND(RATIO_TO_REPORT(RENT) OVER(PARTITION BY PUBLISHER), 2) AS \"출판사별 백분율\"
    FROM RENT_COUNT";

    $stmt = $conn -> prepare($query);
    $stmt -> execute();
        
    $result=[];
    while($row = $stmt->fetch(PDO::FETCH_NUM)) {
        array_push($result, $row);
    }
    echo json_encode($result);

?>