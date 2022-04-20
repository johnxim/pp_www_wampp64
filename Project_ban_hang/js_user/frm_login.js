
$(".btn_login").click(function(){

	var user=$(".txtuser").val();
	var pass=$(".txtpass").val();
	if(user==""){
        alert_info("Vui lòng nhập user name!");
	}	
	else if(pass==""){
        alert_info("Vui lòng nhập password!");
	}	
	else{
		var dataSend={
			event: "login",
			username: user,
			password: pass
		}
		queryDataGET_JSON("php/login.php", dataSend, function(res){
            if(res.event==1){//Nếu tìm thấy 
                localStorage.setItem("userBS", res.items.username);//Lưu biến cục bộ userBS
                localStorage.setItem("passBS", pass);
                localStorage.setItem("avatar", res.items.avatar);
                location.href='index.html';
            }
            else{
                alert_info("Tài khoản hoặc mật khẩu sai!");
            }
		});
	}
});