/*!

three-dots.js v0.0.2

Copyright (c) 2017 Dan Dev

Released under the MIT license
https://github.com/DanDevG/three-dots-js/master/LICENSE.md

*/

(function() {
	this.threeDots = function(els) {
		window.onresize = function() {
			threeDots(els);
		};
		
		var nodes = document.getElementsByClassName(els);
		var numOfNodes = nodes.length;
		var nodesHelpers = document.getElementsByClassName("threeDotsHelpers");
		var regex = new RegExp(els);
		var className = String(regex).slice(1, -1);
		var helpersContainer = document.getElementById("threeDotsHelpersContainer");
		
		if (!helpersContainer) {
			helpersContainer = createHelpersContainer();
		}
		
		for (var i = 0; i < numOfNodes; i++) {
			var cl = nodes[i].getAttribute("class").split(" ");
			var classIndex = -1;
			var num = -1;
			
			for (var j = 0; j < cl.length; j++) {
				var elNum = Number(cl[j].replace(regex, ""));
				
				if (!isNaN(elNum) && elNum !== 0) {
					classIndex = j;
					num = elNum;
				}
			}
			
			if (classIndex !== -1) {
				nodes[i].innerHTML = document.getElementsByClassName(className + String(num))[1].innerHTML;
			} else {
				var newClass = className + String(nodesHelpers.length + 1);
				nodesHelpers = document.getElementsByClassName("threeDotsHelpers");
				var newNode = document.createElement("p");
				var textNode = document.createTextNode(nodes[i].innerHTML);
				newNode.appendChild(textNode);
				newNode.setAttribute("class", "threeDotsHelpers " + newClass);
				helpersContainer.appendChild(newNode);
				
				nodes[i].setAttribute("class", className + " " + newClass);
			}
		}
		
		for (var i = 0; i < numOfNodes; i++) {
			
			if (isOverflowed(nodes[i])) {
				var sHeight = nodes[i].scrollHeight;
				var cHeight = nodes[i].clientHeight;
				var pointOfTruncating = nodes[i].innerHTML.slice(0, parseInt(nodes[i].innerHTML.length * (cHeight / sHeight)));
				
				nodes[i].innerHTML = pointOfTruncating;
				
				while (isOverflowed(nodes[i])) {
					nodes[i].innerHTML = nodes[i].textContent.slice(0, -3) + "&hellip;";
				}
			}
		}
	};
	
	function isOverflowed(el){
	    return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
	}
	
	function createHelpersContainer() {
		var newNode = document.createElement("div");
		newNode.setAttribute("id", "threeDotsHelpersContainer");
		newNode.style.display = "none";
		document.body.appendChild(newNode);
		
		return document.getElementById("threeDotsHelpersContainer");
	}
}());