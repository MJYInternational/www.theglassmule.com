
function setPoipProductCustomMethods(poip_product) {
	
	
	poip_product.custom_methods['getDefaultContainer.instead'] = function(){
		return $('#single-product-content'); // product page
	}
	
	poip_product.custom_methods.initAdditionalImagesUpdate = function(){
		if ( poip_product.product_option_ids.length ) {
			if ( !poip_product.setDefaultOptionsByURL() ) {
				poip_product.updateImagesOnProductOptionChange(poip_product.product_option_ids[0]);
			}
		} else { // no product option images
			poip_product.initActionWithNoOptionImages();
			
		}
	}
	
	poip_product.custom_methods['init.after'] = function(params){
		// the delayed extra call is necessary because of the theme quickview specific (initially displays the carousel with images having width = 0
		if ( poip_product.theme_settings.quickview ) {
			setTimeout(function(){
				poip_product.custom_methods.initAdditionalImagesUpdate();
			}, 1000);
		}
	}
	
	poip_product.custom_methods['setVisibleImages.instead'] = function(images, counter) {
		
		poip_product.works.set_visible_images = true;
		
		clearTimeout(poip_product.timers.set_visible_images);
		if (!counter) counter = 1;
		if (counter == 1000) {
			poip_product.works.set_visible_images = false;
			return;
		}
		
		if ( poip_product.theme_settings.quickview ) {
			var carousel_selector = '#gallery_02';
		} else {
			var carousel_selector = '#gallery_01';
		}
		
		var $carousel_elem = poip_product.getElement(carousel_selector);
		
		if ( $carousel_elem.length ) {
			
			if ( !poip_product.getElement('[data-poip="images"]').length ) {
				$carousel_elem.before('<div data-poip="images" style="display:none;"></div>');
				$carousel_elem.find('a').each(function(){
					poip_product.getElement('[data-poip="images"]').append( poip_common.getOuterHTML($(this)) );
				});
			}
			
			var current_carousel = $carousel_elem.data('owl.carousel'); // strange version of the owl carousel
			if ( !poip_product.set_visible_images_is_called ) {
				if ( !current_carousel || !$carousel_elem.find('.owl-item').length || ( !poip_product.theme_settings.quickview &&  !$('.zoomContainer').length) ) {
					poip_product.set_visible_images_timer_id = setTimeout(function(){
						poip_product.custom_methods['setVisibleImages.instead'](images, counter+1);
					}, 100);
					return;
				}
				poip_product.custom_data.set_visible_images_is_called = true;
			} else {
			
				var current_imgs = [];
				$carousel_elem.find('a').each( function(){
					current_imgs.push($(this).attr('data-zoom-image'));
				});
				
				if ( current_imgs.toString() == images.toString() ) {
					poip_product.works.set_visible_images = false;
					return; // nothing to change
				}
			}
				
			/*
			var elems_cnt = current_carousel.itemsAmount;
			for (var i = 1; i<=elems_cnt; i++ ) {
				current_carousel.removeItem();
			}
			*/
			
			var html = '';
			poip_common.each(images, function(image){
				
				var poip_img = poip_product.getImageBySrc(image, 'popup');
				var title = (poip_img && poip_img.title) ? poip_img.title : poip_product.default_image_title;
				
				html+= '<a href="#" class="thumbnail elevatezoom-gallery test" data-image="'+poip_img.thumb+'" data-zoom-image="'+poip_img.popup+'" title="'+title+'">';
				html+= '<img src="'+poip_img.thumb+'" title="'+title+'" alt="'+title+'" />';
				html+= '</a>';
				
			});
			
			if ( poip_product.theme_settings.quickview ) {
				$carousel_elem.replaceWith('<div id="gallery_02" class="thumbnails-additional owl-carousel owl-theme">'+html+'</div>');
				$carousel_elem = poip_product.getElement(carousel_selector);
				
				$carousel_elem.owlCarousel({
					items: 4,
					nav: true,
					dots: false,
					navSpeed: 1000,
					margin: 10,		
					navText : ['<i class="ion-chevron-left"></i>','<i class="ion-chevron-right"></i>'],
				});
				
			} else {
				
				$carousel_elem.replaceWith('<div id="gallery_01" class="thumbnails-additional owl-carousel owl-theme">'+html+'</div>');
				$carousel_elem = poip_product.getElement(carousel_selector);
				$carousel_elem.owlCarousel({
					items: 4,
					loop: false,
					nav: true,
					dots: false,
					navSpeed: 1000,
					margin: 20,		
					navText : ['<i class="ion-chevron-left"></i>','<i class="ion-chevron-right"></i>'],
					responsive:{
						0:{
							items: 3,
						},
						480:{
							items: 4,
						},
					},				
				});	
			}
			
			
			//current_carousel.addItem(html);
			//current_carousel.reinit();
			
			$carousel_elem.off('click', 'a');
			$carousel_elem.on('click', 'a', function(e){
				e.preventDefault();
				var $a = $(this);
				if ( $a.parent().is('.cloned') ) {
					$a_for_event = $a.parent().siblings(':not(.cloned)').find('a[data-image="'+$a.attr('data-image')+'"]:first');
				} else {
					$a_for_event = $a;
				}
				poip_product.eventAdditionalImageMouseover(e, $a_for_event); // change main image on click
			});
			
			/*
			$carousel_elem.find('a').off('click');
			$carousel_elem.find('a').click(function(e){
				e.preventDefault();
				poip_product.eventAdditionalImageMouseover(e, $(this)); // change main image on click
			});
			*/
			
		}
	
		poip_product.works.set_visible_images = false;
	}
	
	poip_product.custom_methods['getAdditionalImagesBlock.instead'] = function(){
		return poip_product.getElement('.thumbnails-additional');
	}
	
	poip_product.custom_methods['setMainImage.after'] = function(image){
		
		if ( !poip_product.theme_settings.quickview ) {
			var $main_image = poip_product.getMainImage();
			if ( $main_image.attr('data-zoom-image') ) {
				$main_image.attr('data-zoom-image', image);
				$main_image.data('zoomImage', image);
			}
			
			poip_product.elevateZoomDirectChange(image, 100);
			
			// disable click
			$main_image.closest('a').off('click');
			$main_image.closest('a').click(function(e){
				e.preventDefault();
				e.stopPropagation();
			});
		}
	}
	
	poip_product.custom_methods['eventAdditionalImageMouseover.after'] = function(e, $element){
		$element.parent().parent().find('a').removeClass('current-additional');
		$element.addClass('current-additional');
		$element.parent().siblings('.cloned').find('a[data-image="'+$element.attr('data-image')+'"]').addClass('current-additional'); // set for clones tooe
	}
	
	poip_product.custom_methods['getMainImage.instead'] = function(image){
		return poip_product.getElement('.thumbnails .thumbnail img');
	}
	
	poip_product.custom_methods['getAdditionalImageSrc.instead'] = function($element) {
		return $element.attr('data-zoom-image');
	}
	
	poip_product.custom_methods['getContainerOfOptions.instead'] = function() {
		return poip_product.getElement('.option-container');
	}
	

	
	
}	
	
	
	
	