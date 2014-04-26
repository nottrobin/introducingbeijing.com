var generalMethods = {
    debug: false,
    preloadImages: function(imagesSrc,imagesArray) {
        var topSrc = imagesSrc.pop();
        var tempImage = new Image;
        tempImage.src = topSrc;
        var loadingImage = window.setInterval(
            function() {
                if(tempImage.complete) {
                    window.clearInterval(loadingImage);
                    if(tempImage.width != 0) imagesArray.unshift(tempImage);
                    if(imagesSrc.length > 0) preloadImages(imagesSrc);
                }
            },
            50
        );
    },
    getBackgroundImageUrl: function(elementOrId) {
        var myElement;
        var findUrl = new RegExp(/^url\((.*)\)$/);
        
        // Check "dependencies" (variables)
        try{
            if(typeof(objectOrId) == "string") myElement = document.getElementById(elementOrId);
            else if(objectOrId.nodeType != 1) myElement = elementOrId;
            else throw new Error("imageCycler.imageObj is not an elementor a string");
        } catch(e) {
            if(this.debug) alert(e.constructor + " - " + e.message + " - " + e.lineNumber);
            return false;
        }
        
        var searchResult = window.getComputedStyle(myElement,"").backgroundImage.match(findUrl);
        return searchResult[1];
    },
    openNew: function(href,width,height) {
        var justHref = href.replace(/\#[^\#\.\/]*$/,"");
        var name = justHref.replace(/[^a-zA-z0-9_]/g,"");
        var newWindow;
        if(width || height) newWindow = window.open(href,name,"top=center,left=center,width="+width+",height="+height+",menubar=yes,toolbar=no,location=no,resizable=yes,scrollbars=yes");
        else newWindow = window.open(href,name);
        newWindow.focus();
        return false;
    },
    openInParent: function(href) {
        window.opener.location.href = href;
        return false;
    }
}