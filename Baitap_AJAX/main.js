function isNumber(n){
	return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

$(document).ready(function(){
    $(".btngiaipt").click(function(){
        if(isNumber($(".txthesoa").val())==false || isNumber($(".txthesob").val())==false){
            alert("Dữ liệu không hợp lệ!");
            $(".txthesoa").val("");
            $(".txthesob").val("");
            $(".txtnghiem").val("");
        }
        else{
            var dataSend={
                event:"Guidatapt",
                hesoa:$(".txthesoa").val(),
                hesob:$(".txthesob").val()
            }
        
            $.get("AJAX_GET.php",dataSend,function(res){
                $(".txtnghiem").val(res);
            });
        }
    });
});