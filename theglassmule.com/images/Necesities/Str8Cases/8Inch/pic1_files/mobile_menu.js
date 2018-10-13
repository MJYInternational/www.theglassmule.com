$(document).ready(function () {
	$("#ma-mobileSubMenu .has_children, ul.mobileSubMenu li span.button-view1, ul.mobileSubMenu li span.button-view2").each(function(){
        $(this).append('<span class="ttclose"><a href="javascript:void(0)"></a></span>');
      });
	$("ul.mobileSubMenu li.active").each(function(){
		$(this).children().next("ul").css('display', 'block');
	});
	$("ul.mobileSubMenu li ul").hide();
	
	// only category menu
	$('span.button-view1 span').click(function() { 
	if ($(this).hasClass('ttopen')) {varche = true} else {varche = false};
	if(varche == false){
		$(this).addClass("ttopen");
		$(this).removeClass("ttclose");
		$(this).parent().parent().find('ul.level2').slideDown();
		varche = true;
	} else 
	{	
		$(this).removeClass("ttopen");
		$(this).addClass("ttclose");
		$(this).parent().parent().find('ul.level2').slideUp();
		varche = false;
	}
	});
	$('span.button-view2 span').click(function() { 
		if ($(this).hasClass('ttopen')) {varche = true} else {varche = false};
		if(varche == false){
			$(this).addClass("ttopen");
			$(this).removeClass("ttclose");
			$(this).parent().parent().find('ul.level3').slideDown();
			varche = true;
		} else 
		{	
			$(this).removeClass("ttopen");
			$(this).addClass("ttclose");
			$(this).parent().parent().find('ul.level3').slideUp();
			varche = false;
		}
	});
	
	// original menu
	$('#ma-mobileSubMenu li.has_children').click(function(){
		var chk = 0;
		if ( $(this).children('span').hasClass('ttclose') && ( chk==0 ) ) {
			$(this).children('span').removeClass('ttclose');
			$(this).children('span').addClass('ttopen');
			$(this).children('ul').slideDown();
			chk = 1;
		}
		if ( $(this).children('span').hasClass('ttopen') && ( chk==0 ) ) {
			$(this).children('span').removeClass('ttopen');
			$(this).children('span').addClass('ttclose');
			$(this).children('ul').slideUp();
			chk = 1;
		}
	});
	//mobile
	$('.mobileMenu-toggle').click(function() {
		var chk = 0;
		if ( $('#mobileMenu').hasClass('inactive') && ( chk==0 ) ) {
			$('#mobileMenu').removeClass('inactive');
			$('#mobileMenu').addClass('active');
			$('#ma-mobileSubMenu').slideDown();
			chk = 1;
		}
		if ($('#mobileMenu').hasClass('active') && ( chk==0 ) ) {
			$('#mobileMenu').removeClass('active');
			$('#mobileMenu').addClass('inactive');			
			$('#ma-mobileSubMenu').slideUp();
			chk = 1;
		}
		//$('#ma-mobileSubMenu').slideToggle();
	});    
});