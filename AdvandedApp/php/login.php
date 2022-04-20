<?php
require_once("server.php");
$event=$_GET["event"];

switch ($event) {

    case "login":
        $u=$_GET["username"];
        $p=md5($_GET["password"]);
        $check='';
        
        $sql=mysqli_query($conn,"select Cus_ID, Cus_Name, Phone_Number, Cus_Address, Acc_username, Acc_password, avatar from customers where Acc_username='".$u."' and Acc_password='".$p."'");
        //Ở bước trên nếu không có username hay password gì thì nó trả về json rỗng
		while($rows=mysqli_fetch_array($sql))
        {
            $usertemp['Cus_ID']=$rows['Cus_ID'];
            $usertemp['Cus_Name']=$rows['Cus_Name'];
            $usertemp['Phone_Number']=$rows['Phone_Number'];
            $usertemp['Cus_Address']=$rows['Cus_Address'];
            $usertemp['Acc_username']=$rows['Acc_username'];
            $usertemp['Acc_password']=$rows['Acc_password'];
            $usertemp['avatar']=$rows['avatar'];
            $check=$rows['Acc_username'];
        }
        if($check!=''){//Nếu json khác rỗng, tức là đã tìm thấy tài khoản hợp lệ
            $jsonData['event']=1;
            $jsonData['items']=$usertemp;
            // "event":1,
            // "items":{
            //     "username":"admin",
            //     "password":"c4ca4238a0b923820dcc509a6f75849b",
            //     "avatar":"IMG20190719055907.jpg"
            // }
            echo json_encode($jsonData);
        }
        else{
            $jsonData['event']=0;
            echo json_encode($jsonData);
        }
        mysqli_close($conn);
		 break;
	default:
        # code...
        break;
}
?>