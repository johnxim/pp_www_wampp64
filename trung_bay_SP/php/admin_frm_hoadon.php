<?php
require_once("server.php");
$event=$_GET["event"];
$a=$_GET['a'];

switch ($event) {
    case "gethd":
        $mang=array();
        
        $record=$_GET['record'];//biến dùng để phân trang
        $page=$_GET['page'];
        
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;//Lấy $record dòng, tính từ thứ tự thứ $vt của kết tập kết quả
        if($a==1){
            $sql=mysqli_query($conn,"SELECT Order_ID,Cus_ID,Order_Date,total_price,Shipper_ID,Status FROM orders ".$limit);
        }
        else if($a==2){
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


    case "insertkh"://Dùng để lưu thông tin khi khách hàng thực hiện mua hàng
        $masp=$_GET["masp"];
        $tensp=$_GET["tensp"];
        $giathuc=$_GET["giathuc"];
        $gianiemyet=$_GET["gianiemyet"];
        $matl=$_GET["matl"];
        $mancc=$_GET["mancc"];
        $anh=$_GET["anh"];
        
        $sql="INSERT INTO `products` (Product_ID, Product_Name, Actual_Price, Quoted_Price, Category_ID, Supplier_ID, img) VALUES('".$masp."','".$tensp."','".$giathuc."','".$gianiemyet."','".$matl."','".$mancc."','".$anh."')";
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