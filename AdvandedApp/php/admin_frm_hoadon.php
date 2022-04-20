<?php
require_once("server.php");
$event=$_GET["event"];

switch ($event) {
    case "getmahd":
        $makh=$_GET["makh"];
        
        $sql=mysqli_query($conn,"SELECT `Order_ID` FROM `orders` WHERE Cus_ID='".$makh."' AND Status=0");
        while($rows=mysqli_fetch_array($sql)){
            $usertemp['Order_ID']=$rows['Order_ID'];
        }
        
        echo json_encode($usertemp);
        mysqli_close($conn);
        break;

    case "gethd":
        $mang=array();
        $xnyc=$_GET['xnyc'];
        
        $record=$_GET['record'];//biến dùng để phân trang
        $page=$_GET['page'];
        
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;//Lấy $record dòng, tính từ thứ tự thứ $vt của kết tập kết quả
        if($xnyc==1){
            $sql=mysqli_query($conn,"SELECT Order_ID,Cus_ID,Order_Date,total_price,Shipper_ID,Status FROM orders ".$limit);
        }
        else if($xnyc==2){
            $sql=mysqli_query($conn,"SELECT Order_ID,Cus_ID,Order_Date,total_price,Shipper_ID,Status FROM orders WHERE Status='1' ".$limit);
        }
        else{
            $sql=mysqli_query($conn,"SELECT Order_ID,Cus_ID,Order_Date,total_price,Shipper_ID,Status FROM orders WHERE Status!='1' ".$limit);
        }
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Order_ID'];//Không lặp mã kh theo từng trang
            $usertemp['Order_ID']=$rows['Order_ID'];
            $usertemp['Cus_ID']=$rows['Cus_ID'];
            $usertemp['Order_Date']=$rows['Order_Date'];
            $usertemp['total_price']=$rows['total_price'];
            $usertemp['Shipper_ID']=$rows['Shipper_ID'];
            $usertemp['Status']=$rows['Status'];
            
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from orders");//Duyệt số thứ tự
        $row=mysqli_fetch_array($rs);//Cấu trúc mysqli_fetch_array(result,resulttype)
        $jsonData['total'] =(int)$row['total'];
        $jsonData['totalpage'] =ceil($row['total']/$record);
        $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;


    case "inserthd"://Dùng để lưu thông tin khi khách hàng thực hiện mua hàng
        $makh=$_GET["makh"];
        $date=$_GET["date"];
        $gia=$_GET["gia"];

        $sql="INSERT INTO `orders`(`Order_ID`, `Cus_ID`, `Order_Date`, `total_price`, `Shipper_ID`, `Status`) VALUES (NULL,'".$makh."','".$date."',".$gia.",NULL,b'0')";
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