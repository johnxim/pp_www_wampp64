
var resallsp;//Biến dùng để gán json và thực hiện show dữ liệu lên các trường input

$( document ).ready(function(){
    builddssp_admin(0,recordsp);
});

$(".btn_lamlaisp").click(function(){
    nochangespadmin();
});

//Sự kiện thao tác thêm sản phẩm
$(".btn_themsp").click(function(){
    var giathucsp=$(".txtgiathucsp").val();
    
    var gianysp=$(".txtgianysp").val();

    if(isNumber(giathucsp)==false || isNumber(gianysp)==false){
        alert_info('Vui lòng nhập đúng giá sản phẩm!');
    }
    else{
        var masp=$(".txtmasp").val();
        var tensp=$(".txttensp").val();
        
        var tlsp=$('#cars').val();
        var nccsp=$("#txtnccsp").val();
        var anh=$(".txtanhsp").val().slice(12,$(".txtanhsp").val().length);
    
        if(masp==""){
            alert_info("Vui lòng nhập mã sản phẩm!");
        }
        else if(gianysp==""){
            alert_info("Vui lòng nhập giá niêm yết của sản phẩm!");
        }
        else if(giathucsp==""){
            alert_info("Vui lòng nhập giá thực của sản phẩm!");//Set cho nó bằng 0
        }
        else{
            var dataSend={
                event: "insertsp",
                masp: masp,
                tensp: tensp,
                giathuc: giathucsp,
                gianiemyet: gianysp,
                matl: tlsp,
                mancc: nccsp,
                anh: anh
            }
            queryDataGET_JSON("php/admin_frm_sanpham.php", dataSend, function(res){
                console.log(res);
                if(res["insertsp"]==1){
                    alert_info("Thêm thành công!");
                            //Cái này là để thêm xong dữ liệu sẽ đứng yên tại trang đó
                            nochangespadmin();
                }
                else{
                    alert_error("Thêm thất bại!");
                }
            });
        }
    }
    
});


//Sự kiện lưu dữ liệu khi thao tác sửa 
$(".btn_luusp").click(function(){
	var masp=$(".txtmasp").val();
    var tensp=$(".txttensp").val();
    var giathucsp=$(".txtgiathucsp").val();
    var gianysp=$(".txtgianysp").val();
    var tlsp=$("#cars").val();
    var nccsp=$("#txtnccsp").val();
    var anh=$(".txtanhsp").val().slice(12,$(".txtanhsp").val().length);

    bootbox.confirm("Bạn có chắc sửa sản phẩm này không?", function (result) {
		if (result == true) {
			var dataSend={
				event: "updatesp",
                masp: masp,
                tensp: tensp,
                giathuc: giathucsp,
                gianiemyet: gianysp,
                matl: tlsp,
                mancc: nccsp,
                anh: anh
			}
			queryDataGET_JSON("php/admin_frm_sanpham.php", dataSend, function(res){
				console.log(res);
				if(res["updatesp"]==1){
					alert_info("Sửa thành công!");
					nochangespadmin();//dừng màn nè
				}
				else{
					alert_error("Sửa không thành công");
				}
			});
		}
	});
});

//Sự kiện thao tác xóa dữ liệu
$(".btn_xoasp").click(function(){
	var masp=$(".txtmasp").val();
	if(masp==""){
        alert_info("Vui lòng nhập mã sản phẩm!");
	}	
	else{
		bootbox.confirm("Bạn có chắc xóa sản phẩm này không?", function (result) {
			if (result == true) {
				var dataSend={
					event:"deletesp",
					masp: masp
				}
				queryDataGET_JSON("php/admin_frm_sanpham.php", dataSend, function(res){
					console.log(res);
					if(res["deletesp"]==1){
						alert_info("Xóa thành công!");
						nochangespadmin();
					}
					else{
						alert_error("Xóa thất bại!");
					}
				});
			}
		});
	}
});

//Sự kiện thao tác tìm kiếm dữ liệu theo mã sản phẩm
$(".btn_timkiemsp").click(function(){
    var masp=$(".txtmasp").val();
    var dataSend={
		event:"timkiem",
		masp: masp
    }
    queryDataGET_JSON("php/admin_frm_sanpham.php",dataSend,function (res) {
        $(".ttsp").html("");
        var data = res.items;
        resallsp=data;
        var html='';
        for (item in data) {
            var list=data[item];
            html=html +
            '<tr data-masp="' +list.Product_ID+'">'+
            '<td>'+1+'</td>'+
            '<td>'+list.Product_ID+'</td>'+
            '<td>'+list.Product_Name+'</td>'+
            '<td>'+list.Actual_Price+'</td>'+
            '<td>'+list.Quoted_Price+'</td>'+
            '<td>'+list.Category_ID+'</td>'+
            '<td>'+list.Supplier_ID+'</td>'+
            '<td>'+list.img+'</td>'+
            '<td class="click_xem_SP"><button type="button" class="btn btn-primary btn-sm"><i class="fa fa-eye"></i> View </button></td>'+
            '</tr>';
            $(".ttsp").html(html);
            $(".paginationsp").html("");
        }
    });
});

//Hàm hiển thị dữ liệu lên table quản lý sản phẩm
function builddssp_admin(page,record){
    var dataSend={
		event:"getspadmin",
		page:page,
        record:record
    }

    $(".ttsp").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/admin_frm_sanpham.php",dataSend,function (res) {
        $(".ttsp").html("");
		buildHTMLSPAdmin(res);//Gọi hàm để show dữ liệu
    });
}


//Hiển thị dữ liệu json lấy từ server
function buildHTMLSPAdmin(res){
   if(res.total==0){
	    $(".ttsp").html("Chưa có nội dung");
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
        '<tr data-masp="' +list.Product_ID+'">'+
        '<td>'+stt+'</td>'+
        '<td>'+list.Product_ID+'</td>'+
        '<td>'+list.Product_Name+'</td>'+
        '<td>'+list.Actual_Price+'</td>'+
        '<td>'+list.Quoted_Price+'</td>'+
        '<td>'+list.Category_ID+'</td>'+
        '<td>'+list.Supplier_ID+'</td>'+
        '<td>'+list.img+'</td>'+
        '<td class="click_xem_SP"><button type="button" class="btn btn-primary btn-sm"><i class="fa fa-eye"></i> View </button></td>'+
        '</tr>';
        stt++;
        $(".ttsp").html(html);
    }
    buildSlidePage($(".paginationsp"),5,res.page,res.totalpage);
   }
}


var sp_current=0;//Biến dùng để xác định vị trí trang hiện hành


//Sự kiện cấp 2 xử lý nút phân trang
$(".paginationsp").on('click','button',function(){   
    sp_current=$(this).val();
    builddssp_admin($(this).val(),recordsp);

});


//Sự kiện cấp 2 xử lý nút show dữ liệu lên các trường input
$(".ttsp").on('click', ".click_xem_SP", function(){
	var Product_ID=($(this).parents("tr").attr("data-masp"));
	$(".txtmasp").val(resallsp[Product_ID].Product_ID);
    $(".txttensp").val(resallsp[Product_ID].Product_Name);
    $(".txtgiathucsp").val(resallsp[Product_ID].Actual_Price);
    $(".txtgianysp").val(resallsp[Product_ID].Quoted_Price);
    $("#cars").val(resallsp[Product_ID].Category_ID);
    $("#txtnccsp").val(resallsp[Product_ID].Supplier_ID);
    $(".anhspadmin").attr("src", "images/"+resallsp[Product_ID].img);
});



$( document ).ready(function(){
    builddssp_admin(0,recordsp);
    builddstheloai();
    builddsncc();
});

//Build option thể loại
function builddstheloai(){
    var d={
		event:"getmatl"
    }

    queryDataGET_JSON("php/admin_frm_theloai.php",d,function (res) {
		buildHTML_TL(res);//Gọi hàm để show dữ liệu
    });
}

function buildHTML_TL(res){
     var data = res.items;

     var html='';
     for (item in data) {
         var list=data[item];
         html=html +
         `<option value="${list.Category_ID}">${list.Category_ID} : ${list.Category_Name}</option>`;
         $("#cars").html(html);
     }
}

//Build option ncc
function builddsncc(){
    var d={
		event:"getmancc"
    }

    queryDataGET_JSON("php/admin_frm_ncc.php",d,function (res) {
		buildHTML_NCC(res);//Gọi hàm để show dữ liệu
    });
}

function buildHTML_NCC(res){
     var data = res.items;

     var html='';
     for (item in data) {
         var list=data[item];
         html=html +
         `<option value="${list.Supplier_ID}">${list.Supplier_ID} : ${list.Supplier_Name}</option>`;
         $("#txtnccsp").html(html);
     }
}