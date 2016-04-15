(function(){	
	document.getElementById('navMobileStart').addEventListener("click",openMenuMobile);	

})();

function openMenuMobile(){
	var menu = document.getElementById('navMobileStart');
	var brand = document.getElementById('brand');
	var home = document.getElementById('home');
	var navMobile = document.getElementById('menu');
	var sw = menu.classList.contains('navMobileStart')

	if (!sw) {
		menu.classList.add('navMobileStart');
		home.classList.add('home');
		navMobile.classList.add('menuMove')
		brand.classList.add('brandMove')
	}else{
		menu.classList.remove('navMobileStart');
		home.classList.remove('home');
		navMobile.classList.remove('menuMove')
		brand.classList.remove('brandMove')
	}
}

function loadJSON(){

	var data_file = "/api/nav.json";
    var http_request = new XMLHttpRequest();    
	
    http_request.onreadystatechange = function(){
	
       if (http_request.readyState == 4 && http_request.status == 200){

          var jsonObj = JSON.parse(http_request.responseText);
          
          callMenu(jsonObj);

       }
    };
	
    http_request.open("GET", data_file, true);
    http_request.send();

    function callMenu(arg){
    	var menu = "";
    	var subMenu = "";
	    var i;
	    var j;

	    for(i = 0; i < arg.items.length; i++) {	        
	        
	        if (arg.items[i].items[i] !== undefined) {
	        	menu += '<li id="subMenuOp_'+i+'" ><a href="'+ arg.items[i].url +'">' + arg.items[i].label + '</a><ul class="subMenu" id="subMenu_'+i+'"></ul></li>';	        	
	        }else{
	        	menu += '<li><a href="'+ arg.items[i].url +'">' + arg.items[i].label + '</a></li>';
	        }	       
	         
	    }
	    document.getElementById("menu").innerHTML = menu;
	    
	    for(i = 0; i < arg.items.length; i++){
		    for (j = 0; j < arg.items[i].items.length; j++) {

		    	subMenu += '<li><a href="' + arg.items[i].items[j].url +'">' + arg.items[i].items[j].label + '</a></li>';

			    /*var node = document.createElement("li");
				var textnode = document.createTextNode('<a href="#">' + arg.items[i].items[j].label + '</a>');
				node.appendChild(textnode);
				document.getElementById("subMenu_1").appendChild(node);		*/		

			}

		}
		document.getElementById("subMenu_1").innerHTML = subMenu;
	    copyRights()
    }
    
 }

self.addEventListener("load",loadJSON); 

function copyRights(){
	var node = document.createElement("span");
	var textnode = document.createTextNode("© 2016 Huge. All Rights Reserved.");
	node.appendChild(textnode);
	document.getElementById("menu").appendChild(node);
}