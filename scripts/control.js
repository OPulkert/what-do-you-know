$(function() {
    var car = $("#carousel").customCarousel({
        autoplay: true,
        mode: 'slide'
    });

    $('#horseSlide').on('click', function() {
        car.trigger('carousel.slide', 1);
    });

    $('#sealSlide').on('click', function() {
        car.trigger('carousel.slide', 2);
    });

    $("#carousel2").customCarousel({
        autoplay: true,
        mode: 'fade',
        nav: false,
        pagination: false
    });

    $("#ajaxform").submit(function(e)
    {
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        $.ajax(
            {
                url : formURL,
                type: "POST",
                data : postData,
                success:function(data, textStatus, jqXHR)
                {
                    console.log('odeslano');
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                }
            });
        e.preventDefault();
    });

    $.datepicker.regional['cs'] = {
        closeText: 'Zavřít',
        prevText: '&#x3c;Dříve',
        nextText: 'Později&#x3e;',
        currentText: 'Nyní',
        monthNames: ['leden','únor','březen','duben','květen','červen',
            'červenec','srpen','září','říjen','listopad','prosinec'],
        monthNamesShort: ['led','úno','bře','dub','kvě','čer',
            'čvc','srp','zář','říj','lis','pro'],
        dayNames: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
        dayNamesShort: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
        dayNamesMin: ['ne','po','út','st','čt','pá','so'],
        weekHeader: 'Týd',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['cs']);

    $( ".datePicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd.mm.yy',
        showOn:"button",
        buttonImage: "/assets/images/ico-calendar.png",
        buttonImageOnly: true
    });
});