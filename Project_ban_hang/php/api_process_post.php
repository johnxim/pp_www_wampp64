<?php
    $event=$_POST["event"];
    switch($event){
        case "Guidata":
            echo "Hi, Bạn đang gọi event Guidata of POST";
            break;
        case "Guidatapt":
            $a=$_POST["hesoa"];
            $b=$_POST["hesob"];
            if($a==0){
                if($b==0)
                    echo "PTVSN";
                else
                    echo "PTVN";
            }
            else{
                echo -$b/$a;
            }
            break;
        default:
            echo "Bạn đang cố gắng xâm nhập POST?";
            break;
    }
?>