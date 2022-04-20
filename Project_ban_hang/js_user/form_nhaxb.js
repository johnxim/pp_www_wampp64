

$(".btn_themnxb").click(function(){
	var manxb=$(".txtmanxb").val();//Lấy giá trị của ô dữ liệu mã thể loại
    var tennxb=$(".txttennxb").val();
    var sdtnxb=$(".txtsdtnxb").val();
    var diachinxb=$(".txtdiachinxb").val();
    var emailnxb=$(".txtemailnxb").val();
	if(manxb.length!=5){
        alert_info("Mã NXB cần phải là 5 ký tự!");
    }
    else if(tennxb==""){
        alert_info("Tên NXB cần phải khác khoảng trống");
    }
    else if(isNumber(sdtnxb)==false || sdtnxb.length!=10){
        alert_info("SĐT cần phải là số và là 10 ký tự!");
    }
    else if(diachinxb==""){
        alert_info("Địa chỉ không được để trống");
    }
    else if(validateEmail(emailnxb)==false){
        alert_info("Email bạn nhập sai, vui lòng nhập lại email!");
    }
    else{
        alert_info("Thêm thành công!");
    }

	// else if(tennxb==""){
    //     alert_info("tennxb cần phải khác khoảng trống");
    // }
    // else if(manxb==""&&tennxb=""){
    //     alert_info("manxb và tennxb cần phải khác khoảng trống");
    // }
	// else{
    //     alert_info("Bạn nhập mã nhà xuất bản: "+manxb+" và tên nhà xuất bản: "+tennxb);
	// }
});

$(".btn_luunxb").click(function(){
	var manxb=$(".txtmanxb").val();//Lấy giá trị của cái mà ta nhập
	var tennxb=$(".txttennxb").val();
    alert_info("Bạn nhập mã thể loại: "+manxb+" và tên thể loại: "+tennxb);
});
