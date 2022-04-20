
var resallsp;//Biến dùng để gán json và thực hiện show dữ liệu lên các trường input


$(".btn_lamlaishipper").click(function(){
    nochangeshipperadmin();
});

//Sự kiện thao tác thêm shipper
$(".btn_themshipper").click(function(){
    var masp=$(".txtmashipper").val();
    var tensp=$(".txttenshipper").val();
    var sdt=$(".txtsdtshipper").val();
	if(masp==""){
        alert_info("Vui lòng nhập mã shipper!");
    }
	else{
		var dataSend={
			event: "insertshipper",
			masp: masp,
            tensp: tensp,
            sdt: sdt
		}
		queryDataGET_JSON("php/admin_frm_shipper.php", dataSend, function(res){
			console.log(res);
			if(res["insertshipper"]==1){
				alert_info("Thêm thành công!");
						//Cái này là để thêm xong dữ liệu sẽ đứng yên tại trang đó
						nochangeshipperadmin();
			}
			else{
				alert_error("Thêm thất bại!");
			}
		});
	}
});


//Sự kiện lưu dữ liệu khi thao tác sửa 
$(".btn_luushipper").click(function(){
    var masp=$(".txtmashipper").val();
    var tensp=$(".txttenshipper").val();
    var sdt=$(".txtsdtshipper").val();

    bootbox.confirm("Bạn có chắc sửa shipper này không?", function (result) {
		if (result == true) {
			var dataSend={
				event: "updateshipper",
                masp: masp,
                tensp: tensp,
                sdt: sdt
			}
			queryDataGET_JSON("php/admin_frm_shipper.php", dataSend, function(res){
				console.log(res);
				if(res["updateshipper"]==1){
					alert_info("Sửa thành công!");
					nochangeshipperadmin();//dừng màn nè
				}
				else{
					alert_error("Sửa không thành công");
				}
			});
		}
	});
});

//Sự kiện thao tác xóa dữ liệu
$(".btn_xoashipper").click(function(){
	var masp=$(".txtmashipper").val();
	if(masp==""){
        alert_info("Vui lòng nhập mã shipper!");
	}	
	else{
		bootbox.confirm("Bạn có chắc xóa shipper này không?", function (result) {
			if (result == true) {
				var dataSend={
					event:"deleteshipper",
					masp: masp
				}
				queryDataGET_JSON("php/admin_frm_shipper.php", dataSend, function(res){
					console.log(res);
					if(res["deleteshipper"]==1){
						alert_info("Xóa thành công!");
						nochangeshipperadmin();
					}
					else{
						alert_error("Xóa thất bại!");
					}
				});
			}
		});
	}
});

//Sự kiện thao tác tìm kiếm dữ liệu theo mã shipper
$(".btn_timkiemshipper").click(function(){
    var masp=$(".txtmashipper").val();
    var dataSend={
		event:"timkiem",
		masp: masp
    }
    queryDataGET_JSON("php/admin_frm_shipper.php",dataSend,function (res) {
        $(".ttshipper").html("");
        var data = res.items;
        resallsp=data;
        var html='';
        for (item in data) {
            var list=data[item];
            html=html +
            '<tr data-masp="' +list.Shipper_ID+'">'+
            '<td>'+1+'</td>'+
            '<td>'+list.Shipper_ID+'</td>'+
            '<td>'+list.Shipper_Name+'</td>'+
            '<td>'+list.Phone_Number+'</td>'+
            '<td class="click_xem_SP"><button type="button" class="btn btn-primary btn-sm"><i class="fa fa-eye"></i> View </button></td>'+
            '</tr>';
            $(".ttshipper").html(html);
            $(".paginationshipper").html("");
        }
    });
});

//Hàm hiển thị dữ liệu lên table quản lý shipper
function builddsshipper_admin(page,record){
    var dataSend={
		event:"getshipper",
		page:page,
        record:record
    }

    $(".ttshipper").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/admin_frm_shipper.php",dataSend,function (res) {
        $(".ttshipper").html("");
		buildHTMLShipperAdmin(res);//Gọi hàm để show dữ liệu
    });
}


//Hiển thị dữ liệu json lấy từ server
function buildHTMLShipperAdmin(res){
   if(res.total==0){
	    $(".ttshipper").html("Chưa có nội dung");
   }
   else{
    var data = res.items;

    resallsp=data;
	var stt=1;
	var currentpage=parseInt(res.page);
    stt=printSTT(recordsp,currentpage);

    var html='';
    for (item in data) {
        var list=data[item];
        html=html +
            '<tr data-masp="' +list.Shipper_ID+'">'+
            '<td>'+stt+'</td>'+
            '<td>'+list.Shipper_ID+'</td>'+
            '<td>'+list.Shipper_Name+'</td>'+
            '<td>'+list.Phone_Number+'</td>'+
            '<td class="click_xem_SP"><button type="button" class="btn btn-primary btn-sm"><i class="fa fa-eye"></i> View </button></td>'+
            '</tr>';
        stt++;
        $(".ttshipper").html(html);
    }
    buildSlidePage($(".paginationshipper"),5,res.page,res.totalpage);
   }
}


var sp_current=0;//Biến dùng để xác định vị trí trang hiện hành


//Sự kiện cấp 2 xử lý nút phân trang
$(".paginationshipper").on('click','button',function(){   
    sp_current=$(this).val();
    builddsshipper_admin($(this).val(),recordsp);

});


//Sự kiện cấp 2 xử lý nút show dữ liệu lên các trường input
$(".ttshipper").on('click', ".click_xem_SP", function(){
	var Shipper_ID=($(this).parents("tr").attr("data-masp"));
	$(".txtmashipper").val(resallsp[Shipper_ID].Shipper_ID);
    $(".txttenshipper").val(resallsp[Shipper_ID].Shipper_Name);
    $(".txtsdtshipper").val(resallsp[Shipper_ID].Phone_Number);
});

