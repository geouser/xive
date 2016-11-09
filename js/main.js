// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};



/*custom select*/
$('select').each(function(index, el) { 
    var select = $(this).wrap('<div class="select"></div>');
    var block = select.parent('.select');
    var label = block.append('<span class="select-label">'+select.attr('data-label')+'</span>').find('.select-label');
    var dropdown = block.append('<ul class="select-dropdown"></ul>').find('.select-dropdown');

    select.css('display', 'none');
    dropdown.css('display', 'none');

    select.find('option').each(function(index, el) {
        dropdown.append('<li class="select-dropdown-item" data-value="'+$(this).attr('value')+'">'+$(this).text()+'</li>')
    });

    label.on('click', function(event) {
        event.preventDefault();
        dropdown.slideToggle('fast');
    });

    dropdown.find('.select-dropdown-item').on('click', function(event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        label.text($(this).text());
        select.val( $(this).attr('data-value') );
        dropdown.slideToggle('fast');
    });
});


jQuery(document).ready(function($) {

    $(window).on('load', function(event) {
        event.preventDefault();
        /* Act on the event */
        var s = skrollr.init();
        if (s.isMobile()) {
            s.destroy();
        }
    });

    /*---------------------------
                                  Scroll menu
    ---------------------------*/
    $('.menu-link').on('click', function(event) {
        event.preventDefault();
        var target = $(this).attr('href');
        var el = $(target);

        $('html, body').animate({scrollTop: el.offset().top-80}, 600);
    });


    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.on('scroll load', function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });

     

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('header').toggleClass('active');
        if ($('header').hasClass('active')) {
                $('body, html').css('overflow', 'hidden');
            } else {
                $('body, html').css('overflow', 'visible');
            }
    });


    /*---------------------------
                                  Steps
    ---------------------------*/
    $('.step').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active').siblings().removeClass('active');
    });



    $('.show-more').each(function(index, el) {
        var el = $(this).attr('data-element');
        var offset = $(this).attr('data-visible');
        $(el).slice(offset, $(el).length ).css('display', 'none');

        $(this).on('click', function(event) {
            event.preventDefault();
            $(el).css('display', 'block').addClass('visible');
        })
    });



    /*Tooltips actions*/
    $('.has-tooltip').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
    });



    /*---------------------------
                                  Slider
    ---------------------------*/
    $('.slider').slick({
        dots: true
    });


    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom',
        callbacks: {
            open: function() {
                $('body').addClass('blur');
            },
            close: function() {
                $('body').removeClass('blur');
            }
        }
    });


    $('.goBack').on( "click", function() {
      $.magnificPopup.close();
    });


    $('.advantages').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    });

    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });

    $( ".overlay" ).delay( 500 ).queue(function(next) {
        $(this).css({
            opacity: '0',
            visibility: 'hidden'
        });
        next(); 
    })  

    $('input[type="tel"]').inputmask("(999)999-99-99",{ showMaskOnHover: true });

}); // end file