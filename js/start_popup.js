            var elem = document.getElementById('popupClose');
            elem.appendChild(document.createTextNode("close window"));
            elem.onfocus = function() {window.close();}
            elem.onclick = function() {window.close();}