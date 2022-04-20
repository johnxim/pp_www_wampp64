

//Viết 1 hàm trong js
//Main là tên biến, vd:form_theloai
function swapmain(main) {
	$(".form_thongtintheloai").addClass("is_hidden");
	$(".form_thongtintacgia").addClass("is_hidden");
	$(".form_thongtinnxb").addClass("is_hidden");
	$(".form_dondh").addClass("is_hidden");
	$("." + main).removeClass("is_hidden");
}
//swapmain("form_thongtintacgia");


//Bắt sự kiện click
var recordtheloai=5;
$(".menu_theloai").click(function () {
	console.log("Click menu thể loại");
	swapmain("form_thongtintheloai");
	var html = '<li><a href="#">' +
		'<i class="fa fa-home">' +
		'</i>Trang chủ</a></li>' +
		'<li class="active">Thể loại</li>'
	$(".titlebreadcrumb").html(html);

	builddstheloai(0,recordtheloai);// Gọi hàm để in danh sách

});

$(".menu_tacgia").click(function () {
	console.log("Click menu tác giả");
	swapmain("form_thongtintacgia");
	var html = '<li><a href="#">' +
		'<i class="fa fa-home">' +
		'</i>Trang chủ</a></li>' +
		'<li class="active">Tác giả</li>'
	$(".titlebreadcrumb").html(html);
});

$(".menu_nxb").click(function () {
	console.log("Click menu nhà xuất bản");
	swapmain("form_thongtinnxb");
	var html = '<li><a href="#">' +
		'<i class="fa fa-home">' +
		'</i>Trang chủ</a></li>' +
		'<li class="active">NXB</li>'
	$(".titlebreadcrumb").html(html);
});

$(".menu_sach").click(function () {
	console.log("Click menu sách");
	swapmain();
	var html = '<li><a href="#">' +
		'<i class="fa fa-home">' +
		'</i>Trang chủ</a></li>' +
		'<li class="active">Sách</li>'
	$(".titlebreadcrumb").html(html);
});

$(".menu_dondh").click(function () {
	console.log("Click menu đơn đặt hàng");
	swapmain("form_dondh");
	var html = '<li><a href="#">' +
		'<i class="fa fa-home">' +
		'</i>Trang chủ</a></li>' +
		'<li class="active">Đơn đặt hàng</li>'
	$(".titlebreadcrumb").html(html);
});

//Xử lý sự kiện click vào nút xử lý đơn hàng
$(".listallddh").on('click', ".btn_xulydh", function () {
	console.log("click btn xử lý đơn hàng!")
	//Hiển thị modal
	$(".showxulydh").modal("show");
});

//Xử lý sự kiện click vào nút xóa đơn hàng
$(".listallddh").on('click', ".btn_xoadh", function () {
	bootbox.confirm("Do you want to dellete Đơn hàng này", function (result) {
		if (result == true) {
			console.log("bạn đã chọn OK!");
		}
		else {
			console.log("bạn đã chọn NO!");
		}
	});
});


//Hàm được gọi khi thao tác thất bại
function alert_error(mes) {
	bootbox.alert({
		size: "small",
		title: "<span style='color: red'>Thất bại</span>",
		message: mes,
		callback: function () { /* you call back code */ }
	});
}

//Hàm được gọi khi thao tác thành công
function alert_success(mes, callback) {
	bootbox.alert({
		size: "small",
		title: "Thành công",
		message: mes,
		callback: callback
	});
}

//Hàm được gọi khi thao tác nhắc nhở user
function alert_info(mes) {
	bootbox.alert({
		size: "small",
		title: "Thông báo",
		message: mes,
		callback: function () { /* you call back code */ }
	});
}

//Hàm kiểm tra sdt là số
function isNumber(n) {
	return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

//Hàm kiểm tra email
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}



//Cấu hình lại get và post
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

function queryDataPOST_TEXT(url, dataSend, callback) {
	$.ajax({
		type: 'POST',
		url: url,
		data: dataSend,
		async: true,
		dataType: 'text',//để giá trị nào thì trên server phải định nghĩa như vậy
		success: callback
	});
}
//Hàm gọi event Get
function guidata() {
	var dataSend = {//dataSend là dữ liệu được gửi đi cùng với yêu cầu cho bên php nhận để xử lý
		event: "Guidata"
	}
	queryDataGET_TEXT("php/api_process_GET.php", dataSend, function (res) {
		alert_info(res);
	});
	queryDataPOST_TEXT("php/api_process_POST.php", dataSend, function (res) {
		alert_info(res);
	});
}
//Gọi hàm
// guidata();

//Trả dữ liệu cho khách hàng dạng JSON
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
//Hàm hiển thị số trang
function buildSlidePage(obj,codan,pageActive,totalPage) {
    var html="";
    pageActive=parseInt(pageActive);
    for(i = 1 ; i <=codan; i++) {
        if(pageActive-i<0) break;//Dừng nếu pageActive<0
        html='<button type="button" class="btn btn-outline btn-default" value="'+(pageActive-i)+'">'+(pageActive-i+1)+'</button>'+html;
    }
    if(pageActive>codan){
        html='<button type="button" class="btn btn-outline btn-default" value="'+(pageActive-i)+'">...</button>'+html;
    }
    html+='<button type="button" class="btn btn-outline btn-default" value="'+pageActive+'">'+(pageActive+1)+'</button>';
    for(i = 1 ; i <=codan; i++){
        if(pageActive+i>=totalPage) break;
        html=html+'<button type="button" class="btn btn-outline btn-default" value="'+(pageActive+i)+'">'+(pageActive+i+1)+'</button>';
    }
    if(totalPage-pageActive>codan+1){
        html=html+'<button type="button" value="'+(pageActive+i)+'" class="btn btn-outline btn-default">...</button>';
    }
    obj.html(html);
}


//6/1/2021 upload file
function initUploadImage(idInput,idpreview,nameFuncion){
	'use strict';
	// Initialise resize library
	var resize = new window.resize();
	resize.init();
	// console.log("no");
	// Upload photo
	document.querySelector('#'+idInput).addEventListener('change', function (event) {
		event.preventDefault();

		// var input=$("#"+idInput);
		$("#"+idInput).change(function ()
		{
			// $("#"+idpreview).show();
			if (typeof(FileReader)!="undefined"){
			
				var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.ico|.jpg|.jpeg|.gif|.png)$/;
			
				$($(this)[0].files).each(function () {
					var getfile = $(this);
					if (regex.test(getfile[0].name.toLowerCase())) {
						var reader = new FileReader();
						reader.onload = function (e) {
							$("#imgPreviewStatus").attr("src",e.target.result);
						}
						reader.readAsDataURL(getfile[0]);
						//document.getElementById("savepath").value=getfile[0].name;
						//console.log(getfile[0]);
					}
					else {
						alert(getfile[0].name + " Không phải là file.");
						return false;
					}
				});
			}
			else {
				alert("Browser does not supportFileReader.");
			}
		});
		var files = event.target.files;
		var countFile=files.length;
		for (var i in files) {
			if (typeof files[i] !== 'object') return false;

			(function(){

				var initialSize = files[i].size;

				resize.photo(files[i], 1200, 'file', function (resizedFile) {

					var resizedSize = resizedFile.size;

					upload(resizedFile, function(res){
						console.log(res);
						var s=nameFuncion+"("+res+")";
						eval(s);
					});

					// This is not used in the demo, but an example which returns a data URL so yan can show the user a thumbnail before uploading th image.
					resize.photo(resizedFile, 600, 'dataURL', function (thumbnail) {
						//console.log('Display the thumbnail to the user: ', thumbnail);
					});

				});

			}());

		}

	});
};


var upload = function (photo, callback) {
	var formData = new FormData();
    formData.append('photo', photo);
    
    $.ajax({
        url: 'php/uploadfile.php',
        type : 'POST',
        data : formData,
        async: true,
        xhrFields: {
            withCredentials: true
        },
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        success : callback
    });
};


function queryData(url,dataSend,callback){
    
    $.ajax({
        type: 'POST',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'JSON',
        success: callback
    });
}