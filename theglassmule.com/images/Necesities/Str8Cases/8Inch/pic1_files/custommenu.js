$(document).ready(function(){
    $("#pt_menu_link ul li").each(function(){
        var url = document.URL;
        $("#pt_menu_link ul li a").removeClass("act");
        $('#pt_menu_link ul li a[href="'+url+'"]').addClass('act');
    });
	
	$(".pt_menu_link a").each(function(){
		var url = document.URL;
        var url1 = url.split("/");
		if(url1[4] && url1[4]!=""){
			url3 = url1[4].split("&");
			url2 = "/" + url1[3] + "/" + url3[0];
		}
		else url2 = "/" + url1[3];
        $(".pt_menu_link a").removeClass("act");
        $('.pt_menu_link a[href="'+url2+'"]').parent().parent().addClass('act');
        $('.pt_menu_link a[href="'+url+'"]').parent().parent().addClass('act');
    });
    
    $('.pt_menu_no_child').hover(function(){
        $(this).addClass("active");
    },function(){
        $(this).removeClass("active");
    });
    
    $('.pt_menu').hover(function(){
        if($(this).attr("id") != "pt_menu_link"){
            $(this).addClass("active");
        }
    },function(){
        $(this).removeClass("active");
    });
    
    $('.pt_menu').hover(function(){
       /*show SubMenu to calculate*/
       $(this).find('.SubMenu').css('display','inline-block');
       
       /* get total padding + border + margin of the SubMenu */
       var extraWidth       = 0
       var wrapWidthSubmenu   = $(this).find('.SubMenu').outerWidth(true); /*include padding + margin + border*/
       var actualWidthSubmenu = $(this).find('.SubMenu').width(); /*no padding, margin, border*/
       extraWidth           = wrapWidthSubmenu - actualWidthSubmenu;    
       
       /* calculate new width of the SubMenu*/
       var widthblock1 = $(this).find('.SubMenu .block1').outerWidth();
       var widthblock2 = $(this).find('.SubMenu .block2').outerWidth(true);
       var new_width_SubMenu = 0;
       if(widthblock1 && !widthblock2){
           new_width_SubMenu = widthblock1;
       }
       if(!widthblock1 && widthblock2){
           new_width_SubMenu = widthblock2;
       }
       if(widthblock1 && widthblock2){
            if(widthblock1 >= widthblock2){
                new_width_SubMenu = widthblock1;
            }
            if(widthblock1 < widthblock2){
                new_width_SubMenu = widthblock2;
            }
       }
       var new_outer_width_SubMenu = new_width_SubMenu + extraWidth;
       
         /*define top and left of the SubMenu*/
         var wraper = $('#pt_custommenu');
         var wWraper = $('body').outerWidth();
         var posWraper = wraper.offset();
         var pos = $(this).offset();
         
         var xTop = pos.top - posWraper.top + $(this).find(".parentMenu > a").outerHeight(true);
       
         var xLeft = pos.left;

          if ((xLeft + new_outer_width_SubMenu) > wWraper) { 
            xLeft = wWraper - new_outer_width_SubMenu - xLeft -70; 
          } else {
            xLeft = 0;
          };
         $(this).find('.SubMenu').css('top',xTop);
         // $(this).find('.SubMenu').css('top','100%');
          $(this).find('.SubMenu').css('left',xLeft);


       /*set new width SubMenu*/
       $(this).find('.SubMenu').css('width',new_width_SubMenu + 50);
       $(this).find('.SubMenu .block1').css('width',new_width_SubMenu);
       
       /*return SubMenu display none*/
       $(this).find('.SubMenu').css('display','none');
       
       /*show hide SubMenu*/
       $(this).find('.SubMenu').stop(true,true).show();
    },function(){
       $(this).find('.SubMenu').stop(true,true).hide();
    })
});