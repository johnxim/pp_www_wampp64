//Hàm cập nhật giá
function capnhatgia(gia, sl, tong){
    var giasp=$('.'+gia).html();
    giasp = giasp.replace(/,/g, '');//hàm thay dấu ,=''
    giasp=giasp.substring(0,giasp.length-1);//Xóa chữ đ
    giasp=Number(giasp);
    var soluong=$('.'+sl).val();
    soluong=Number(soluong);
    var tongtien=giasp*soluong;
    tongtien=String(tongtien);
    $('.'+tong).html(tongtien.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'đ');
}

var bienxemslsanpham=0;

function build_giohang(){
    var makh=localStorage.getItem("makh");
    var dataSend={
		event:"getgh",
		makh: makh
    }
    queryDataGET_JSON("php/giohang.php",dataSend,function (res) {
        $(".ttgiohang").html("");
        var data = res.items;
        var html='';
        var tongtien=0;
        var b=0;
        var x="gia";
        var y="sl";
        var z="tongtien";

        var w='sp';
        for (item in data) {
            
            var list=data[item];
            console.log("list------------------------", list);
            localStorage.setItem(w+b, list.masp);
            tongtien+=Number(list.total);
            html=html +
            `<tr class="truong1 ">
                <td class="product-info2">
                    <div class="">
                        <div class="pull-left">
                            <div class="product-image"><a href="detail_sp.html?id=${list.masp}&soluong=${list.Quantity}"><img class="imgsp" src="images/${list.img}"></a></div>
                        </div>
                        <div class="pull-right1">
                            <a href="detail_sp.html?id=${list.masp}&soluong=${list.Quantity}">
                                <h5 class="stylettsp">${list.Product_Name}</h5>
                            </a>
                        </div>
                    </div>
                    <a href="#" class="product-delete btn btn-warning" id="xoa1" onclick="Xoasp(${list.mahd},'${list.masp}')">Xóa</a>
                </td>
                <td class="product-price2 `+x+b+`" id="gia1">`+list.Price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+`đ</td>
                <td class="product-qty2">
                    <div class="number-box">
                        <input type="number" class="qty `+y+b+`" value="${list.Quantity}" onchange="onchangesl()">
                    </div>
                </td>
                <td class="product-total2 `+z+b+`">`+list.total.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+`đ</td>
            </tr>`;
            
        $(".ttgiohang").html(html);
            b++;
            bienxemslsanpham++;
        }
        if($(".ttgiohang").html()==''){
            var thongbao=
            `<tr>
                <td colspan="4" align="center">
                    <h4>Giỏ hàng của bạn chưa có sản phẩm nào</h4>
                    <p><a href="index_kh.html" style="color:rgb(0, 83, 207)">Bạn hãy mua hàng ngay nhé</a></p>
                </td>
            </tr>`
            $(".ttgiohang").html(thongbao);

        }
        localStorage.setItem('mahd',list.mahd);
        tongtien=String(tongtien);
        $("#total-money").html(tongtien.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'đ');

    });
}


$( document ).ready(function() {
    build_giohang();
});


function onchangesl(){
    //Cập nhật giá khi thay đổi số lượng
    var x="gia";
    var y="sl";
    var z="tongtien";
    for (i = 0; i < 999; i++) {
        if($('.'+z+i).html()==undefined){
            break;
        }
        else if(isNumber(Number($('.'+y+i).val()))==false || Number($('.'+y+i).val())<1){
            alert_info("Vui lòng nhập đúng số lượng!");
            $('.'+y+i).val('1');
            break;
        }
        else{
            capnhatgia(x+i, y+i, z+i);
            var j=$('.'+z+i).html();
            j = j.replace(/,/g, '');//hàm thay dấu ,=''
            j=j.substring(0,j.length-1);//Xóa chữ đ
            j=Number(j);
        }
    }

}


$(".btn_xacnhansl").click(function(){
    //Cập nhật giá khi thay đổi số lượng
        var all=0;
        var z="tongtien";
        for (i = 0; i < 999; i++) {
            if($('.'+z+i).html()==undefined){
                break;
            }
            else{
                var tongtien=$('.'+z+i).html();
                tongtien = tongtien.replace(/,/g, '');//hàm thay dấu ,=''
                tongtien=tongtien.substring(0,tongtien.length-1);//Xóa chữ đ
                tongtien=Number(tongtien);
                all=all+tongtien;
            }
        }
        all=String(all);
        $('#total-money').html(all.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'đ');


    //Cập nhật DB chi tiết hóa đơn
        var mahd=localStorage.getItem("mahd");
        var y="sl";
        var z="tongtien";
        var w='sp';
        var biendemthanhcong=0;

        for (i = 0; i < 999; i++){
        
            if(localStorage.getItem(w+i)==''){
                break;
            }
        
            var masp=localStorage.getItem(w+i);//sp0
            var sl=$('.'+y+i).val();//sl0
            var tongtien=$('.'+z+i).html();//tongtien0
            tongtien=tongtien.replace(/,/g, '');//hàm thay dấu ,=''
            tongtien=tongtien.substring(0,tongtien.length-1);//Xóa chữ đ
            var dataSend={
                event:"updategh",
                sl: sl,
                tongtien: tongtien,
                mahd: mahd,
                masp: masp
            }
            queryDataGET_JSON("php/giohang.php", dataSend, function(res){
                if(res["updategh"]==1){
                    biendemthanhcong++;
                }
            });
        }
        //Hiện tại vòng for lặp xong thì nó chấm dứt, không thể đọc được dòng dưới đây mặc dù đã update thành công
        // if(biendemthanhcong==bienxemslsanpham){
        //     alert_info("Cập nhật giỏ hàng thành công!");
        //     }
        // else{
        //     alert_error("Cập nhật giỏ hàng không thành công");
        // }
});


$('.btn_thanhtoan').click(function(){
    if(!localStorage.getItem('makh')){
        alert_info("Bạn phải đăng nhập trước khi mua hàng, xin cảm ơn!");
    }
    else if($('#total-money').html()=='0đ'){
        alert_info('Giỏ hàng của bạn đang rỗng, bạn vui lòng mua hàng trước khi thanh toán!');
    }
    else{
        var tongtienhd=$('#total-money').html();//Biến này dùng để cập nhật bảng hóa đơn
        tongtienhd=tongtienhd.replace(/,/g, '');//hàm thay dấu ,=''
        tongtienhd=tongtienhd.substring(0,tongtienhd.length-1);//Xóa chữ đ
        var mahd=localStorage.getItem("mahd");
        
        var dataSend={
            event:"thanhtoan",
            tongtienhd: tongtienhd,
            mahd: mahd,
            dateTime: dateTime
        }
        
        queryDataGET_JSON("php/giohang.php", dataSend, function(res){
            if(res["thanhtoan"]==1){
                alert_info("Thanh toán thành công!");
                build_giohang();
            }
            else{
                alert_error("Thanh toán thất bại!");
            }
        });
    }
    
});


function Xoasp(mahd, masp){

    bootbox.confirm("Bạn có chắc xóa sản phẩm này không?", function (result) {
        if (result == true) {
            
            var dataSend={
                event:'xoagh',
                mahd: mahd,
                masp: masp
            }
            
            queryDataGET_JSON("php/giohang.php", dataSend, function(res){
                // if(res["xoagh"]==1){
                //     alert_info("Xóa thành công!");
                // }
                // else{
                //     alert_error("Xóa thất bại!");
                // }
                build_giohang();
            });

            if($('.tongtien0').html()){
                $('#total-money').html('0đ');
 ;           }
        }
    });






    
    
}