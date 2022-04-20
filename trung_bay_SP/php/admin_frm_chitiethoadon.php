<?php
require_once("server.php");
$event=$_GET["event"];

switch ($event) {
    case "getcthd":
        $mang=array();
        
        $record=$_GET['record'];//biến dùng để phân trang
        $page=$_GET['page'];
        
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;//Lấy $record dòng, tính từ thứ tự thứ $vt của kết tập kết quả
        $sql=mysqli_query($conn,"SELECT Order_ID,Product_ID,Quantity,Discount,Price FROM orders_detail ".$limit);

        //$i=0;//Hãy thử dùng biến này dùng để lưu json
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Order_ID'];
            $usertemp['Order_ID']=$rows['Order_ID'];
            $usertemp['Product_ID']=$rows['Product_ID'];
            $usertemp['Quantity']=$rows['Quantity'];
            $usertemp['Discount']=$rows['Discount'];
            $usertemp['Price']=$rows['Price'];
            
            $mang[$rows['Order_ID']]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from orders_detail");//Duyệt số thứ tự
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