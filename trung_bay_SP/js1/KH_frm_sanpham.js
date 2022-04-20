
//Hiển thị dữ liệu lên table sản phẩm
function builddssp(page,record) {
    var dataSend={
		event:"getsp",
		page:page,
    record:record
    }
    queryDataGET_JSON("php/KH_frm_sanpham.php",dataSend,function (res) {
        $(".frmsanpham").html("");
		buildHTMLSPData(res);//Gọi hàm để show dữ liệu
    });
}


//Hiển thị dữ liệu json lấy từ server
function buildHTMLSPData(res) {
   if(res.total==0){
	    $(".frmsanpham").html("Chưa có nội dung");
   }
   else{  
    var data = res.items;
    var html='';
    var a='sanpham';
    var b=1;
    for (item in data) {
      
        var list=data[item];
        localStorage.setItem(a+b, list.Product_ID);
        html=html +
        '<div class="col-12 col-md-3 asd" align="center">'+
            '<div class="card">'+
              '<img width="100%" src="'+'images/'+list.img+'"'+
                'class="card-img-top">'+
              '<div class="card-body">'+
                '<h4 class="card-title">'+list.Product_Name+'</h4>'+
                '<span class="giasp">'+list.Actual_Price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'đ</span>&nbsp;'+
                '<span><del>'+list.Quoted_Price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'đ</del></span><br>'+
                '<button class="btn btn-warning '+a+b+'" onclick="layid()">Thêm vào giỏ hàng</button>'+
              '</div>'+
            '</div>'+
        '</div>';
        $(".frmsanpham").html(html);
        b++;
    }
    buildSlidePage($(".pagination"),5,res.page,res.totalpage);
   }
}


var sp_current=0;//Biến dùng để xác định vị trí trang hiện hành
$(".pagination").on('click','button',function(){   
  sp_current=$(this).val();
  builddssp($(this).val(),recordsp);
  location.href = "#top";//Load lên đầu trang
});


$( document ).ready(function() {
  builddssp(0,recordsp);
  slsp_giohang();
  // $ ("button").click (function () {
  //   console.log ($ (this).prop("id"));
  // });
});


function slsp_giohang(){
  var makh=localStorage.getItem("makh");
  var dataSend={
  event:"slsp_of_kh",
  makh: makh
  }
  queryDataGET_JSON("php/KH_frm_sanpham.php",dataSend,function (res) {
      $(".slsp_giohang").html("");
      if(Number(res.items)>0){
 
        $(".slsp_giohang").html(res.items);
 
      }
  });
}

function layid(){
  console.log($(globalThis).className);
}