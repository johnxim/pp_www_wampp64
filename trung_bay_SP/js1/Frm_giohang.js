
function capnhatgia(gia, sl, tong){
    var giasp=$('.'+gia).html();
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
            localStorage.setItem(w+b, list.masp);
            tongtien+=Number(list.total);
            html=html +
            '<tr class="truong1 ">'+
                '<td class="product-info2">'+
                    '<div class="">'+
                        '<div class="pull-left">'+
                            '<div class="product-image"><img class="imgsp" src="images/'+list.img+'"></div>'+
                        '</div>'+
                        '<div class="pull-right1">'+
                            '<h5 class="stylettsp">'+list.Product_Name+'</h5>'+
                        '</div>'+
                    '</div>'+
                    '<a href="#" class="product-delete btn btn-warning" id="xoa1">Xóa</a>'+
                '</td>'+
                '<td class="product-price2 '+x+b+'" id="gia1">'+list.Price+'đ</td>'+
                '<td class="product-qty2">'+
                    '<div class="number-box">'+
                        '<input type="number" class="qty '+y+b+'" value="'+list.Quantity+'"'+
                        'onchange="" name="">'+
                    '</div>'+
                '</td>'+
                '<td class="product-total2 '+z+b+'">'+list.total.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'đ</td>'+
            '</tr>';
            
        $(".ttgiohang").html(html);
            b++;
            bienxemslsanpham++;
        }
        localStorage.setItem('mahd',list.mahd);
        tongtien=String(tongtien);
        $("#total-money").html(tongtien.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'đ');

    });
}


$( document ).ready(function() {
    build_giohang();
});


$(".btn_xacnhansl").click(function(){
    //Cập nhật giá khi thay đổi số lượng
        var x="gia";
        var y="sl";
        var k=0;
        var z="tongtien";
        for (i = 0; i < 999; i++) {
            if($('.'+z+i).html()==undefined){
                break;
            }
            if(isNumber(Number($('.'+y+i).val()))==false || Number($('.'+y+i).val())<0){
                alert_info("Vui lòng nhập đúng số lượng!");
                break;
            }
            else{
                capnhatgia(x+i, y+i, z+i);
                var j=$('.'+z+i).html();
                j = j.replace(/,/g, '');//hàm thay dấu ,=''
                j=j.substring(0,j.length-1);//Xóa chữ đ
                j=Number(j);
                k=k+j;
            }
        }
        k=String(k);
        $('#total-money').html(k.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'đ');


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
    var tongtienhd=$('#total-money').html();//Cái này dùng để cập nhật bảng hóa đơn
    tongtienhd=tongtienhd.replace(/,/g, '');//hàm thay dấu ,=''
    tongtienhd=tongtienhd.substring(0,tongtienhd.length-1);//Xóa chữ đ
    var mahd=localStorage.getItem("mahd");

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    var dataSend={
        event:"thanhtoan",
        tongtienhd: tongtienhd,
        mahd: mahd,
        dateTime: dateTime
    }
    queryDataGET_JSON("php/giohang.php", dataSend, function(res){
        if(res["thanhtoan"]==1){
            alert_info("Thanh toán thành công!");
        }
        else{
            alert_error("Thanh toán thất bại!");
        }
    });
    build_giohang();
});