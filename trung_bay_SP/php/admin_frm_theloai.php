<?php
require_once("server.php");
$event=$_GET["event"];

switch ($event) {
    
    case "gettl":
		$mang=array();
        
        $record=$_GET['record'];//biến dùng để phân trang
        $page=$_GET['page'];
        
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;//Lấy $record dòng, tính từ thứ tự thứ $vt của kết tập kết quả

        $sql=mysqli_query($conn,"select Category_ID,Category_Name from categories ".$limit);
		while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Category_ID'];//Không lặp tên theo từng trang
            $usertemp['Category_ID']=$rows['Category_ID'];
            $usertemp['Category_Name']=$rows['Category_Name'];
            
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from categories");//Duyệt số thứ tự
        $row=mysqli_fetch_array($rs);//Cấu trúc mysqli_fetch_array(result,resulttype)
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
		
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;
        
    case 'timkiem':
        $matl=$_GET["matl"];
        $mang=array();
        
        $sql=mysqli_query($conn,"SELECT * FROM `categories` WHERE Category_ID='".$matl."'");
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Category_ID'];//Không lặp ID theo từng trang
            $usertemp['Category_ID']=$rows['Category_ID'];
            $usertemp['Category_Name']=$rows['Category_Name'];
            
            $mang[$id]=$usertemp;
        }
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    case "inserttl":
        $matl=$_GET["matl"];
        $tentl=$_GET["tentl"];
        
        $sql="INSERT INTO `categories` (Category_ID, Category_Name) VALUES('".$matl."','".$tentl."')";
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
    
    case 'updatetl':
        $matl=$_GET["matl"];
        $tentl=$_GET["tentl"];
        $sql="UPDATE `categories` SET Category_Name='".$tentl."' WHERE Category_ID='".$matl."'";
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

    case "deletetl":
        $matl=$_GET["matl"];
        $sql="DELETE FROM `categories` WHERE Category_ID='".$matl."'";
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