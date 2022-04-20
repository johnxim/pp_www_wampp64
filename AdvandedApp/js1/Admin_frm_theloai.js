
var resallsp;//Biến dùng để gán json và thực hiện show dữ liệu lên các trường input


$(".btn_lamlaitl").click(function(){
    nochangetladmin();
});

//Sự kiện thao tác thêm theloai
$(".btn_themtl").click(function(){
    var matl=$(".txtmatl").val();
    var tentl=$(".txttentl").val();
	if(matl==""){
        alert_info("Vui lòng nhập mã theloai!");
    }
	else{
		var dataSend={
			event: "inserttl",
			matl: matl,
            tentl: tentl
		}
		queryDataGET_JSON("php/admin_frm_theloai.php", dataSend, function(res){
			console.log(res);
			if(res["inserttl"]==1){
				alert_info("Thêm thành công!");
						//Cái này là để thêm xong dữ liệu sẽ đứng yên tại trang đó
						nochangetladmin();
			}
			else{
				alert_error("Thêm thất bại!");
			}
		});
	}
});


//Sự kiện lưu dữ liệu khi thao tác sửa 
$(".btn_luutl").click(function(){
    var matl=$(".txtmatl").val();
    var tentl=$(".txttentl").val();

    bootbox.confirm("Bạn có chắc sửa theloai này không?", function (result) {
		if (result == true) {
			var dataSend={
				event: "updatetl",
                matl: matl,
                tentl: tentl
			}
			queryDataGET_JSON("php/admin_frm_theloai.php", dataSend, function(res){
				console.log(res);
				if(res["updatetl"]==1){
					alert_info("Sửa thành công!");
					nochangetladmin();//dừng màn nè
				}
				else{
					alert_error("Sửa không thành công");
				}
			});
		}
	});
});

//Sự kiện thao tác xóa dữ liệu
$(".btn_xoatl").click(function(){
	var matl=$(".txtmatl").val();
	if(matl==""){
        alert_info("Vui lòng nhập mã theloai!");
	}	
	else{
		bootbox.confirm("Bạn có chắc xóa theloai này không?", function (result) {
			if (result == true) {
				var dataSend={
					event:"deletetl",
					matl: matl
				}
				queryDataGET_JSON("php/admin_frm_theloai.php", dataSend, function(res){
					console.log(res);
					if(res["deletetl"]==1){
						alert_info("Xóa thành công!");
						nochangetladmin();
					}
					else{
						alert_error("Không tồn tại theloai có mã: "+matl);
					}
				});
			}
		});
	}
});

//Sự kiện thao tác tìm kiếm dữ liệu theo mã theloai
$(".btn_timkiemtl").click(function(){
    var matl=$(".txtmatl").val();
    var dataSend={
		event:"timkiem",
		matl: matl
    }
    queryDataGET_JSON("php/admin_frm_theloai.php",dataSend,function (res) {
        $(".tttl").html("");
        var data = res.items;
        resallsp=data;
        var html='';
        for (item in data) {
            var list=data[item];
            html=html +
            '<tr data-matl="' +list.Category_ID+'">'+
            '<td>'+1+'</td>'+
            '<td>'+list.Category_ID+'</td>'+
            '<td>'+list.Category_Name+'</td>'+
            '<td class="click_xem_TL"><button type="button" class="btn btn-primary btn-sm"><i class="fa fa-eye"></i> View </button></td>'+
            '</tr>';
            $(".tttl").html(html);
            $(".paginationtl").html("");
        }
    });
});

//Hàm hiển thị dữ liệu lên table quản lý theloai
function builddstheloai_admin(page,record){
    var dataSend={
		event:"gettl",
		page:page,
        record:record
    }

    $(".tttl").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/admin_frm_theloai.php",dataSend,function (res) {
        $(".tttl").html("");
		buildHTML_TL_Admin(res);//Gọi hàm để show dữ liệu
    });
}


//Hiển thị dữ liệu json lấy từ server
function buildHTML_TL_Admin(res){
   if(res.total==0){
	    $(".tttl").html("Chưa có nội dung");
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
            '<tr data-matl="' +list.Category_ID+'">'+
            '<td>'+stt+'</td>'+
            '<td>'+list.Category_ID+'</td>'+
            '<td>'+list.Category_Name+'</td>'+
            '<td class="click_xem_TL"><button type="button" class="btn btn-primary btn-sm"><i class="fa fa-eye"></i> View </button></td>'+
            '</tr>';
        stt++;
        $(".tttl").html(html);
    }
    buildSlidePage($(".paginationtl"),5,res.page,res.totalpage);
   }
}


var sp_current=0;//Biến dùng để xác định vị trí trang hiện hành


//Sự kiện cấp 2 xử lý nút phân trang
$(".paginationtl").on('click','button',function(){   
    sp_current=$(this).val();
    builddstheloai_admin($(this).val(),recordsp);

});


//Sự kiện cấp 2 xử lý nút show dữ liệu lên các trường input
$(".tttl").on('click', ".click_xem_TL", function(){
	var Category_ID=($(this).parents("tr").attr("data-matl"));
	$(".txtmatl").val(resallsp[Category_ID].Category_ID);
    $(".txttentl").val(resallsp[Category_ID].Category_Name);
});

