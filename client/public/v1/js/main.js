(function($) {
    "use strict";

/*-- Menu Sticky --*/
var $window = $(window);
$window.on('scroll', function() {    
	var scroll = $window.scrollTop();
	if (scroll < 300) {
		$(".sticker").removeClass("stick");
	}else{
		$(".sticker").addClass("stick");
	}
});
/*-- Mobile Menu --*/
$('.main-menu').meanmenu({
	meanScreenWidth: '991',
	meanMenuContainer: '.mobile-menu',
	meanMenuClose: '<i class="pe-7s-close-circle"></i>',
	meanMenuOpen: '<i class="pe-7s-menu"></i>',
	meanRevealPosition: 'right',
	meanMenuCloseSize: '30px',
});

/*-- WOW --*/
new WOW().init();

/*-- Nivo Slider --*/
$('#home-slider').nivoSlider({
    directionNav: true,
    animSpeed: 1000,
    effect: 'random',
    slices: 18,
    pauseTime: 5000,
    pauseOnHover: true,
    controlNav: false,
    prevText: '<i class="pe-7s-angle-left-circle"></i>',
    nextText: '<i class="pe-7s-angle-right-circle"></i>'
});

/*-- Testimonial Slider --*/
$('.testimonial-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="arrow-prev"><i class="pe-7s-angle-left-circle"></i></button>',
    nextArrow: '<button type="button" class="arrow-next"><i class="pe-7s-angle-right-circle"></i></button>',
    responsive: [
        {
            breakpoint: 767,
            settings: {
                arrows: false,
            }
        },
    ]
});

/*-- Product Slider 4 Item --*/  
$('.product-slider-4').slick({
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="arrow-prev"><i class="pe-7s-angle-left-circle"></i></button>',
    nextArrow: '<button type="button" class="arrow-next"><i class="pe-7s-angle-right-circle"></i></button>',
    responsive: [
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 479,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});

/*-- Product Slider 2 Item --*/ 
$('.product-slider-2').slick({
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="arrow-prev"><i class="pe-7s-angle-left-circle"></i></button>',
    nextArrow: '<button type="button" class="arrow-next"><i class="pe-7s-angle-right-circle"></i></button>',
    responsive: [
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 479,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});
    
/*-- Product Details Thumbnail Slider --*/ 
$('.pro-thumb-img-slider').slick({
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="arrow-prev"><i class="fa fa-long-arrow-left"></i></button>',
    nextArrow: '<button type="button" class="arrow-next"><i class="fa fa-long-arrow-right"></i></button>',
    responsive: [
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 479,
            settings: {
                slidesToShow: 2,
            }
        }
    ]
})
   
/*-- Price Range --*/ 
$('#price-range').slider({
   range: true,
   min: 0,
   max: 300,
   values: [ 40, 250 ],
   slide: function( event, ui ) {
    
	$('.ui-slider-handle:eq(0)').html( '<span>' + '$' + ui.values[ 0 ] + '</span>');
	$('.ui-slider-handle:eq(1)').html( '<span>' + '$' + ui.values[ 1 ] + '</span>');
    
   }
});
$('.ui-slider-handle:eq(0)').html( '<span>' + '$' + $( "#price-range" ).slider( "values", 0 ) + '</span>' );
$('.ui-slider-handle:eq(1)').html( '<span>' + '$' + $( "#price-range" ).slider( "values", 1 ) + '</span>' );    

/*-- Product Quantity --*/ 
$('.product-quantity').append('<span class="dec qtybtn"><i class="fa fa-angle-left"></i></span><span class="inc qtybtn"><i class="fa fa-angle-right"></i></span>');
$('.qtybtn').on('click', function() {
    var $button = $(this);
    var oldValue = $button.parent().find('input').val();
    if ($button.hasClass('inc')) {
        var newVal = parseFloat(oldValue) + 1;
    } else {
        // Don't allow decrementing below zero
        if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 0;
        }
    }
    $button.parent().find('input').val(newVal);
});

/*-- Checkout Form Collapse on Checkbox --*/ 
$('.checkout-form input[type="checkbox"]').on('click', function(){
    var $collapse = $(this).data('target');
    if( $(this).is(':checked') ){
        $('.collapse[data-collapse="'+$collapse+'"]').slideDown();
    }else {
        $('.collapse[data-collapse="'+$collapse+'"]').slideUp();
    }
})

/*-- Youtube Background Video --*/
$(".youtube-bg").YTPlayer();

/*-- Text Animation --*/
$('.tlt').textillate({
  loop: true,
  in: {
    effect: 'fadeInRight',
  },
  out: {
    effect: 'fadeOutLeft',
  },
});

/*-- Ajax Contact Form JS --*/
$(function () {
    // Get the form.
    var form = $('#contact-form');
    // Get the messages div.
    var formMessages = $('.form-message');
    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();
        // Serialize the form data.
        var formData = $(form).serialize();
        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData,
        })
        .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $('#contact-form input,#contact-form textarea').val('');
        })
        .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');

        // Set the message text.
        if (data.responseText !== '') {
            $(formMessages).text(data.responseText);
        } else {
            $(formMessages).text(
                'Oops! An error occured and your message could not be sent.'
            );
        }
        });
    });
});

/*-- ScrollUp --*/
$.scrollUp({
    scrollText: '<i class="fa fa-angle-up"></i>',
    easingType: 'linear',
    scrollSpeed: 900,
    animation: 'fade'
}); 


})(jQuery);



