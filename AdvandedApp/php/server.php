<?php

// $link = new mysqli('localhost', 'root', '', 'gumshop') or die ('Kết nối thất bại!') ;

$hostname = 'localhost';
$username = 'root';
$password = '';
$dbname = "gumshop";
$port = 3306;
$conn = mysqli_connect($hostname, $username, $password,$dbname, $port);

if (!$conn){//Nếu không tồn tại biến con
 die('Không thể kết nối: ' . mysqli_error($conn));
 exit();//không được thì tự thoát
}
// echo 'Current PHP version: ' . phpversion();
// echo 'Kết  nối thành công';
mysqli_set_charset($conn,"utf8");


?>
