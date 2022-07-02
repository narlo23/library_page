<?php   //상세 검색 기능을 구현한 php
    $selectbook = $_POST["selectbook"];
    $bookname = $_POST["bookname"];
    $op1 = $_POST["op1"];
    $selectauthor = $_POST["selectauthor"];
    $author = $_POST["author"];
    $op2 = $_POST["op2"];
    $selectpublisher = $_POST["selectpublisher"];
    $publisher = $_POST["publisher"];
    $op3 = $_POST["op3"];
    $selectyear = $_POST["selectyear"];
    $startyear = $_POST["startyear"];
    $endyear = $_POST["endyear"];
    
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

    
    $query = "SELECT EBOOK.ISBN, TITLE, AUTHOR, PUBLISHER, EXTRACT(YEAR FROM YEAR) AS YEAR
    FROM EBOOK, AUTHORS
    WHERE AUTHORS.ISBN = EBOOK.ISBN ";
    
    $selectlist = [false, false, false, false];     //bookname, author, publisher, year 검색 조건 선택 여부 저장
    if($selectbook == "bookname") { //책 제목 검색 쿼리 추가
        $selectlist[0] = true;
        $query.="AND (LOWER(TITLE) LIKE '%' || :bookname || '%' ";  
    }
    if($selectauthor == "author") {  //저자 검색 조건 추가
        $selectlist[1] = true;
        if($selectlist[0] == false) {
            $query.="AND (LOWER(AUTHOR) LIKE '%' || :author || '%' ";
        } else {
            if($op1 == "not") { //not 연산자인 경우
                $query.="AND LOWER(AUTHOR) NOT LIKE '%' || :author || '%' ";
            } else {    //and, or 연산자인 경우
                $query.=$op1." LOWER(AUTHOR) LIKE '%' || :author || '%' ";
            }
        }
    }
    if($selectpublisher == "publisher") {    //출판사 검색 조건 추가
        $selectlist[2] = true;
        if($selectlist[0] == false && $selectlist[1] == false) {
            $query.="AND (LOWER(PUBLISHER) LIKE '%' || :publisher || '%' ";
        } else {
            if($op2 == "not") { //not 연산자인 경우
                $query.="AND LOWER(PUBLISHER) NOT LIKE '%' || :publisher || '%' ";
            } else {    //and, or 연산자인 경우
                $query.=$op2." LOWER(PUBLISHER) LIKE '%' || :publisher || '%' ";
            }
        }
    }
    if($selectyear == "year") {     //발행년도 검색 조건 추가
        $selectlist[3] = true;
        if($selectlist[0] == false && $selectlist[1] == false && $selectlist[2] == false) {
            $query.="AND (EXTRACT(YEAR FROM YEAR) BETWEEN :startyear AND :endyear ";
        } else {
            if($op3 == "not") { //not 연산자인 경우
                $query.="AND EXTRACT(YEAR FROM YEAR) NOT BETWEEN :startyear AND :endyear ";
            } else {    //and, or 연산자인 경우
                $query.=$op3." EXTRACT(YEAR FROM YEAR) BETWEEN :startyear AND :endyear ";
            }
        }
    }

    $query.=") ORDER BY TITLE";
    $stmt = $conn -> prepare($query);

    //파라미터 추가
    if($selectbook == "bookname") {
        $stmt -> bindParam(":bookname", $bookname);
    }
    if($selectauthor == "author") {
        $stmt -> bindParam(":author", $author);
    }
    if($selectpublisher == "publisher") {
        $stmt -> bindParam(":publisher", $publisher);
    }
    if($selectyear == "year") {
        $stmt -> bindParam(":startyear", $startyear);
        $stmt -> bindParam(":endyear", $endyear);
    }
    //실행
    $stmt -> execute();

    //저자가 여러명인 경우를 위한 코드
    $isbnarr = [];
    $result = [];
    while($row = $stmt->fetch(PDO::FETCH_NUM)) {
        $tmp = ["isbn" => "", "title" => "", "publisher" => "", "year" => "", "authors" => array()];
        $isinarr = false;
        foreach($isbnarr as $isbn) {
            if($isbn == $row[0]) {      //EBOOK 테이블의 PK인 isbn이 리스트에 존재하는 경우 이미 존재하는 데이터, authors에만 저자 추가
                $isinarr = true;
                $i = array_search($isbn, array_column($result, "isbn"));
                array_push($result[$i]['authors'], $row[2]);
            }
        }

        if(!$isinarr) { //EBOOK 테이블의 PK인 isbn이 리스트에 존재하지 않는 경우 처음 넣는 데이터
            array_push($isbnarr, $row[0]);

            $tmp["isbn"] = $row[0];
            $tmp["title"] = $row[1];
            $tmp["publisher"] = $row[3];
            $tmp["year"] = $row[4];
            array_push($tmp["authors"], $row[2]);

            $result[] = $tmp;
        }
    }

    echo json_encode($result, JSON_UNESCAPED_UNICODE);      //json으로 php에서 js로 정보 전달
?>