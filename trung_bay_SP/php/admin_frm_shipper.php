<?php
require_once("server.php");
$event=$_GET["event"];

switch ($event) {
    
    case "getshipper":
		$mang=array();
        
        $record=$_GET['record'];//biến dùng để phân trang
        $page=$_GET['page'];
        
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;//Lấy $record dòng, tính từ thứ tự thứ $vt của kết tập kết quả

        $sql=mysqli_query($conn,"select Shipper_ID,Shipper_Name,Phone_Number from shippers ".$limit);
		while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Shipper_ID'];//Không lặp tên theo từng trang
            $usertemp['Shipper_ID']=$rows['Shipper_ID'];
            $usertemp['Shipper_Name']=$rows['Shipper_Name'];
            $usertemp['Phone_Number']=$rows['Phone_Number'];
            
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from shippers");//Duyệt số thứ tự
        $row=mysqli_fetch_array($rs);//Cấu trúc mysqli_fetch_array(result,resulttype)
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
		
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;
        
    case 'timkiem':
        $masp=$_GET["masp"];
        $mang=array();
        
        $sql=mysqli_query($conn,"SELECT * FROM `shippers` WHERE Shipper_ID='".$masp."'");
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Shipper_ID'];//Không lặp ID theo từng trang
            $usertemp['Shipper_ID']=$rows['Shipper_ID'];
            $usertemp['Shipper_Name']=$rows['Shipper_Name'];
            $usertemp['Phone_Number']=$rows['Phone_Number'];
            
            $mang[$id]=$usertemp;
        }
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    case "insertshipper":
        $masp=$_GET["masp"];
        $tensp=$_GET["tensp"];
        $sdt=$_GET["sdt"];
        
        $sql="INSERT INTO `shippers` (Shipper_ID, Shipper_Name, Phone_Number) VALUES('".$masp."','".$tensp."','".$sdt."')";
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
    
    case 'updateshipper':
        $masp=$_GET["masp"];
        $tensp=$_GET["tensp"];
        $sdt=$_GET["sdt"];
        $sql="UPDATE `shippers` SET Shipper_Name='".$tensp."', Phone_Number='".$sdt."' WHERE Shipper_ID='".$masp."'";
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

    case "deleteshipper":
        $masp=$_GET["masp"];
        $sql="DELETE FROM `shippers` WHERE Shipper_ID='".$masp."'";
            mysqli_query($conn, $sql);
            if(mysqli_affected_rows($conn)>0){
                $res[$event] = 1;
            }
            else{
                $res[$event] = 0;
            }
        echo json_encode($res);
        mysqli_close($conn);
        break;

	default:
        # code...
        break;
}
?>