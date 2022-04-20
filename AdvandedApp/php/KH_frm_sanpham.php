<?php
require_once("server.php");
$event=$_GET["event"];

switch ($event) {
	case "slsp_of_kh":
        $makh=$_GET['makh'];
        $sql=mysqli_query($conn,"SELECT COUNT(Product_ID) AS slsp FROM `orders_detail`,`orders`
        WHERE orders.Order_ID=orders_detail.Order_ID AND orders.Cus_ID='".$makh."'AND Status=0");
        $jsonData['items']=mysqli_fetch_row($sql);
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;
	// case "Xoahang":

    case "getsp":
		$mang=array();
        
        $record=$_GET['record'];//biến dùng để phân trang
        $page=$_GET['page'];
        
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;//Lấy $record dòng, tính từ thứ tự thứ $vt của kết tập kết quả

        $sql=mysqli_query($conn,"select Product_ID,Product_Name,Actual_Price,Quoted_Price,Category_ID,Supplier_ID,img from products ".$limit);
		while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Product_ID'];//Không lặp tên theo từng trang
            $usertemp['Product_ID']=$rows['Product_ID'];
            $usertemp['Product_Name']=$rows['Product_Name'];
            $usertemp['Actual_Price']=$rows['Actual_Price'];
            $usertemp['Quoted_Price']=$rows['Quoted_Price'];
            $usertemp['img']=$rows['img'];
            
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from products");//Duyệt số thứ tự
        $row=mysqli_fetch_array($rs);//Cấu trúc mysqli_fetch_array(result,resulttype)
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
		
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
	default:
        # code...
        break;
}
?>