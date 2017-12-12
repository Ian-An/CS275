function login(){
	var user = $('#UserName').get(0).value;
	var pass = $('#Password').get(0).value;
	var URL = 'http://localhost:8080/login';
	$.ajax({
		type: 'GET',
		url: URL,
		data: {'user':user, 'pass':pass},
		dataType: 'html',
		success: function(msg){
			welcome =  "Welcome "+ user;
			$("#welc").html(welcome)
			$("#content").html(msg);

		}
	});
}
function createUser() {
	var user = $('#enterUserName').get(0).value;
	var pass = $('#enterPassword').get(0).value;
	var confirmPass = $('#confirmPassword').get(0).value;
	var URL = 'http://localhost:8080/create';
	
	if(pass != confirmPass) {
		alert("Passwords do not match");
	} else {
		$.ajax({
			type: 'GET',
			url: URL,
			data: {'user':user, 'pass':pass},
			dataType: 'html',
			success: function(msg){
				alert('Account created sucessfully');
			}
		});
	}
	var URL = 'http://localhost:8080/login';
}

function home(){
	var URL = "http://localhost:8080/home";	
	
	//request to define output
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "html",
		success: function(msg){
			$("#content").html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log("Could not get data");
		}
	});
}
function upload(){
	var URL = "http://localhost:8080/upload";	
	
	//request to define output
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "html",
		success: function(msg){
			$("#content").html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log("Could not get data");
		}
	});
}

function uploadItem() {
	var URL = "http://localhost:8080/uploadItem";
	var itemName = document.getElementById("itemName").value;
	var imageURL = document.getElementById("imageURL").value;
	var listPrice = document.getElementById("listPrice").value;
	var description = document.getElementById("desc").value;
	var jsonObj = {"listPrice" : listPrice,
	"itemName" : itemName,
	"imageURL" : imageURL,
	"description" : description
	};
	$.ajax({
    type: "GET",
    url: URL,
    data: jsonObj,
    dataType: "html",
    success: function(msg) {
		alert("Your item was uploaded Successfully!")
    	home();
    },
    error: function(jgXHR, textStatus,errorThrown){
      alert("Error: " + textStatus + " " + errorThrown);
    }
  });
}

function explore(){
	var URL = "http://localhost:8080/explore";	
	
	//request to define output
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "html",
		success: function(msg){
			$("#content").html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log("Could not get data");
		}
	});
}