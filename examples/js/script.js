window.onload = function() {
	threeDots("brick-inner");
	
	document.getElementsByTagName("header")[0].addEventListener("mouseenter", function(event) {
		this.setAttribute("class", "active");
		moveTooltip(event);
		this.addEventListener("mousemove", moveTooltip);
	});
	document.getElementsByTagName("header")[0].addEventListener("mouseleave", function() {
		this.removeAttribute("class", "active");
		this.removeEventListener("mousemove", moveTooltip);
	});
};

function moveTooltip(event) {
	var left = event.clientX - 150;
	
	if (left < 0) {
		left = 0;
	} else if (left > window.innerWidth - 300) {
		left = window.innerWidth - 300;
	}
	
	left = String(left) + "px";
	
	document.getElementsByClassName("tooltip")[0].style.left = left;
}