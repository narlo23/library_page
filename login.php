<?php   //로그인 기능을 구현한 php
    if(!session_id()) {
        session_start();
    }

    $id = $_POST["id"];
    $pw = $_POST["pw"];

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
    $stmt = $conn -> prepare("SELECT * FROM EBOOKCUSTOMER WHERE CNO = ? ");
    $stmt -> execute(array($id));
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if($pw == $row['PASSWD']) {     //회원 번호, 비밀번호 일치
        $_SESSION['CNO'] = $row['CNO'];
        $_SESSION['NAME'] = $row['NAME'];
        $_SESSION['PASSWD'] = $row['PASSWD'];
        $_SESSION['EMAIL'] = $row['EMAIL'];
        $_SESSION['ADMIN'] = $row['ADMIN'];
        echo $_SESSION['CNO']." ".$_SESSION['NAME']." ".$_SESSION['PASSWD']." ".$_SESSION['EMAIL']." ".$_SESSION['ADMIN'];
    } else {        //비밀번호 틀림, 로그인 실패
        echo 0;
    }
?>