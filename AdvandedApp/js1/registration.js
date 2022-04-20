$('.btn_dangky').click(function(){
    // alert_info('hello');
    var tenkh=$('.txtten').val();
    var diachi=$('.txtdiachi').val();
    var sdt=$('.txtsdt').val();
    var acc=$('.txtacc').val();
    var pass=$('.txtpass').val();
    var anh=$('#fileToUpload').val().slice(12,$('#fileToUpload').val().length);
    if(sdt.length>10 || isNumber(sdt)==false || tenkh=='' || diachi==''|| acc==''){
        alert_info("Vui lòng nhập đúng thông tin");
    }
    else{
        var dataSend={
            event: 'dangky',
            tenkh: tenkh,
            sdt: sdt,
            diachi: diachi,
            acc: acc,
            pass: pass,
            avt: anh
        }
        queryDataGET_JSON("php/admin_frm_khachhang.php", dataSend, function(res){
            console.log(res);
            if(res["dangky"]==1){
                alert_info("Đăng ký thành công!");
            }
            else{
                alert_error("Đăng ký thất bại!");
            }
        });
    }
    
});