
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
                localStorage.setItem("makh", res.items.Cus_ID);
                localStorage.setItem("tenkh", res.items.Cus_Name);
                localStorage.setItem("sdt", res.items.Phone_Number);
                localStorage.setItem("diachi", res.items.Cus_Address);
                localStorage.setItem("taikhoan", res.items.Acc_username);
                localStorage.setItem("anh", res.items.avatar);
                if(res.items.Acc_username=='admin'){
                    location.href='index_admin.html';
                }
                else{
                    location.href='index_kh.html';
                }
            }
            else{
                alert_info("Tài khoản hoặc mật khẩu sai!");
            }
		});
	}
});

showAvatar();