$(".btn_timkiem").click(function(){
    var makh=$(".txtmakh").val();
    var dataSend={
		event:"timkiemkh",
		makh: makh
    }
    queryDataGET_JSON("php/admin_frm_khachhang.php",dataSend,function (res) {
        $(".ttkh").html("");
        var data = res.items;
        resallsp=data;
        var html='';
        for (item in data) {
            var list=data[item];
            html=html +
            '<tr data-masp="'+list.Cus_ID+'">'+
            '<td>'+1+'</td>'+
            '<td>'+list.Cus_ID+'</td>'+
            '<td>'+list.Cus_Name+'</td>'+
            '<td>'+list.Phone_Number+'</td>'+
            '<td>'+list.Cus_Address+'</td>'+
            '<td>'+list.Acc_username+'</td>'+
            '<td>'+list.Acc_password+'</td>'+
            '<td>'+list.avatar+'</td>'+
            '</tr>';
            $(".ttkh").html(html);
            $(".pagination").html("");
        }
    });
});



//Hàm hiển thị dữ liệu lên table quản lý khách hàng
function builddskh_admin(page,record){
    var dataSend={
		event:"getkhadmin",
		page:page,
        record:record
    }

    $(".ttkh").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/admin_frm_khachhang.php",dataSend,function (res) {
        $(".ttkh").html("");
		buildHTMLKHAdmin(res);//Gọi hàm để show dữ liệu
    });
}


//Hiển thị dữ liệu json lấy từ server
function buildHTMLKHAdmin(res){
   if(res.total==0){
	    $(".ttkh").html("Chưa có nội dung");
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
        '<tr data-makh="' +list.Cus_ID+'">'+
        '<td>'+stt+'</td>'+
        '<td>'+list.Cus_ID+'</td>'+
        '<td>'+list.Cus_Name+'</td>'+
        '<td>'+list.Phone_Number+'</td>'+
        '<td>'+list.Cus_Address+'</td>'+
        '<td>'+list.Acc_username+'</td>'+
        '<td>'+list.Acc_password+'</td>'+
        '<td>'+list.avatar+'</td>'+
        '</tr>';
        stt++;
        $(".ttkh").html(html);
    }
    buildSlidePage($(".paginationkh"),5,res.page,res.totalpage);
   }
}


var kh_current=0;//Biến dùng để xác định vị trí trang hiện hành


//Sự kiện cấp 2 xử lý nút phân trang
$(".paginationkh").on('click','button',function(){   
    kh_current=$(this).val();
    builddskh_admin($(this).val(),recordsp);

});


$(".btn_lamlaikh").click(function(){
    builddskh_admin(0,recordsp);
    $(".txtmakh").val("");
});