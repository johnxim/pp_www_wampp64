
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
    for (item in data) {
        var list=data[item];
        html=html +
        `<div class="col-12 col-md-3 asd" align="center">
            <div class="card">
              <a href="detail_sp.html?id=${list.Product_ID}">
                <img width="100%" src="images/${list.img}" class="card-img-top">
              </a>
              <div class="card-body">
                <a href="detail_sp.html?id=${list.Product_ID}">
                  <h4 class="card-title">${list.Product_Name}</h4>
                </a>
                <span class="giasp">`+list.Actual_Price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+`đ</span>&nbsp;
                <span><del>`+list.Quoted_Price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+`đ</del></span><br>
                <button class="btn btn-warning " style="margin-top: 6px; margin-bottom: 3px;" onclick="AddToCart('${list.Product_ID}','${list.Actual_Price}');">Thêm vào giỏ hàng</button>
              </div>
            </div>
        </div>`;
        $(".frmsanpham").html(html);
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
  laymahd();

});

function laymahd(){
  //Thực hiện lấy mahd để thực hiện mua sp (cụ thể là add vào order_detail)
  var makh=localStorage.getItem('makh');
  var da={
    event: "getmahd",
    makh: makh
  }

  queryDataGET_JSON("php/admin_frm_hoadon.php", da, function(res){
    localStorage.setItem("mahd",res.Order_ID);
  });
}

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


function AddToCart(masp,giasp){
    
    if(!localStorage.getItem('makh')){//Nếu mã kh không tồn tại <=> chưa đăng nhập
      alert_info("Bạn phải đăng nhập trước khi mua hàng, xin cảm ơn!");
    }
    else{
      var makh=localStorage.getItem('makh');
      
      giasp=Number(giasp);
      var sl=1;
      var total=giasp*sl;
      
      var dataSend={
        event: "kiemtragh_of_kh",
        makh: makh
      }

      queryDataGET_TEXT("php/giohang.php", dataSend, function(res){
        console.log(res);
        if(res==0){//Nếu giỏ hàng của kh đó chưa có
          var dataSend={
            event: "inserthd",
            makh: makh,
            date: dateTime,
            gia: giasp
          }
      
          queryDataGET_JSON("php/admin_frm_hoadon.php", dataSend, function(res){

            var da={
              event: "getmahd",
              makh: makh
            }
          
            queryDataGET_JSON("php/admin_frm_hoadon.php", da, function(res){
              localStorage.setItem("mahd",res.Order_ID);
            });

          });
        }
        else if(localStorage.getItem("mahd")){
          var mahd=localStorage.getItem("mahd");
          var dataSen={
            event: "insertgh",
            mahd: mahd,
            masp: masp,
            sl: sl,
            price: giasp,
            total: total
          }

          queryDataGET_JSON("php/admin_frm_chitiethoadon.php", dataSen, function(res){
            if(res["insertgh"]==1){
              alert_info("Thêm vào giỏ hàng thành công!");
            }
            else{
              alert_info("Sản phẩm đã có trong giỏ hàng!");
            }
          slsp_giohang();

          });
        }

      });
      
      
    }
}

if(localStorage.getItem('makh')){
  // alert_info("hello");
  var html=`<li><a href="#"><i class=" fa fa-suitcase"></i>Profile</a></li>
  <li class="btn_logout"><a href="#"><i class="fa fa-key"></i> Log Out</a></li>`;
  $('.dieuhuong').html(html);
}

function showAvatarKH(){//Lấy(get) những item đã lưu khi login thành công 
	if(localStorage.getItem("tenkh")){
		var tenkh=localStorage.getItem("tenkh");
		var anh=localStorage.getItem("anh");
		
		$(".myname").html(tenkh);
		$(".myimg").attr("src", "images/"+anh);
	}
}
showAvatarKH();

function logOut(){
	localStorage.clear();
	location.href='login.html';//Come out
}

$(".btn_logout").click(function(){
	logOut();
});