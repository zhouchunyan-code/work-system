var EventUtil = {
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent(type, handler);
		}else{
			element["on"+type] = handler;
		}
	},

	getEvent: function(event){
		return event? event : window.event;
	},

	getTarget: function(event){
		return event.target? event.target : event.srcElement;
	},

	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},

	removeHandler: function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false)
		}else if(element.detachEvent){
			element.detachEvent(type, handler);
		}else{
			element["on"+type] = null;
		}
	},

	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
};

var form = document.getElementById("login-form");
function submitForm(event){
	event = EventUtil.getEvent(event);
	target = EventUtil.getTarget(event);
	EventUtil.preventDefault(event);

	var btn = target.elements["submit"];
	btn.disable = true;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function (){
		if(xhr.readyState = 4){
			if(xhr.status >=200 && xhr.statue<300){

			}else{
				var warn = document.getElementById("warn");
				warn.innerHTML = xhr.responseText;
			}
		}
	};
	xhr.open("post","url",true);
	xhr.send(null);
}
EventUtil.addHandler(form, "submit", submitForm);


































