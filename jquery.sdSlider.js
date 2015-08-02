;(function($) {

    $.fn.extend({
        sdSlider: function(options) {
            if (options && typeof(options) == 'object') {
                options = $.extend({}, $.sdSlider.defaults, options);
            }

            if($(this).length == 1) {
                new $.sdSlider(this, options);
            } else if($(this).length > 1) {
                console.error($.messages.severalelents);
            } else if($(this).length == 0) {
                console.error($.messages.zeroelent);
            }

            return this;
        }
    });

    $.messages = {
        imgAndLiMismatch: '[jQuery.sdSlider] Error: the number of list items and the number of <img src> mismatch.',
        severalelents: '[jQuery.sdSlider] Error: several DOM element have been detected. Are you sure you\'re using the right selector?',
        noImgFound: '[jQuery.sdSlider] Error: no <img> tag was found within the <li>.'  
    };


    $.sdSlider = function(el, option) {
        $(window).on('load', function() {

            var options  = option || $.sdSlider.defaults
            , $li = $(el).find('> li')
            , $img = $li.find('> img')
            , imgSrcs = []
            , imgHeights = []
            , imgWidths = []
            , $wrapper
            , i
            , index;

            if(!$img.length) {
                console.error($.messages.noImgFound);
                return;
            }
            $(el).find('> li:first-child').addClass('active');


            if(options.border && typeof(options.border) === 'object') {
                $img.css('border', options.border.width + 'px solid ' + options.border.color);
            }


            $img.each(function(i) {
                $(this).attr('data-image', i);
                imgSrcs.push($(this).attr('src'));
                imgHeights.push($(this).outerHeight());
                imgWidths.push($(this).outerWidth());
            });

            if(imgSrcs.length === $li.length) {

                maxHeight = Math.max.apply(Math, imgHeights);
                maxWidth = Math.max.apply(Math, imgWidths);

                $wrapper = $('<div>').attr('id', 'sdSlider-wrapper').css({
                    width: maxWidth,
                    height: maxHeight
                });
                $(el).wrap($wrapper);

                if(options.arrows) {
                    $.sdSlider.addArrows(el, options, $wrapper);
                }

                if(options.controls) {
                    $controlWrapper = $.sdSlider.addControls(el, options);
                    $controlWrapper.find('> span').on('click', function(e) {
                        i = $(this).index();
                        $.sdSlider.appear(el, options, i);
                    });
                }

                if(options.autoStart.active) {
                    window.setInterval(function() {
                        index = $(el).find('> li.active').index();
                        if(index + 1 < $img.length) {
                            $.sdSlider.appear(el, options, index + 1);
                        } else {
                            $.sdSlider.appear(el, options, index - $img.length + 1);
                        }
                    }, options.autoStart.delay);
                }

                

            } else {
                console.error($.messages.imgAndLiMismatch);
            }

            return;
        });
    };

    $.sdSlider.addControls = function(el, options) {

        var $li = $(el).find('> li')
        , $controlWrapper = $('<div>')
                                .addClass('control-wrapper')
                                .css({
                                    'text-align': 'center',
                                    'bottom': '35px',
                                    'background-color': 'rgba(170, 170, 170, 0.5)'
                                })
        , $controls;

        $li.each(function(i) {
            $controls = $('<span>').attr('data-image', i);
            if(!i) {
                $controls.addClass('active');
            }
            $controlWrapper.append($controls);
        });

        $(el).after($controlWrapper);

        return $controlWrapper;
    }

    $.sdSlider.addArrows = function(el, options, $wrapper) {

        var classes = 'sdArrow fa-4x fa'
            , $left = $('<i />').addClass(classes + ' sdArrow-left fa-arrow-circle-left disabled').css('left', 0)
            , $right = $('<i />').addClass(classes + ' sdArrow-right fa-arrow-circle-right').css('right', 0)
            , $img = $(el).find('> li').find('> img')
            , index;
        ;

        $(el).after($left).before($right);


        $right.on('click', function() {
            index = $(el).find('> li.active').index();
            if(index + 1 < $img.length) {
                $.sdSlider.appear(el, options, index + 1);
            }
        });

        $left.on('click', function() {
            index = $(el).find('> li.active').index();
            if(index - 1 >= 0) {
                $.sdSlider.appear(el, options, index - 1);
            }
        });


        

        return;
    };

    $.sdSlider.appear = function(el, options, i) {
        var activeImgIndex = $(el).find('> li.active').index()
            , animation = {}
            , gap = 0
            , $li = $(el).find('> li')
            , $img = $li.find('> img')
            , $left = $(el).parent('div').find('i.sdArrow-left')
            , $right = $(el).parent('div').find('i.sdArrow-right');


        if(!$li.is(':animated')) {
            $li.removeClass('active').eq(i).addClass('active');
            if(activeImgIndex < i) { // si on va vers la droite
                gap = i - activeImgIndex;
                animation['left'] = '-=' + ($li.find('> img').eq(i).outerWidth() * gap) + 'px';
            } else { // si on va vers la gauche
                gap = activeImgIndex - i;
                animation['left'] = '+=' + ($li.find('> img').eq(i).outerWidth() * gap) + 'px';

            }

            $li.each(function() {
                $(this).animate(animation, {
                    duration: options.duration
                });
            });


            if(options.arrows) {
                if(i + 1 === $img.length) {
                    $right.addClass('disabled');
                } else {
                    $right.removeClass('disabled');
                }

                if(i === 0) {
                    $left.addClass('disabled');
                } else {
                    $left.removeClass('disabled');
                }
            }

            $('.control-wrapper')
                .find('> span')
                .removeClass('active')
                .eq(i)
                .addClass('active')
            ;
        }

        return;
    };

    $.sdSlider.defaults = {
        autoStart: {
            active: false,
            delay: 1000
        },
        border: {
            color: '#000',
            width: 0
        },
        controls: true,
        arrows: true,
        duration: 1000
    };

})(jQuery);
