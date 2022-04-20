<?php
require_once("server.php");
$event=$_GET["event"];

switch ($event) {
    case 'timkiemkh':
        $makh=$_GET["makh"];
        $mang=array();
        
        $sql=mysqli_query($conn,"SELECT * FROM `customers` WHERE Cus_ID='".$makh."'");
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Cus_ID'];//Không lặp mã kh theo từng trang
            $usertemp['Cus_ID']=$rows['Cus_ID'];
            $usertemp['Cus_Name']=$rows['Cus_Name'];
            $usertemp['Phone_Number']=$rows['Phone_Number'];
            $usertemp['Cus_Address']=$rows['Cus_Address'];
            $usertemp['Acc_username']=$rows['Acc_username'];
            $usertemp['Acc_password']=$rows['Acc_password'];
            $usertemp['avatar']=$rows['avatar'];
            
            $mang[$id]=$usertemp;
        }
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;
    
    case "getkhadmin":
        $mang=array();
        
        $record=$_GET['record'];//biến dùng để phân trang
        $page=$_GET['page'];
        
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;//Lấy $record dòng, tính từ thứ tự thứ $vt của kết tập kết quả

        $sql=mysqli_query($conn,"select Cus_ID,Cus_Name,Phone_Number,Cus_Address,Acc_username,Acc_password,avatar from customers ".$limit);
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Cus_ID'];//Không lặp mã kh theo từng trang
            $usertemp['Cus_ID']=$rows['Cus_ID'];
            $usertemp['Cus_Name']=$rows['Cus_Name'];
            $usertemp['Phone_Number']=$rows['Phone_Number'];
            $usertemp['Cus_Address']=$rows['Cus_Address'];
            $usertemp['Acc_username']=$rows['Acc_username'];
            $usertemp['Acc_password']=$rows['Acc_password'];
            $usertemp['avatar']=$rows['avatar'];
            
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from customers");//Duyệt số thứ tự
        $row=mysqli_fetch_array($rs);//Cấu trúc mysqli_fetch_array(result,resulttype)
        $jsonData['total'] =(int)$row['total'];
        $jsonData['totalpage'] =ceil($row['total']/$record);
        $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;
    
    case 'updatesp'://Dùng trong việc khách hàng thay đổi thông tin
        $masp=$_GET["masp"];
        $tensp=$_GET["tensp"];
        $giathuc=$_GET["giathuc"];
        $gianiemyet=$_GET["gianiemyet"];
        $matl=$_GET["matl"];
        $mancc=$_GET["mancc"];
        $anh=$_GET["anh"];
        $sql="UPDATE `products` SET Product_Name='".$tensp."', Actual_Price='".$giathuc."', Quoted_Price='".$gianiemyet."', Category_ID='".$matl."', Supplier_ID='".$mancc."', img='".$anh."' WHERE Product_ID='".$masp."'";
        if (mysqli_query($conn, $sql))//cấu trúc: mysqli_query(connection, query, resultmode)
        {
            $res[$event] = 1;
        }
        else
        {
            $res[$event] = 0;
        } 
        echo json_encode($res);//Cấu trúc: json_encode(value, options, depth), Ở đây giống như đang mã hóa thì phải
        mysqli_close($conn);
        break;

    case "dangky"://Dùng để lưu thông tin đăng ký
        $tenkh=$_GET["tenkh"];
        $sdt=$_GET["sdt"];
        $diachi=$_GET["diachi"];
        $acc=$_GET["acc"];
        $pass=md5($_GET["pass"]);
        $avt=$_GET["avt"];
        
        $sql="INSERT INTO `customers` (`Cus_ID`, `Cus_Name`, `Phone_Number`, `Cus_Address`, `Acc_username`, `Acc_password`, `avatar`) VALUES ('".$acc."', '".$tenkh."', '".$sdt."', '".$diachi."', '".$acc."', '".$pass."', '".$avt."')";
        if (mysqli_query($conn, $sql))//cấu trúc: mysqli_query(connection, query, resultmode)
        {
            $res[$event] = 1;
        }
        else
        {
            $res[$event] = 0;
        } 
        echo json_encode($res);//Cấu trúc: json_encode(value, options, depth), Ở đây giống như đang mã hóa thì phải
        mysqli_close($conn);
        break;
    
    
    default:
        break;
}
?>