var recordsp=8;//Biến cố định bản ghi

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
    $(".txttlsp").val("");
    $(".txtnccsp").val("");
    $(".txtanhsp").val("");
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