<?php
require_once("server.php");
$event=$_GET["event"];

switch ($event) {
	case "insert":
        $matl=$_GET["matl"];
        $tentl=$_GET["tentl"];   
        $sql="INSERT INTO `theloai` (matl,tentl) VALUES('".$matl."','".$tentl."')";
        if (mysqli_query($conn, $sql))//cấu trúc: mysqli_query(connection, query, resultmode)
        {//Đặt chế độ nếu insert thành công thì...
            $res[$event] = 1;
        }
        else
        {//Không insert thành công thì...
            $res[$event] = 0;
        } 
        echo json_encode($res);//Cấu trúc: json_encode(value, options, depth), Ở đây giống như đang mã hóa thì phải
        mysqli_close($conn);//Đóng kết nối SCDL trước đó
        break;
        
	case "delete":
        $matl=$_GET["matl"];
        $sql="DELETE FROM `theloai` WHERE matl='".$matl."'";
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

    case "updatetl":
        $matl=$_GET["matl"];
        $tentl=$_GET["tentl"];
        $sql="UPDATE  `theloai` SET tentl='".$tentl."' WHERE matl='".$matl."'";
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "getDSTheLoai":
        $mang=array();
        
        $record=$_GET['record'];//biến dùng để phân trang
        $page=$_GET['page'];
        
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;//Lấy $record dòng, tính từ thứ tự thứ $vt của kết tập kết quả
        $sql=mysqli_query($conn,"select matl,tentl from theloai ".$limit); 
		while($rows=mysqli_fetch_array($sql))//Duyệt 
        {
            $id=$rows['matl'];//Đặt id để matl của từng trang không bị trùng
            $usertemp['matl']=$rows['matl'];
            $usertemp['tentl']=$rows['tentl'];
            
            $mang[$id]=$usertemp;
            /*
            Cái này sẽ tạo ra object json kiểu như này:
            "items":{
                "th":{
                "matls":"th",
                "tentls":"tin hoc"
                },
                "kt":{
                "matls":"kt",
                "tentls":"K\u1ebf To\u00e1n"
                }
            }
            */
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from theloai");//Duyệt số thứ tự
        $row=mysqli_fetch_array($rs);//Cấu trúc mysqli_fetch_array(result,resulttype)
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
		
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;
         
    case "UpdateAvatar":
        $avartar=$_POST['avartar'];
        $username=$_POST['username']; 
        $sql="update user set avatar='".$avartar."' where username='".$username."'";
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
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