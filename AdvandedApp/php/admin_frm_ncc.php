<?php
require_once("server.php");
$event=$_GET["event"];

switch ($event) {

    case "getmancc":
        $mang=array();
        
        $sql=mysqli_query($conn,"select Supplier_ID,Supplier_Name from suppliers ");
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Supplier_ID'];//Không lặp ID theo từng trang
            $usertemp['Supplier_ID']=$rows['Supplier_ID'];
            $usertemp['Supplier_Name']=$rows['Supplier_Name'];
            
            $mang[$id]=$usertemp;
        }
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    case 'timkiem':
        $mancc=$_GET["mancc"];
        $mang=array();
        
        $sql=mysqli_query($conn,"SELECT * FROM `suppliers` WHERE Supplier_ID='".$mancc."'");
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Supplier_ID'];//Không lặp ID theo từng trang
            $usertemp['Supplier_ID']=$rows['Supplier_ID'];
            $usertemp['Supplier_Name']=$rows['Supplier_Name'];
            $usertemp['Supplier_Address']=$rows['Supplier_Address'];
            
            $mang[$id]=$usertemp;
        }
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

	case "insertncc":
        $mancc=$_GET["mancc"];
        $tenncc=$_GET["tenncc"];
        $diachincc=$_GET["diachincc"];
        
        $sql="INSERT INTO `suppliers` (Supplier_ID, Supplier_Name, Supplier_Address) VALUES('".$mancc."','".$tenncc."','".$diachincc."')";
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
    
    case "getnccadmin":
        $mang=array();
        
        $record=$_GET['record'];//biến dùng để phân trang
        $page=$_GET['page'];
        
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;//Lấy $record dòng, tính từ thứ tự thứ $vt của kết tập kết quả

        $sql=mysqli_query($conn,"select Supplier_ID,Supplier_Name,Supplier_Address from suppliers ".$limit);
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Supplier_ID'];//Không lặp ID theo từng trang
            $usertemp['Supplier_ID']=$rows['Supplier_ID'];
            $usertemp['Supplier_Name']=$rows['Supplier_Name'];
            $usertemp['Supplier_Address']=$rows['Supplier_Address'];
            
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from suppliers");//Duyệt số thứ tự
        $row=mysqli_fetch_array($rs);//Cấu trúc mysqli_fetch_array(result,resulttype)
        $jsonData['total'] =(int)$row['total'];
        $jsonData['totalpage'] =ceil($row['total']/$record);
        $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;
    
    case 'updatencc':
        $mancc=$_GET["mancc"];
        $tenncc=$_GET["tenncc"];
        $diachincc=$_GET["diachincc"];
        $sql="UPDATE `suppliers` SET Supplier_Name='".$tenncc."', Supplier_Address='".$diachincc."' WHERE Supplier_ID='".$mancc."'";
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

    case "deletencc":
        $mancc=$_GET["mancc"];
        $sql="DELETE FROM `suppliers` WHERE Supplier_ID='".$mancc."'";
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
        break;
}
?>