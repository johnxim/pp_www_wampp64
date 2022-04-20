<?php
require_once("server.php");
$event=$_GET["event"];

switch ($event) {

    case "getspdetail":
        $mang=array();
        $masp=$_GET["masp"];

        $sql=mysqli_query($conn,"SELECT Product_ID,Product_Name,Actual_Price,Quoted_Price,Category_ID,Supplier_ID,img FROM products WHERE Product_ID = '".$masp."'");
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Product_ID'];//Không lặp ID theo từng trang
            $usertemp['Product_ID']=$rows['Product_ID'];
            $usertemp['Product_Name']=$rows['Product_Name'];
            $usertemp['Actual_Price']=$rows['Actual_Price'];
            $usertemp['Quoted_Price']=$rows['Quoted_Price'];
            $usertemp['Category_ID']=$rows['Category_ID'];
            $usertemp['Supplier_ID']=$rows['Supplier_ID'];
            $usertemp['img']=$rows['img'];
            
            $mang[$id]=$usertemp;
        }
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    case 'timkiem':
        $masp=$_GET["masp"];
        $mang=array();
        
        $sql=mysqli_query($conn,"SELECT * FROM `products` WHERE Product_ID='".$masp."'");
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Product_ID'];//Không lặp ID theo từng trang
            $usertemp['Product_ID']=$rows['Product_ID'];
            $usertemp['Product_Name']=$rows['Product_Name'];
            $usertemp['Actual_Price']=$rows['Actual_Price'];
            $usertemp['Quoted_Price']=$rows['Quoted_Price'];
            $usertemp['Category_ID']=$rows['Category_ID'];
            $usertemp['Supplier_ID']=$rows['Supplier_ID'];
            $usertemp['img']=$rows['img'];
            
            $mang[$id]=$usertemp;
        }
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

	case "insertsp":
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
    
    case "getspadmin":
        $mang=array();
        
        $record=$_GET['record'];//biến dùng để phân trang
        $page=$_GET['page'];
        
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;//Lấy $record dòng, tính từ thứ tự thứ $vt của kết tập kết quả

        $sql=mysqli_query($conn,"select Product_ID,Product_Name,Actual_Price,Quoted_Price,Category_ID,Supplier_ID,img from products ".$limit);
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Product_ID'];//Không lặp ID theo từng trang
            $usertemp['Product_ID']=$rows['Product_ID'];
            $usertemp['Product_Name']=$rows['Product_Name'];
            $usertemp['Actual_Price']=$rows['Actual_Price'];
            $usertemp['Quoted_Price']=$rows['Quoted_Price'];
            $usertemp['Category_ID']=$rows['Category_ID'];
            $usertemp['Supplier_ID']=$rows['Supplier_ID'];
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
    
    case 'updatesp':
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

    case "deletesp":
        $masp=$_GET["masp"];
        $sql="DELETE FROM `products` WHERE Product_ID='".$masp."'";
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