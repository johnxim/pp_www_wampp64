//Hàm hiển thị avatar
//Và đây cũng làm hàm không cho truy xuất trực tiếp vào file index
function showAvatar(){//Lấy(get) những item đã lưu khi login thành công
	var makh=localStorage.getItem("makh");
	var tenkh=localStorage.getItem("tenkh");
	var sdt=localStorage.getItem("sdt");
	var diachi=localStorage.getItem("diachi");
	var taikhoan=localStorage.getItem("taikhoan");
	var matkhau=localStorage.getItem("matkhau");
	var anh=localStorage.getItem("anh");
	
	if(taikhoan=="" || taikhoan==undefined || taikhoan==null || taikhoan != 'admin'){
		location.href='login.html';
	}
	else{
		$(".myname").html(tenkh);
		$(".myimg").attr("src", "images/"+anh);
	}
}

showAvatar();

function logOut(){
	//Xóa các biến lưu trình duyệt, kiểu như clear history thường ngày
	// localStorage.removeItem("makh");
	// localStorage.removeItem("tenkh");
	// localStorage.removeItem("sdt");
	// localStorage.removeItem("diachi");
	// localStorage.removeItem("taikhoan");
	// localStorage.removeItem("matkhau");
	// localStorage.removeItem("anh");
	localStorage.clear();
	location.href='login.html';//Come out
}

$(".btn_logout").click(function(){
	logOut();
});