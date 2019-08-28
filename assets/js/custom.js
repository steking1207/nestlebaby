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


var delay = 800; //milliseconds
var timeoutId;
var animationIsFinished = false;

$('#fullpage').fullpage({
    anchors: ['gamePage'],
//    slidesNavigation: true,
    autoScrolling: false,
    fitToSection: false,
    css3: true,
    controlArrows: false,
    responsiveHeight: 640,

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
                    $('#aniSlice').hide();
                    $.fn.fullpage.moveTo('gamePage', 'slideAni');
                },
            });
        }
        if(section.anchor == 'gamePage' && destination.index == 3){
            $(".ani-dots32").draggable({
                drag: function() {
                    $('.ani-babyeat').addClass('effect-zoom');
                },
                stop: function() {
                    $('.ani-babyeat').removeClass('effect-zoom');
                },
            });

            $(".ani-babyeat").droppable({
                drop: function( event, ui ) {
                    $('#aniWaypoint2').hide();

                    var curTime = new Date().getTime();
                    $('.ani-dots21').css({"transform" : "translate(300%,30px)", "transition-duration": ".9s"}).fadeOut();
                    $('.ani-dots22').css({"transform" : "translate(300%,-30px)", "transition-duration": ".7s"}).fadeOut();
                    $('.ani-dots31').css({"transform" : "translate(150%,70%) scale(.5)", "transition-duration": ".7s"}).fadeOut('slow');
                    $('.ani-dots32').css({"transform" : "translate(300%,30px)", "transition-duration": ".7s"}).fadeOut();
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(function(){
                        animationIsFinished = true;
                        $.fn.fullpage.moveTo('gamePage', 'slideQA');
                    }, delay);
                    return animationIsFinished;

//                    $.fn.fullpage.moveTo('gamePage', 'slideQA');
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
