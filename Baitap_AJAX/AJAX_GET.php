<?php
    $bienevent=$_GET["event"];
    switch($bienevent){
        case "Guidatapt":
            $a=(float)$_GET["hesoa"];
            $b=(float)$_GET["hesob"];
            if($a==0){
                if($b==0)
                    echo "Phương trình vô số nghiệm";
                else
                    echo "Phương trình vô nghiệm";
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