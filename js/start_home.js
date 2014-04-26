            // cycling header images
            var header_background_images_src;
            var imageExtension;

            if(browserDetect.browser == "Explorer" && browserDetect.version < 7) imageExtension = "jpg";
            //else imageExtension = "png";
            else imageExtension = "jpg";
            header_background_images_src = new Array(
                "images/header/bridge." + imageExtension,
                "images/header/bronze_lion." + imageExtension,
                "images/header/forbidden_city_1." + imageExtension,
                "images/header/huiyinbi." + imageExtension,
                "images/header/stone_ship." + imageExtension,
                "images/header/forbidden_city_2." + imageExtension,
                "images/header/great_wall_2." + imageExtension,
                "images/header/ming_tomb." + imageExtension,
                "images/header/lake." + imageExtension,
                "images/header/northsea_park." + imageExtension
            );

            // Preload other images
            var preloadedImagesArray = new Array();
            var preloadImageSources = new Array(
                "images/nav/day_one_hover." + imageExtension,
                "images/nav/day_two_hover." + imageExtension,
                "images/nav/day_three_hover." + imageExtension,
                "images/nav/contact_us_hover." + imageExtension
            );

            while(preloadImageSources.length > 0) {generalMethods.preloadImages(preloadImageSources,preloadedImagesArray);}

            /* 
            * Background image change stuff
            */
            // Check dependent stylesheet is loaded
            var dependentStylesheet = "layout_home.css";
            var styleSheetPresent = false;
            var styleSheetObject;
            for(var i = 0; i < document.styleSheets.length; i++) {
                if(document.styleSheets[i].href.match(dependentStylesheet + "$")) styleSheetObject = document.styleSheets[i];
            }

            // If stylesheet is indeed there then do the image change stuff
            if(styleSheetObject && ((styleSheetObject.cssRules && styleSheetObject.cssRules.length > 0) || (styleSheetObject.rules && styleSheetObject.rules.length > 0))) {
                // Do the image cycling stuff
                // Set milliseconds to 0 if it's ie, cos fade won't work
                var fade = true;
                var milliseconds = 8000;
                if(browserDetect.browser == "Explorer") fade = false;

                // Prepare cycle object
                if(imageCycler.prepare(header_background_images_src,document.getElementById("header"),milliseconds,fade)) {
                    // Load fade controls
                    imageCycler.loadFadeControls(document.getElementById("headerBackgroundControls"));

                    // Start cycling images
                    imageCycler.start();
                }
            }