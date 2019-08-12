(function($)
{
    $.fn.ResizeInIt = function()
    {
        var mobile_ratio = 980 / 1463;

        function resizing()
        {
            $.b_w = $.Body.width();
            $.b_h = $.Body.height();
            if ($.b_w > 980)
            {
                $.wrapper.css(
                {
                    'width': $.b_h * mobile_ratio + 'px'
                });
                $.fixed_limit.css(
                {
                    'width': $.b_h * mobile_ratio + 'px'
                });
                $.Body.css(
                {
                    'font-size': 100 * ($.b_h * mobile_ratio / 980) + '%'
                });
            }
            else
            {
                $.wrapper.css(
                {
                    'width': 100 + '%'
                });
                $.fixed_limit.css(
                {
                    'width': 100 + '%'
                });
                $.Body.css(
                {
                    'font-size': (100 * ($.b_w / 980) /*-(0.14*((980-$.b_w)/980)*100*($.b_w/980))*/ ) + '%'
                });
            }
        }
        $.Window.resize(resizing).trigger('resize');
    }
    $.fn.ComCss = function(property)
    {
        var _self = $(this);
        _self['propObj'] = {};
        for (x in property)
        {
            _self.propObj['-webkit-' + x] = property[x];
            _self.propObj['-moz-' + x] = property[x];
            _self.propObj['-ms-' + x] = property[x];
            _self.propObj[x] = property[x];
        }
        _self.css(_self.propObj);
        /*for(x in _self.propObj){
            delete _self.propObj[x];
        }*/
        delete _self.propObj;
        property = null;
        _self = null;
    }
})(jQuery);

$(function()
{
    $.Body = $('body');
    $.Window = $(window);
    $.wrapper = $.Body.find('#wrapper');
    $.Loading = $.Body.find('div#loading');
    $.fixed_limit = $.Body.find('.fixed_limit');
    $.Body.ResizeInIt();
    if (webMode == "PC")
    {
        $.Body.addClass('pc');
    }
    else if (webMode == "ANDROID")
    {
        $.Body.addClass('android');
    }
    if (window.location.href.indexOf('member=true') !== -1)
    {
        $.Body.find('.change_href').attr(
        {
            'href': 'step_2.aspx?member=true'
        });
    }
    $.Body.find('#scene_base').imagesLoaded()
        .always(
            function(instance)
            {
                // console.log('all images loaded');
                $.Loading.velocity(
                {
                    'opacity': 0
                },
                {
                    /* Velocity's default options */
                    duration: 400,
                    easing: "swing",
                    queue: "",
                    begin: undefined,
                    progress: undefined,
                    complete: function()
                    {
                        $.Loading.css(
                        {
                            'display': 'none'
                        });
                        $.Body.MainDataInIt();
                    },
                    display: undefined,
                    visibility: undefined,
                    loop: false,
                    delay: false,
                    mobileHA: true
                });
            }
        )

});

window.addEventListener('DOMContentLoaded', function() {
    QueryLoader2(document.querySelector("body"), {
        barColor: "#13358c",
        backgroundColor: "#fffaeb",
        percentage: true,
        barHeight: 1,
        minimumTime: 200,
        fadeOutTime: 1000
    });
});

$('#fullpage').fullpage({
//        new fullpage('#fullpage', {
    anchors: ['gamePage'],
//    slidesNavigation: true,
    autoScrolling: false,
    fitToSection: false,
    css3: true,
    controlArrows: false,

    // aos event
    onLeave: function(){
        $('.section [data-aos]').each(function(){
            $(this).removeClass("aos-animate")
        });
    },
    onSlideLeave: function(){
        $('.slide [data-aos]').each(function(){
            $(this).removeClass("aos-animate")
        });
    },
//    afterSlideLoad: function(){
//        $('.slide.active [data-aos]').each(function(){
//            $(this).addClass("aos-animate")
//        });
//    },
    afterLoad: function(){
        $('.section.active [data-aos]').each(function(){
            $(this).addClass("aos-animate")
        });
    },
    afterSlideLoad: function( section, origin, destination, direction){
        $('.slide.active [data-aos]').each(function(){
            $(this).addClass("aos-animate")
        });
		var loadedSlide = this;
		if(section.anchor == 'gamePage' && destination.index == 2){
            $("#aniAimpoint").draggable({
                drag: function() {
                    $('.ani-protein').addClass('effect-zoom');
                    $('#aniWaypoint1').addClass('effect-fade');
                },
                stop: function() {
                    $('.ani-protein').removeClass('effect-zoom');
                },
            });
            $("#aniProteinTouch").droppable({
                drop: function( event, ui ) {
                    $('.ani-text1').hide();
                    $('#aniWaypoint1').hide();
                    $('#aniProteinTouch').hide();
                    $('#aniAimpoint').hide();
                    $('.ani-text2').show();
                    $('#aniSlice').show();
//                    $.fn.fullpage.moveTo('gamePage', 'slideAni');
                },
            });
            $("#aniKnife").draggable({
                containment: "#aniSlice", scroll: false
            });
            $("#aniSliceTouch").droppable({
                drop: function( event, ui ) {
                    $.fn.fullpage.moveTo('gamePage', 'slideAni');
                },
            });
        }
        if(section.anchor == 'gamePage' && destination.index == 3){
            $(".ani-dots").draggable({
                drag: function() {
                    $('.ani-babyeat').addClass('effect-zoom');
                },
                stop: function() {
                    $('.ani-babyeat').removeClass('effect-zoom');
                },
//                cursorAt: {top: -150, left: 20},
//                containment: ".babyeat",
//                scroll: false
            });
            $(".ani-babyeat").droppable({
                drop: function( event, ui ) {
                    $('#aniWaypoint2').hide();
                    $.fn.fullpage.moveTo('gamePage', 'slideQA');
                }
            });
		}
	}

});
$.fn.fullpage.setAllowScrolling(false);

//slide click
$(document).on('click', '#btnStart', function () {
    $.fn.fullpage.moveTo('gamePage', 'slideIntro');
});
$(document).on('click', '#btnIntro', function () {
    $.fn.fullpage.moveTo('gamePage', 'slideSlice');
});
$(document).on('click', '#btnSlice', function () {
    $.fn.fullpage.moveTo('gamePage', 'slideAni');
});
$(document).on('click', '#btnAni', function () {
    $.fn.fullpage.moveTo('gamePage', 'slideQA');
});
$(document).on('click', '#btnQA', function () {
    $.fn.fullpage.moveTo('gamePage', 'slideEnd');
});

$(".btn-ans").click(function(e) {
    e.preventDefault();
    $('.ans-zone div').fadeOut('fast');
    $('#' + $(this).data('rel')).fadeIn('fast');
});
