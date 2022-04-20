var recordsp=8;//Biến cố định bản ghi

//----------------//
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;



$('.admin_frm_sp').click(function(){
	$('.actives').html('Sản phẩm');
	$('.form_sp').removeClass('hidden');
	$('.form_cthd').addClass('hidden');
	$('.form_hd').addClass('hidden');
	$('.form_kh').addClass('hidden');
	$('.form_ncc').addClass('hidden');
	$('.form_shipper').addClass('hidden');
	$('.form_tl').addClass('hidden');
	builddssp_admin(0,recordsp);
});


$('.admin_frm_cthd').click(function(){
	$('.actives').html('Chi tiết hóa đơn');
	$('.form_cthd').removeClass('hidden');
	$('.form_sp').addClass('hidden');
	$('.form_hd').addClass('hidden');
	$('.form_kh').addClass('hidden');
	$('.form_ncc').addClass('hidden');
	$('.form_shipper').addClass('hidden');
	$('.form_tl').addClass('hidden');
	builddscthd(0,recordsp);
});


$('.admin_frm_hd').click(function(){
	$('.actives').html('Hóa đơn');
	$('.form_hd').removeClass('hidden');
	$('.form_cthd').addClass('hidden');
	$('.form_sp').addClass('hidden');
	$('.form_kh').addClass('hidden');
	$('.form_ncc').addClass('hidden');
	$('.form_shipper').addClass('hidden');
	$('.form_tl').addClass('hidden');
	xnyc='1';
    builddshd(0,recordsp);
});


$('.admin_frm_kh').click(function(){
	$('.actives').html('Khách hàng');
	$('.form_kh').removeClass('hidden');
	$('.form_cthd').addClass('hidden');
	$('.form_hd').addClass('hidden');
	$('.form_sp').addClass('hidden');
	$('.form_ncc').addClass('hidden');
	$('.form_shipper').addClass('hidden');
	$('.form_tl').addClass('hidden');
	builddskh_admin(0,recordsp);
});


$('.admin_frm_ncc').click(function(){
	$('.actives').html('Nhà cung cấp');
	$('.form_ncc').removeClass('hidden');
	$('.form_cthd').addClass('hidden');
	$('.form_hd').addClass('hidden');
	$('.form_kh').addClass('hidden');
	$('.form_sp').addClass('hidden');
	$('.form_shipper').addClass('hidden');
	$('.form_tl').addClass('hidden');
	buildds_ncc_admin(0,recordsp);
});


$('.admin_frm_shipper').click(function(){
	$('.actives').html('Shipper');
	$('.form_shipper').removeClass('hidden');
	$('.form_cthd').addClass('hidden');
	$('.form_hd').addClass('hidden');
	$('.form_kh').addClass('hidden');
	$('.form_ncc').addClass('hidden');
	$('.form_sp').addClass('hidden');
	$('.form_tl').addClass('hidden');
	builddsshipper_admin(0,recordsp);
});


$('.admin_frm_tl').click(function(){
	$('.actives').html('Thể loại');
	$('.form_tl').removeClass('hidden');
	$('.form_cthd').addClass('hidden');
	$('.form_hd').addClass('hidden');
	$('.form_kh').addClass('hidden');
	$('.form_ncc').addClass('hidden');
	$('.form_shipper').addClass('hidden');
	$('.form_sp').addClass('hidden');
	builddstheloai_admin(0,recordsp);
});


//Trả dữ liệu dạng JSON
function queryDataGET_JSON(url, dataSend, callback) {
	$.ajax({
		type: 'GET',
		url: url,
		data: dataSend,
		async: true,
		dataType: 'JSON',
		success: callback
	});
}

function queryDataGET_TEXT(url, dataSend, callback) {
	$.ajax({
		type: 'GET',
		url: url,
		data: dataSend,
		async: true,
		dataType: 'text',//để giá trị nào thì trên server phải định nghĩa như vậy
		success: callback
	});
}

//Hàm hiển thị stt trong table
function printSTT(record,pageCurr){
    if ((pageCurr+1)==1) {
        return 1;
    }else{
        return record*(pageCurr+1)-(record-1);
    }
}

//Hàm chia slide số
function buildSlidePage(obj,codan,pageActive,totalPage) {
    var html="";
    pageActive=parseInt(pageActive);
    for(i = 1 ; i <=codan; i++) {//Duyệt nếu quá codan thì sẽ xuất hiện ...
        if(pageActive-i<0) break;
        html='<button type="button" class="btn btn-default" value="'+(pageActive-i)+'">'+(pageActive-i+1)+'</button>'+html;
	}
	
    if(pageActive>codan){//Nếu trang đang chọn lớn hơn codan thì thêm ...
        html='<button type="button" class="btn btn-default" value="'+(pageActive-i)+'">...</button>'+html;
	}
	
	html+='<button type="button" class="btn btn-info" value="'+pageActive+'">'+(pageActive+1)+'</button>';
	
    for(i = 1 ; i <=codan; i++){
        if(pageActive+i>=totalPage) break;
        html=html+'<button type="button" class="btn btn-default" value="'+(pageActive+i)+'">'+(pageActive+i+1)+'</button>';
    }
    if(totalPage-pageActive>codan+1){
        html=html+'<button type="button" value="'+(pageActive+i)+'" class="btn btn-default">...</button>';
    }
    obj.html(html);
}

//Hàm giữ nguyên vị trí khi thêm xóa sửa
function nochangespadmin(){
	builddssp_admin(sp_current,recordsp);
	$(".txtmasp").val("");
    $(".txttensp").val("");
    $(".txtgiathucsp").val("");
    $(".txtgianysp").val("");
    $(".anhspadmin").attr("src", "");
}

function nochangeshipperadmin(){
	builddsshipper_admin(sp_current,recordsp);
	$(".txtmashipper").val("");
    $(".txttenshipper").val("");
	$(".txtsdtshipper").val("");
}

function nochangetladmin(){
	builddstheloai_admin(sp_current,recordsp);
	$(".txtmatl").val("");
    $(".txttentl").val("");
}

function nochange_ncc_admin(){
	buildds_ncc_admin(sp_current,recordsp);
	$(".txtmancc").val("");
	$(".txttenncc").val("");
    $(".txtdiachincc").val("");
}


// $(".btnspmenu").click(function(){
// 	var diachi=localStorage.getItem("diachi");
// 	alert_info(diachi);
// });

/******************************************************************************************************************************/

//Hàm kiểm tra số
function isNumber(n){
	return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

//Hàm alert
function alert_info(hehe){
	bootbox.alert({
		size: "small",
		title: "Thông báo",
		message: hehe,
		callback: function(){ /* you call back code */}
	});
}
function alert_error(me) {
	bootbox.alert({
		size: "small",
		title: "<span style='color: red'>Thất bại</span>",
		message: me,
		callback: function () { /* you call back code */ }
	});
}
function alert_success(mes) {
	bootbox.alert({
		size: "small",
		title: "Thành công",
		message: mes,
		callback: function(){}
	});
}

//Hàm định dạng số tiền
$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}