function queryDataGET_JSON(url, dataSend, callback) {
	$.ajax({
		type: 'GET',
		url: url,
		data: dataSend,
		async: true,
		dataType: 'JSON',
		success: callback
	});
}

function caua(){
    var dataSend={
        event: 'caua'
    }
    queryDataGET_JSON('1851063119.php', dataSend, function(res){
        console.log(res);
    });
}
caua();


function caub(){
    var dataSend={
        event: 'caub'
    }
    queryDataGET_JSON('1851063119.php', dataSend, function(res){
        console.log(res);
    });
}
caub();