let urlbase = window.location.href;
const urls = new URL(urlbase);
let idSp = urls.searchParams.get("id");
let prodQuantity = urls.searchParams.get("soluong");
console.log(prodQuantity);

$(document).ready(function(){
    buildsp();
    console.log('idSp-----------', idSp );
});

//Build option ncc
function buildsp(){
    var d={
        event:"getspdetail",
        masp: idSp
    }

    queryDataGET_JSON("php/admin_frm_sanpham.php",d,function (res) {
		buildHTML_SP(res);//Gọi hàm để show dữ liệu
    });
}

function buildHTML_SP(res){
     var data = res.items;

     var html='';
     for (item in data) {
         var list=data[item];
         html=html +
        `<div class="col-md-3">
            <a href="#"><img width="100%" src="images/${list.img}" class="card-img-top" style="border-radius: 25px;"></a>
        </div>
        <div class="col-md-6">
            <div class="profile-desk">
                <h1 class="card-title" style="font-size: 30px;">${list.Product_Name}</h1><br>
                <span class="giathuc giasp" style="padding-bottom: 0px; font-size: 23px;">`+list.Actual_Price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+`đ</span>
                <span style="padding-bottom: 0px;"><del>`+list.Quoted_Price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+`đ</del></span><hr>
                <p class="" style="padding-bottom: 0px;">Thể loại: ${list.Category_ID}</p><hr>
                <p class="" style="padding-bottom: 0px;">Nhà cung cấp: ${list.Supplier_ID}</p><hr>
                <input type="number" class="soluong" value="${prodQuantity}" width="20px" size="5" style="padding: 5px 12px; text-align: center;">&nbsp;&nbsp;
                <button type="button" class="btn btn-primary" onclick="addtocart();" >Thêm vào giỏ hàng</button>
            </div>
        </div>`;
         
         $(".detail_sp").html(html);
     }
}

function addtocart(){
    if(!$('.soluong').val() || $('.soluong').val()<1){
       alert_info("Hãy nhập đúng số lượng");
       $('.soluong').val('');
    }
    else{

        var soluong=$('.soluong').val();
        var giasp=$('.giathuc').html();
        giasp=giasp.replace(/,/g, '');//hàm thay dấu ,=''
        giasp=giasp.substring(0,giasp.length-1);//Xóa chữ đ
        var tongtien=soluong*giasp;
    
        // alert(tongtien);
    
    
        if(!localStorage.getItem('makh')){//Nếu mã kh không tồn tại <=> chưa đăng nhập
          alert_info("Bạn phải đăng nhập trước khi mua hàng, xin cảm ơn!");
        }
        else{
          var makh=localStorage.getItem('makh');
          
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
                gia: tongtien
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
                masp: idSp,
                sl: soluong,
                price: giasp,
                total: tongtien
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

}