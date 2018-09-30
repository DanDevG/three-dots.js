/*!

three-dots.js v0.0.3

Copyright (c) 2017 Dan Dev

Released under the MIT license
https://github.com/DanDevG/three-dots-js/master/LICENSE.md

*/

(function() {
	this.threeDots = function(els, handleLinks) {
		window.onresize = function() {
			threeDots(els, handleLinks);
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
			
			// if threeDotsHelpers container for this node has been created already
			if (classIndex !== -1) {
				// just copy text from needed helper container into the node
				nodes[i].innerHTML = document.getElementById("threeDotsHelpersContainer")
												.querySelector("." + className + String(num))
												.querySelector(".text-container").innerHTML;
			} else {
				// create a helper container for the node and copy the node's text and "Read more" link (if it exists) into the helper container
				var newClass = className + String(nodesHelpers.length + 1);
				nodesHelpers = document.getElementsByClassName("threeDotsHelpers");
				var newNode = document.createElement("p");
				
				if (handleLinks) {
					var link = nodes[i].querySelector("a");
					
					if (link) {
						link = link.cloneNode(true);
						popLink(nodes[i]);
					}
				}
				
				var innerTextNode = document.createElement("span");
				innerTextNode.setAttribute("class", "text-container");
				var textNode = document.createTextNode(nodes[i].innerHTML);
				innerTextNode.appendChild(textNode);
				newNode.appendChild(innerTextNode);
				
				if (handleLinks) {
					if (link) {
						newNode.appendChild(link);
					}
				}
				
				newNode.setAttribute("class", "threeDotsHelpers " + newClass);
				
				helpersContainer.appendChild(newNode);
				
				nodes[i].setAttribute("class", className + " " + newClass);
			}
		}
		
		for (var i = 0; i < numOfNodes; i++) {
			
			if (isOverflowed(nodes[i])) {
				if (handleLinks) {
					popLink(nodes[i]);
				}
				
				var sHeight = nodes[i].scrollHeight;
				var cHeight = nodes[i].clientHeight;
				var pointOfTruncating = nodes[i].innerHTML.slice(0, parseInt(nodes[i].innerHTML.length * (cHeight / sHeight)));
				
				nodes[i].innerHTML = pointOfTruncating + "&hellip; ";
				
				if (handleLinks) {
					appendLink(nodes[i], className, i);
				}
				
				// console.log(nodes[i]);
				
				while (isOverflowed(nodes[i])) {
					if (handleLinks) {
						popLink(nodes[i]);
					}
					
					nodes[i].innerHTML = nodes[i].textContent.slice(0, -3) + "&hellip; ";
					
					if (handleLinks) {
						appendLink(nodes[i], className, i);
					}
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
	
	function appendLink(node, className, i) {
		var link = document.getElementById("threeDotsHelpersContainer")
												.querySelector("." + className + String(i + 1))
												.querySelector("a");
		
		if (link) {
			link = link.cloneNode(true);
			node.appendChild(link);
		}
	}
	
	function popLink(node) {
		while(node.lastChild && node.lastChild.nodeType !== Node.TEXT_NODE) {
		    node.removeChild(node.lastChild);
		}
	}
}());