<?php
require_once("server.php");
$event=$_GET["event"];

switch ($event) {

    case "getgh":
        $mang=array();
        
        $makh=$_GET["makh"];
        
        $sql=mysqli_query($conn,"SELECT Cus_ID, products.Product_ID as masp, orders.Order_ID as mahd, Product_Name, img, Price, Quantity, total, Status  FROM `orders`,`orders_detail`,`products`WHERE orders.Order_ID = orders_detail.Order_ID AND products.Product_ID=orders_detail.Product_ID AND orders.Cus_ID='".$makh."' AND Status=0");
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Product_Name'];//Không lặp ID theo từng trang
            $usertemp['Cus_ID']=$rows['Cus_ID'];
            $usertemp['masp']=$rows['masp'];
            $usertemp['mahd']=$rows['mahd'];
            $usertemp['Product_Name']=$rows['Product_Name'];
            $usertemp['img']=$rows['img'];
            $usertemp['Price']=$rows['Price'];
            $usertemp['Quantity']=$rows['Quantity'];
            $usertemp['total']=$rows['total'];
            $usertemp['Status']=$rows['Status'];//Lấy status để cập nhật là đã thanh toán hay chưa           
            $mang[$id]=$usertemp;
        }
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;
    
    case 'updategh':
        $sl=$_GET["sl"];
        $tongtien=$_GET["tongtien"];
        $mahd=$_GET["mahd"];
        $masp=$_GET["masp"];

        $sql="UPDATE `orders_detail` SET Quantity='".$sl."', total='".$tongtien."' WHERE Order_ID='".$mahd."' AND Product_ID='".$masp."'";
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

    case "thanhtoan":
        $tongtienhd=$_GET["tongtienhd"];
        $mahd=$_GET["mahd"];
        $dateTime=$_GET["dateTime"];

        $sql="UPDATE `orders` SET Order_Date='".$dateTime."', total_price='".$tongtienhd."', Status=1 WHERE Order_ID='".$mahd."'";
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
    
    case "xoagh":
        $mahd=$_GET["mahd"];
        $masp=$_GET["masp"];

        $sql="DELETE FROM `orders_detail` WHERE Order_ID='".$mahd."' AND Product_ID='".$masp."'";
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

        case "kiemtragh_of_kh":
            $makh=$_GET["makh"];
            
            $sql=mysqli_query($conn,"SELECT Cus_ID, Status  FROM `orders` WHERE Cus_ID='".$makh."' AND Status=0");
            
            echo mysqli_affected_rows($conn);
            
            mysqli_close($conn);
            break;

    default:
        break;
}
?>