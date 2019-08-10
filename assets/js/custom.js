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
