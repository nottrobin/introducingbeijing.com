var imageCycler = {
    // Global variables to hold image change interval object and reverse status
    debug: false,
    cycleImages: 0,
    reverse: false,
    imageObj: 0,
    imagesArray: new Array(),
    changeSpeed: 8000,
    fade: true, 
    opacity: 1,
    fadeLock: false,
    
    // Initialisation
    prepare: function(imagesSrc,imageObj,changeSpeed,fade,reverse) {
        try {
            if(imageObj.nodeType != 1) throw new Error("missing imageObj element");
            else this.imageObj = imageObj;
            
            if(typeof(changeSpeed) != "undefined" && typeof(changeSpeed) != "number") throw new Error("argument 'changeSpeed' is not a number");
            else if(typeof(changeSpeed) != "undefined") this.changeSpeed = changeSpeed;
            
            if(typeof(fade) != "undefined" && typeof(fade) != "boolean") throw new Error("argument 'fade' is not a boolean");
            else if(typeof(fade) != "undefined") this.fade = fade;
            
            if(typeof(reverse) != "undefined" && typeof(reverse) != "boolean") throw new Error("argument 'reverse' is not a boolean");
            else if(typeof(reverse) != "undefined") this.reverse = reverse;
            
            if(imagesSrc.length == 0) throw new Erray("missing image sources array");
            else imageCycler.preloadBackgroundImages(imagesSrc);
        } catch(e) {
            if(this.debug) alert(e.constructor + " - " + e.message + " - " + e.lineNumber);
            return false;
        }
        
        return true;
    },
    
    // General methods
    preloadBackgroundImages: function(imagesSrc) {
        var topSrc = imagesSrc.pop();
        var tempImage = new Image;
        tempImage.src = topSrc;
        var loadingImage = window.setInterval(
            function() {
                if(tempImage.complete) {
                    window.clearInterval(loadingImage);
                    if(tempImage.width != 0) imageCycler.imagesArray.unshift(tempImage);
                    if(imagesSrc.length > 0) imageCycler.preloadBackgroundImages(imagesSrc);
                }
            },
            50
        );
    },
    
    // Image fade methods
    //===================
    
    // Main fade method, fade background image of object into an new image
    fadeChangeBackgroundImage: function(new_image,locked) {
        // Set the lock
        if(!this.fadeLock) this.fadeLock = true;
        else if(!locked && this.fadeLock) return;
        
        // Check "dependencies" (variables)
        try {if(this.imageObj.nodeType != 1) throw new Error("imageCycler.imageObj is not an element");}
        catch(e) {
            if(this.debug) alert(e.constructor + " - " + e.message + " - " + e.lineNumber);
            return false;
        }
        
        // Variables for change
        var replacedImage = false; // Shows whether the replacement has taken place
        
        // Do the change
        if(this.fade) {
            var changingImage = window.setInterval(
                // Function to be applied every interval
                function() {                
                    // Apply current opacity to object
                    if(imageCycler.opacity >= 0 && imageCycler.opacity <= 1) {
                        imageCycler.imageObj.style.opacity = imageCycler.opacity
                    } else {
                        window.clearInterval(changingImage);
                        return;
                    }
                    
                    // Reduce opacity to 0, if not replaced
                    if(!replacedImage) {
                        if(imageCycler.opacity > 0) {
                            imageCycler.opacity = Math.round((imageCycler.opacity - 0.25)*100) / 100;
                        } else if(!replacedImage && imageCycler.opacity == 0) {
                            imageCycler.imageObj.style.backgroundImage = "url('" + new_image.src + "')";
                            replacedImage = true;
                        }
                    }
                    
                    // If image has been replaced, increase opacity to 1
                    if(replacedImage) {
                        if(imageCycler.opacity < 1) {
                            imageCycler.opacity = Math.round((imageCycler.opacity + 0.20)*100) / 100;
                        } else if(imageCycler.opacity == 1) {
                            // Done!!
                            window.clearInterval(changingImage);
                            
                            // Remove the lock
                            imageCycler.fadeLock = false;
                        }
                    }
                }
                ,120
            );
        } else {
            imageCycler.imageObj.style.backgroundImage = "url('" + new_image.src + "')";
            replacedImage = true;
            imageCycler.fadeLock = false;
        }
            
        return;
    },
    
    // Cycle Methods
    //==============
    start: function() { // Start cycling images every <changeSpeed> changeSpeed
        this.cycleImages = window.setInterval(
            function() {
                // Check variables exist
                try {
                    if(imageCycler.imageObj.nodeType != 1) throw new Error("imageCycler.imageObj is not an element");
                    if(imageCycler.imagesArray.length == 0) throw new Error("imageCycler.imagesArray is empty");
                } catch(e) {
                    if(imageCycler.debug) alert(e.constructor + " - " + e.message + " - " + e.lineNumber);
                    return false;
                }
                
                if(imageCycler.imagesArray.length > 0) {
                    // Copy front image and place it at back
                    imageCycler.swapImage(imageCycler.reverse);
                }
            }
            ,imageCycler.changeSpeed
        );
    },
    stop: function() { // Does what it says on the tin
        window.clearInterval(this.cycleImages);
        this.cycleImages = 0;
    },
    swapImage: function(reverse) { // Fade out to next image in array
        // Check "dependencies" (variables)
        try{
            if(this.imageObj.nodeType != 1) throw new Error("imageCycler.imageObj is not an element");
            if(imageCycler.imagesArray.length == 0) throw new Error("imageCycler.imagesArray is empty");
        } catch(e) {
            if(this.debug) alert(e.constructor + " - " + e.message + " - " + e.lineNumber);
            return false;
        }
        
        // Check the lock
        if(this.fadeLock) return;
        else this.fadeLock = true;
        
        // Create images to swap
        var new_image;
        if(reverse) new_image = this.imagesArray.pop();
        else new_image = this.imagesArray.shift();
        var old_image = new Image;
        
        // Find url from backgroundImage
        var findUrl = new RegExp(/^url\((.*)\)$/);
        //var thisUrl = window.location.href.match("^")
        var oldUrl;
        var searchResult;
        if(window.getComputedStyle && window.getComputedStyle(this.imageObj,"").backgroundImage != 'none') oldUrl = window.getComputedStyle(this.imageObj,"").backgroundImage.match(findUrl)[1];
        else if(this.imageObj.currentStyle && typeof(this.imageObj.currentStyle.backgroundImage) != "undefined") oldUrl = this.imageObj.currentStyle.backgroundImage.match(findUrl)[1];
        else if(this.imageObj.style && this.imageObj.style.backgroundImage && typeof(this.imageObj.style.backgroundImage) != "undefined") oldUrl = this.imageObj.style.backgroundImage.match(findUrl)[1];
        
        // If we managed to find an old image, add it to the array
        if(oldUrl) {
            old_image.src = oldUrl.replace(/"/g,""); // Remove all quotation marks and replace url
            if(reverse) this.imagesArray.unshift(old_image);
            else this.imagesArray.push(old_image);
        }
        
        // Do the swap
        this.fadeChangeBackgroundImage(new_image, true);
        
        return;
    },
    
    loadFadeControls: function(controlObj) { // Load controls for the image cycling
        // Check "dependencies" (variables)
        try {if(controlObj.nodeType != 1) throw new Error("argument 'controlObj' is not an element");}
        catch(e) {
            if(this.debug) alert(e.constructor + " - " + e.message + " - " + e.lineNumber);
            return false;
        }
        
        var previousImage = document.createElement("span");
        previousImage.appendChild(document.createTextNode("previous"));
        previousImage.onclick = function() {imageCycler.swapImage(true);}
          
        var nextImage = document.createElement("span");
        nextImage.appendChild(document.createTextNode("next"));
        nextImage.onclick = function() {imageCycler.swapImage(false);}
          
        var startStopImage = document.createElement("span");
        startStopImage.appendChild(document.createTextNode("stop"));
        startStopImage.onclick = function() {
            if(imageCycler.cycleImages) {
                this.replaceChild(document.createTextNode("start"), this.firstChild);
                imageCycler.stop();
            } else {
                this.replaceChild(document.createTextNode("stop"), this.firstChild);
                imageCycler.start();
            }
        }
        
        controlObj.appendChild(previousImage);
        controlObj.appendChild(startStopImage);
        controlObj.appendChild(nextImage);
        
        return;
    }
}