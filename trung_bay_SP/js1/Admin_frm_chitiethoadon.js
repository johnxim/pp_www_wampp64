
//Hàm hiển thị dữ liệu đơn hàng
function builddscthd(page,record){
    var dataSend={
        event:"getcthd",
		page:page,
        record:record
    }

    $(".ttcthd").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/admin_frm_chitiethoadon.php",dataSend,function (res) {
        $(".ttcthd").html("");
		buildHTML_cthd(res);//Gọi hàm để show dữ liệu
    });
}

//Hiển thị dữ liệu json lấy từ server
var thanhtacvu='';
function buildHTML_cthd(res){
   if(res.total==0){
	    $(".ttcthd").html("Chưa có nội dung");
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
        '<tr data-mahd="' +list.Order_ID+'">'+
        '<td>'+stt+'</td>'+
        '<td>'+list.Order_ID+'</td>'+
        '<td>'+list.Product_ID+'</td>'+
        '<td>'+list.Quantity+'</td>'+
        '<td>'+list.Discount+'</td>'+
        '<td>'+list.Price+'</td>'+
        '</tr>';
        stt++;
        $(".ttcthd").html(html);
    }
    buildSlidePage($(".pagination"),5,res.page,res.totalpage);
   }
}


var dh_current=0;//Biến dùng để xác định vị trí trang hiện hành

//Sự kiện cấp 2 xử lý click nút phân trang
$(".pagination").on('click','button',function(){
    dh_current=$(this).val();
    builddscthd($(this).val(),recordsp);
});

$(document).ready(function(){
    builddscthd(0,recordsp);
});
