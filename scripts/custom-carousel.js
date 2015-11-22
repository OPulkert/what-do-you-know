(function($) {

    if (typeof $.fn.carousel !== 'function') {
        $.fn.customCarousel = function(options){
            var defaultOptions = {
                maxOpacity: 1,
                minOpacity: 0,
                nav: true,
                autoplay: true,
                autoSpeed: 4000,
                speed: 500,
                mode: 'fade',
                fadeSpeed: 100,
                infinite: true,
                stopOnHover: true,
                pagination: true,
                responsiveRefreshRate: 200
            }

            if(options==null) options = [];
            options = $.extend(defaultOptions, options);

            var $base = $(this),
                $ul,
                $itemsCount,
                $inProgress = false,
                $currentVisibleItem = 1,
                $timer = 0,
                $items = 0,
                $itemWidth = 0,
                $wrapperWidth,
                $hoverStatus,
                $apStatus,
                touchStartY = 0,
                touchStartX = 0,


            var init = function() {
                if ($base.children().length === 0) { return false;}
                $ul = $('ul', $base);
                $items = $ul.children();
                $itemsCount = $items.length;
                wrapItems();

                if(options.infinite) {
                    $items.filter(':first').before($items.slice(-1).clone().addClass('cloned'));
                    $items.filter(':last').after($items.slice(0,1).clone().addClass('cloned'));
                }

                updateItems();
                addControls();
                startAutoPlay();
                stopOnHover();
                customEvents();
                touch();

                $(window).on('resize', function() {
                    resize();
                });
            }

            var customEvents = function() {
                $base.on("carousel.slide", function (event, item) {
                    slide(item);
                });
            }

            var touch = function() {
                $base.on('touchstart', function(e) {
                    touchStartY = e.originalEvent.touches[0].clientY;
                    touchStartX = e.originalEvent.touches[0].clientX;
                });

                $base.on('touchend', function(e) {
                    var touchEndY = e.originalEvent.changedTouches[0].clientY,
                        touchEndX = e.originalEvent.changedTouches[0].clientX,
                        yDiff = touchStartY - touchEndY,
                        xDiff = touchStartX - touchEndX;

                    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                        if ( xDiff > 5 ) {
                            slide($currentVisibleItem+1);
                        } else {
                            slide($currentVisibleItem-1);
                        }
                    }
                    touchStartY = null;
                    touchStartX = null;
                });
            }

            var stopOnHover = function() {
                if (options.stopOnHover === true && options.autoplay !== false) {
                    $base.on("mouseover", function () {
                        stopAutoPlay();
                    });
                    $base.on("mouseout", function () {
                        if ($hoverStatus !== "stop") {
                            startAutoPlay();
                        }
                    });
                }
            }

            var addControls = function() {
                if(options.nav) {
                    $base.append('<div class="custom-carousel-nav"><div class="nav prev">Prev</div><div class="nav next">Next</div></div>');

                    $('.custom-carousel-nav .prev', $base).on('click', function() {
                        slide($currentVisibleItem-1);
                    });

                    $('.custom-carousel-nav .next', $base).on('click', function() {
                        slide($currentVisibleItem+1);
                    });
                }

                if(options.pagination) {
                    $base.append('<ul class="custom-carousel-pagination"></ul>');
                    var pagination = $base.find('.custom-carousel-pagination');
                    for(var i=0; i < $items.length; i++) {
                        if(i==0)
                            pagination.append('<li class="active">&nbsp;</li>');
                        else
                            pagination.append('<li>&nbsp;</li>');
                    }

                    pagination.find('li').each(function(index, item) {
                        $(this).click(function() {
                            slide(index+1);
                        });
                    });
                }
            }

            var wrapItems = function() {
                $ul.wrapAll('<div class="custom-carousel-wrapper"></div>');
                $base.css({position: "relative", "z-index": "2", "display": "block"});
            }

            var resize = function() {
                var smallDelay;
                if(options.autoplay) {
                    clearInterval($timer);
                }

                window.clearTimeout(smallDelay);
                smallDelay = window.setTimeout(function () {
                    updateItems();
                }, options.responsiveRefreshRate);

                if (options.autoplay !== false) {
                    checkAp();
                }

            }

            var checkAp = function() {
                if ($apStatus !== "stop") {
                    startAutoPlay();
                }
            }

            var updateItems = function() {
                $itemWidth = Math.round($base.width() / 1);
                $wrapperWidth = $('li', $ul).length * $itemWidth;

                $ul.css({
                    "width": $wrapperWidth,
                    margin: "0",
                    padding: "0",
                    position: "relative",
                    "list-style-type": "none",
                    "z-index": "1",
                    "left": -($currentVisibleItem * $itemWidth)
                });

                $('li', $ul).each(function (index) {
                    var $this = $(this);
                    $this.css({"width": $itemWidth, overflow: "hidden", float: "left"});
                });
            }

            var slide = function(to) {
                if(!$inProgress) {
                    if(options.infinite) {
                        if(to >= $('li', $ul).length - 1) {
                            $ul.css('left', -( ($currentVisibleItem - $itemsCount) * $itemWidth ) + "px" );
                            $currentVisibleItem = to - $itemsCount;
                        }
                        else if(to <= 0) {           // If before range, then go around
                            $ul.css('left', -( ($currentVisibleItem + $itemsCount) * $itemWidth) + "px");
                            $currentVisibleItem = to + $itemsCount;
                        }
                        else {
                            $currentVisibleItem = to;
                        }
                    }

                    $inProgress = true;

                    if(options.pagination) {
                        $base.find('.custom-carousel-pagination').find('li').removeClass('active');
                        $base.find('.custom-carousel-pagination').find('li:nth-child('+($currentVisibleItem)+')').addClass('active');
                    }

                    if(options.mode == 'fade') {
                        $ul.fadeOut(options.fadeSpeed, function() {
                            $ul.css({left: -($currentVisibleItem * $itemWidth)});
                            $ul.fadeIn(options.fadeSpeed);
                            $inProgress = false;
                        });
                    }
                    else {
                        $ul.animate({
                            left: -($currentVisibleItem * $itemWidth)
                        }, options.speed, function() {
                            $inProgress = false;
                        });
                    }
                }
            }

            var  startAutoPlay = function() {
                $apStatus = "play";
                if(!options.autoplay) { return false;}

                clearInterval($timer);
                $timer = setInterval(function() {
                    slide($currentVisibleItem+1);
                }, options.autoSpeed);
            }

            var  stopAutoPlay = function() {
                $apStatus = "stop";
                clearInterval($timer);
            }

            return this.each(function () {
                init();
            });
        }
    }
})(jQuery);
