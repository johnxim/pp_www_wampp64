<?php       
    $uploaddir = '/var/sentora/hostdata/zadmin/public_html/viennhagroup_com/upload/';
    $uploadfile = $uploaddir . basename($_FILES['pdf_file']['name']);

	session_start();
    $allowedExts = array("pdf");
    $filename = md5(mt_rand());
    $temp = explode(".", $_FILES["pdf_file"]["name"]);
    $extension = end($temp);
    $upload_pdf=$_FILES["pdf_file"]["name"];
    $status = (boolean) move_uploaded_file($_FILES["pdf_file"]["tmp_name"],$uploadfile);
    $response = (object) [
        'status' => $status
    ];

    if ($status){
        $response->url = $upload_pdf;
    }

    echo json_encode($response);
?>


