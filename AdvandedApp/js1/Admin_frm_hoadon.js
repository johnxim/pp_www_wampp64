
//Hàm hiển thị dữ liệu đơn hàng
function builddshd(page,record){
    var dataSend={
        event:"gethd",
        xnyc:xnyc,
		page:page,
        record:record
    }

    $(".ttdh").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/admin_frm_hoadon.php",dataSend,function (res) {
        $(".ttdh").html("");
		buildHTML_status_hd(res);//Gọi hàm để show dữ liệu
    });
}

//Hiển thị dữ liệu json lấy từ server
var thanhtacvu='';
function buildHTML_status_hd(res){
   if(res.total==0){
	    $(".ttdh").html("Chưa có nội dung");
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
        if(list.Status=='1'){
            list.Status='Đã thanh toán';
        }
        else if(list.Status=='0'){
            list.Status='Chưa thanh toán';
        }
        html=html +
        '<tr data-mahd="' +list.Order_ID+'">'+
        '<td>'+stt+'</td>'+
        '<td>'+list.Order_ID+'</td>'+
        '<td>'+list.Cus_ID+'</td>'+
        '<td>'+list.Order_Date+'</td>'+
        '<td>'+list.total_price+'</td>'+
        '<td>'+list.Shipper_ID+'</td>'+
        '<td>'+list.Status+'</td>'+
        '</tr>';
        stt++;
        $(".ttdh").html(html);
    }
    buildSlidePage($(".paginationhd"),5,res.page,res.totalpage);
   }
}


var dh_current=0;//Biến dùng để xác định vị trí trang hiện hành
var xnyc='';//Biến dùng để xác nhận yêu cầu
$(".btn_alldh").click(function(){
    xnyc='1';
    builddshd(0,recordsp);
});

$(".btn_datt").click(function(){
    xnyc='2';
    builddshd(0,recordsp);
});

$(".btn_chuatt").click(function(){
    xnyc='3';
    builddshd(0,recordsp);
});

//Sự kiện cấp 2 xử lý click nút phân trang
$(".paginationhd").on('click','button',function(){
    dh_current=$(this).val();
    builddshd($(this).val(),recordsp);
});

