            var imageExtension;

            if(browserDetect.browser == "Explorer" && browserDetect.version < 7) imageExtension = "jpg";
            else imageExtension = "png";

            // Preload images
            var preloadedImagesArray = new Array();
            var preloadImageSources = new Array(
                "images/nav/day_one_hover." + imageExtension,
                "images/nav/day_two_hover." + imageExtension,
                "images/nav/day_three_hover." + imageExtension,
                "images/nav/contact_us_hover." + imageExtension
            );
            while(preloadImageSources.length > 0) {
                preloadedImagesArray.unshift(generalMethods.preloadImages(preloadImageSources,preloadedImagesArray));
            }