
$(".btn_themtl").click(function(){

	var matl=$(".txtmatl").val();//Lấy giá trị của ô dữ liệu mã thể loại
	var tentl=$(".txttentl").val();
	if(matl==""){
        alert_info("matl cần phải khác khoảng trống");
	}	
	else if(tentl==""){
        alert_info("tentl cần phải khác khoảng trống");
	}
	else{
		var dataSend={
			event: "insert",
			matl: matl,
			tentl: tentl
		}
		queryDataGET_JSON("php/theloai.php", dataSend, function(res){
			console.log(res);
			if(res["insert"]==1){
				alert_info("Thêm thành công!"+theloai_current);
						//Cái này là để thêm xong dữ liệu sẽ đứng yên tại trang đó
						builddstheloai(theloai_current,recordtheloai);
						$(".txtmatl").val("");
						$(".txttentl").val("");
			}
			else{
				alert_error("Thêm thất bại!");
			}
		});
	}
});

$(".btn_luutl").click(function(){
	var matl=$(".txtmatl").val();//Lấy giá trị của cái mà ta nhập
	var tentl=$(".txttentl").val();
    //alert("Bạn nhập mã thể loại: "+matl+" và tên thể loại: "+tentl);
    bootbox.confirm("Bạn có chắc sửa thể loại này không?", function (result) {
		if (result == true) {
			var dataSend={
				event:"updatetl",
				matl:matl,
				tentl:tentl
			}
			queryDataGET_JSON("php/theloai.php", dataSend, function(res){
				console.log(res);
				if(res["updatetl"]==1){
					alert_info("Sửa thành công!"+theloai_current);
					//Cái này là để xóa xong dữ liệu sẽ đứng yên tại trang đó
					builddstheloai(theloai_current,recordtheloai);
					$(".txtmatl").val("");
					$(".txttentl").val("");
				}
				else{
					alert_error("Sửa không thành công");
				}
			});
		}
	});
});

$(".btn_lamlaitl").click(function(){
	var matl=$(".txtmatl").val("");//Thêm 1 khoảng trắng
	var tentl=$(".txttentl").val("");
});

$(".btn_xoatl").click(function(){
	var matl=$(".txtmatl").val();//Lấy giá trị của ô dữ liệu mã thể loại
	var tentl=$(".txttentl").val();
	if(matl==""){
        //alert("matl cần phải khác khoảng trống");
        alert_info("matl cần phải khác khoảng trống");
	}	
	else{
		bootbox.confirm("Bạn có chắc xóa thể loại này không?", function (result) {
			if (result == true) {
				var dataSend={
					event:"delete",
					matl:matl
				}
				queryDataGET_JSON("php/theloai.php", dataSend, function(res){
					console.log(res);
					if(res["delete"]==1){
						alert_info("Xóa thành công!"+theloai_current);
						//Cái này là để xóa xong dữ liệu sẽ đứng yên tại trang đó
						builddstheloai(theloai_current,recordtheloai);
						$(".txtmatl").val("");
						$(".txttentl").val("");
					}
					else{
						alert_error("Không tồn tại mã thể loại: "+matl);
					}
				});
			}
		});
	}
});



//Hiển thị dữ liệu lên table thể loại
function builddstheloai(page,record) {
   
    var dataSend={
		event:"getDSTheLoai",
		page:page,
        record:record
    }
    
    $(".listdstheloai").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/theloai.php",dataSend,function (res) {

            $(".listdstheloai").html("");
		   buildHTMLTheLoaiData(res);//Gọi hàm để show dữ liệu 
		// alert_info("đã lấy dữ liệu được"+res);
	
    });
}

var resalltheloai;//MẢng
//Hiển thị dữ liệu json lấy từ server
function buildHTMLTheLoaiData(res) {
   if(res.total==0){//Nếu bảng total không có dữ liệu
	    $(".listdstheloai").html("Chưa có nội dung");
		
   }else{
    var data = res.items;
   
    resalltheloai=data;
	var stt=1;
	var currentpage=parseInt(res.page);
    stt=printSTT(recordtheloai,currentpage);
    var html='';

    for (item in data) {//Vòng for để duyệt data và đưa vào tbody
        var list=data[item];
        html=html +//matl và tentl này là của usertemp
            '<tr data-matl="' + list.matl+ '">'+
            '<td>' + stt+ '</td>' +
			'<td>' + list.matl+'</td>'+
			'<td>' + list.tentl+'</td>'+
			'<td class="click_sua_the_loai"><i class="fa fa-eye"></i></td>'+
            '</tr>';
        stt++;
        $(".listdstheloai").html(html)
    }
    buildSlidePage($(".pagenumbertheloai"),5,res.page,res.totalpage);//đánh số trang
   }
}

var theloai_current=0;

//Bắt sự kiện click số trang
$(".pagenumbertheloai").on('click','button',function () {
    
    theloai_current=$(this).val();
    builddstheloai($(this).val(),recordtheloai);
    
});

$(".listdstheloai").on('click', ".click_sua_the_loai", function (){//Sự kiện cấp 2 này dùng để xem từng trường
	var matl=($(this).parents("tr").attr("data-matl"));
	var tentl=($(this).parents("tr").attr("data-name"));//Tentl này không dùng
	$(".txtmatl").val(resalltheloai[matl].matl);
	$(".txttentl").val(resalltheloai[matl].tentl);
	/*
	Nhìn object để hiểu rõ hơn về 2 câu lệnh ở trên:
	resalltheloai[object].[thuộc tính]
	
	"items":{
		"th":{
		   "matls":"th",
		   "tentls":"tin hoc"
		},
		"kt":{
		   "matls":"kt",
		   "tentls":"K\u1ebf To\u00e1n"
		}
	}
	*/
});

//Hàm hiển thị avatar
//Và đây cũng làm hàm không cho truy xuất trực tiếp vào file index
function showAvatar(){//Lấy(get) những item đã lưu khi login thành công
	var user=localStorage.getItem("userBS");//localStorage.getItem(keyname)
	var pass=localStorage.getItem("passBS");
	var av=localStorage.getItem("avatar");
	if(user=="" || user==undefined || user==null){
		location.href='login.html';
	}
	else{
		$(".myname").html(user);
		$(".myimg").attr("src", "images/"+av);
	}
}
showAvatar();

function logOut(){
	//Xóa các biến lưu trình duyệt, kiểu như clear history thường ngày
	localStorage.removeItem("userBS");
	localStorage.removeItem("passBS");
	localStorage.removeItem("avatar");
	location.href='login.html';//Trở về trang login
}

$(".btn_logout").click(function(){
	logOut();
});


//6.1.2021 upload file
//change avartart
$(".btnchangeavartar").click(function () {
		
	$("#imgSP").val("") 
	
	$('.showmodal_changeavartar').modal('show');
	initUploadImage("imgSP","imgSPPreview","onSuccessUploadImageavartar");
});

var urlimage="";
function onSuccessUploadImageavartar(oj){
	console.log(oj);
	$("#imgSPPreview").removeClass("is-hidden");
	$("#imgSPPreview").attr("src",oj.url);
	console.log(oj.attach);
	urlimage=oj.attach;
}

//hàm đổi avatar
$(".btn_update_avartar").click(function(){

	if(urlimage==""){
		alert_info("Chưa chọn hình");
	}else{
		var datasend = {
					event: "UpdateAvatar",
					username:username,
					avartar:urlimage
				};
				console.log(datasend);
				queryData("php/theloai1.php",datasend, function(data) {
					console.log(data);
					if(data["UpdateAvatar"]==1){
						alert_info("Update thành công !!");
						//$(".avartarimage").attr("src",urllocal+"file/"+urlimage);
						
						localStorage.removeItem("avartarBS");
						localStorage.setItem("avartarBS ",urlimage);
						buildUserDropdown();
						urlimage="";
					}
					else{
						alert_info("Thất bại !!");
					}
				});
	
	}
});
