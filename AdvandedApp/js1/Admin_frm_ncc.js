
var resallsp;//Biến dùng để gán json và thực hiện show dữ liệu lên các trường input


$(".btn_lamlaincc").click(function(){
    nochange_ncc_admin();
});

//Sự kiện thao tác thêm nhà cung cấp
$(".btn_themncc").click(function(){
    var mancc=$(".txtmancc").val();
    var tenncc=$(".txttenncc").val();
    var diachincc=$(".txtdiachincc").val();
	if(mancc==""){
        alert_info("Vui lòng nhập mã nhà cung cấp!");
    }
	else{
		var dataSend={
			event: "insertncc",
			mancc: mancc,
            tenncc: tenncc,
            diachincc: diachincc
		}
		queryDataGET_JSON("php/admin_frm_ncc.php", dataSend, function(res){
			console.log(res);
			if(res["insertncc"]==1){
				alert_info("Thêm thành công!");
						//Cái này là để thêm xong dữ liệu sẽ đứng yên tại trang đó
						nochange_ncc_admin();
			}
			else{
				alert_error("Thêm thất bại!");
			}
		});
	}
});


//Sự kiện lưu dữ liệu khi thao tác sửa 
$(".btn_luuncc").click(function(){
	var mancc=$(".txtmancc").val();
    var tenncc=$(".txttenncc").val();
    var diachincc=$(".txtdiachincc").val();

    bootbox.confirm("Bạn có chắc sửa nhà cung cấp này không?", function (result) {
		if (result == true) {
			var dataSend={
				event: "updatencc",
                mancc: mancc,
                tenncc: tenncc,
                diachincc: diachincc
			}
			queryDataGET_JSON("php/admin_frm_ncc.php", dataSend, function(res){
				console.log(res);
				if(res["updatencc"]==1){
					alert_info("Sửa thành công!");
					nochange_ncc_admin();//dừng màn nè
				}
				else{
					alert_error("Sửa không thành công!");
				}
			});
		}
	});
});

//Sự kiện thao tác xóa dữ liệu
$(".btn_xoancc").click(function(){
	var mancc=$(".txtmancc").val();
	if(mancc==""){
        alert_info("Vui lòng nhập mã nhà cung cấp!");
	}	
	else{
		bootbox.confirm("Bạn có chắc xóa nhà cung cấp này không?", function (result) {
			if (result == true) {
				var dataSend={
					event:"deletencc",
					mancc: mancc
				}
				queryDataGET_JSON("php/admin_frm_ncc.php", dataSend, function(res){
					console.log(res);
					if(res["deletencc"]==1){
						alert_info("Xóa thành công!");
						nochange_ncc_admin();
					}
					else{
						alert_error("Xóa thất bại!");
					}
				});
			}
		});
	}
});

//Sự kiện thao tác tìm kiếm dữ liệu theo mã nhà cung cấp
$(".btn_timkiemncc").click(function(){
    var mancc=$(".txtmancc").val();
    var dataSend={
		event:"timkiem",
		mancc: mancc
    }
    queryDataGET_JSON("php/admin_frm_ncc.php",dataSend,function (res) {
        $(".ttncc").html("");
        var data = res.items;
        resallsp=data;
        var html='';
        for (item in data) {
            var list=data[item];
            html=html +
            '<tr data-mancc="'+list.Supplier_ID+'">'+
            '<td>'+1+'</td>'+
            '<td>'+list.Supplier_ID+'</td>'+
            '<td>'+list.Supplier_Name+'</td>'+
            '<td>'+list.Supplier_Address+'</td>'+
            '<td class="click_xem_NCC"><button type="button" class="btn btn-primary btn-sm"><i class="fa fa-eye"></i> View </button></td>'+
            '</tr>';
            $(".ttncc").html(html);
            $(".paginationncc").html("");
        }
    });
});

//Hàm hiển thị dữ liệu lên table quản lý nhà cung cấp
function buildds_ncc_admin(page,record){
    var dataSend={
		event:"getnccadmin",
		page:page,
        record:record
    }

    $(".ttncc").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/admin_frm_ncc.php",dataSend,function (res) {
        $(".ttncc").html("");
		buildHTML_NCC_Admin(res);//Gọi hàm để show dữ liệu
    });
}


//Hiển thị dữ liệu json lấy từ server
function buildHTML_NCC_Admin(res){
   if(res.total==0){
	    $(".ttncc").html("Chưa có nội dung");
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
        '<tr data-mancc="' +list.Supplier_ID+'">'+
        '<td>'+stt+'</td>'+
        '<td>'+list.Supplier_ID+'</td>'+
        '<td>'+list.Supplier_Name+'</td>'+
        '<td>'+list.Supplier_Address+'</td>'+
        '<td class="click_xem_NCC"><button type="button" class="btn btn-primary btn-sm"><i class="fa fa-eye"></i> View </button></td>'+
        '</tr>';
        stt++;
        $(".ttncc").html(html);
    }
    buildSlidePage($(".paginationncc"),5,res.page,res.totalpage);
   }
}


var sp_current=0;//Biến dùng để xác định vị trí trang hiện hành


//Sự kiện cấp 2 xử lý nút phân trang
$(".paginationncc").on('click','button',function(){   
    sp_current=$(this).val();
    buildds_ncc_admin($(this).val(),recordsp);
});


//Sự kiện cấp 2 xử lý nút show dữ liệu lên các trường input
$(".ttncc").on('click', ".click_xem_NCC", function(){
	var Supplier_ID=($(this).parents("tr").attr("data-mancc"));
	$(".txtmancc").val(resallsp[Supplier_ID].Supplier_ID);
    $(".txttenncc").val(resallsp[Supplier_ID].Supplier_Name);
    $(".txtdiachincc").val(resallsp[Supplier_ID].Supplier_Address);
});

