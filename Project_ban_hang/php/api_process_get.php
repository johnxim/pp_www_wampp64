<?php
    $event=$_GET["event"];
    switch ($event)
    {
        case "Guidata":
        echo "Hi, bạn đang gọi event Guidata of GET";
        break;
        default:
        echo "Bạn đang cố gắng xâm nhập GET?";
        break;
    }
?>