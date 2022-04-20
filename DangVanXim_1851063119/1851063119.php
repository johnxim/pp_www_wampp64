<?php

$hostname = 'localhost';
$username = 'root';
$password = '';
$dbname = "giuaky";
$port = 3306;
$conn = mysqli_connect($hostname, $username, $password,$dbname, $port);

if (!$conn){
 die('Không thể kết nối: ' . mysqli_error($conn));
 exit();
}

mysqli_set_charset($conn,"utf8");

//--------------------------------------------------//

$event=$_GET["event"];

switch ($event) {

    case "caua":
        $mang=array();
        
        $sql=mysqli_query($conn,"SELECT Makhoa, Tenkhoa FROM khoa");
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['Makhoa'];
            $usertemp['Makhoa']=$rows['Makhoa'];
            $usertemp['Tenkhoa']=$rows['Tenkhoa'];
            $mang[$id]=$usertemp;
        }
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    case "caub":
        $mang=array();
        $mang1=array();
        $mang2=array();
        $mang3=array();
        $mang4=array();


        $sql1=mysqli_query($conn,"SELECT `Makhoa`, `Tenkhoa` FROM `khoa` WHERE Makhoa='CNTT'");
        $sql2=mysqli_query($conn,"SELECT `id`, `Tenbomon` FROM `bomon` WHERE Makhoa='CNTT'");
        $sql3=mysqli_query($conn,"SELECT `Makhoa`, `Tenkhoa` FROM `khoa` WHERE Makhoa='KTQT'");
        $sql4=mysqli_query($conn,"SELECT `id`, `Tenbomon` FROM `bomon` WHERE Makhoa='KTQT'");

        // $sql=mysqli_query($conn,"SELECT khoa.Makhoa as Makhoa, Tenkhoa, id, Tenbomon FROM `bomon`, `khoa` WHERE bomon.Makhoa=khoa.Makhoa");
        while($rows=mysqli_fetch_array($sql2)){

            $usertem['id']=$rows['id'];
            $usertem['Tenbomon']=$rows['Tenbomon'];

            $mang2[]=$usertem;
        }
        while($rows=mysqli_fetch_array($sql1)){

            $usertemp['Makhoa']=$rows['Makhoa'];
            $usertemp['Tenkhoa']=$rows['Tenkhoa'];
            $usertemp['items']=$mang2;
            $mang1[]=$usertemp;
        }

        while($rows=mysqli_fetch_array($sql4)){

            $userte['id']=$rows['id'];
            $userte['Tenbomon']=$rows['Tenbomon'];

            $mang4[]=$userte;
        }
        while($rows=mysqli_fetch_array($sql3)){

            $usert['Makhoa']=$rows['Makhoa'];
            $usert['Tenkhoa']=$rows['Tenkhoa'];
            $usert['items']=$mang4;
            $mang3[]=$usert;
        }


        $jsonData['data'][0]=$mang1;
        $jsonData['data'][1]=$mang3;

        

        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    default:
        break;
}
?>
