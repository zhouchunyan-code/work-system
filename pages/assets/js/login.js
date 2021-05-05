

var form = document.getElementById("login-form");
function submitForm(event){
	event = EventUtil.getEvent(event);
	target = EventUtil.getTarget(event);
	EventUtil.preventDefault(event);

	var btn = target.elements["submit"];
	btn.disable = true;
	var xhr = new XMLHttpRequest();
	xhr.onlode = function (){
		if(xhr.status >=200 && xhr.statue<300){

		}else{
			var warn = document.getElementById("warn");
			warn.innerHTML = xhr.responseText;
		}
		
	};
	xhr.open("post","url",true);
	xhr.send(null);
}
EventUtil.addHandler(form, "submit", submitForm);


































