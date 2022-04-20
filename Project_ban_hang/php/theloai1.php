<?php
require_once("server.php");
$event=$_POST["event"];

switch ($event) {
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