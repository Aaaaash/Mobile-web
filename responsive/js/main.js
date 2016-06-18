$(function(){
    //
    $('.header').height($(window).innerHeight());
    $('.header-img-list').height($('.header').height());
    $('.header-img-list .img').height($('.header').height()).width($('.header').width());
    $(window).bind('resize',function(){
        $('.header').height($(window).innerHeight());
        $('.header-img-list').height($('.header').height());
        $('.header-img-list .img').height($('.header').height()).width($('.header').width());
        $('.nav-moblie-list').css('display','none');
    });
    console.log($('.header').height());

    // 首屏轮播
    var $headerBtn=$('.header-btn');
    var $imgBox=$('.img-box');
    for(var i=0;i<$headerBtn.length;i++){
        (function(i){
            $headerBtn.eq(i).bind('click',function(){
                for(var j=0;j<$headerBtn.length;j++){
                    $headerBtn.eq(j).removeClass('current');
                }
                $(this).addClass('current');
                $imgBox.animate({
                    top:-$('.img').height()*i
                })
            });
        })(i)
    }

    // 滚动
    $('.sm-tit').bind('click',function(){
        $('body,html').animate({
            scrollTop:$('.header').height()
        })
    });

    //进度条
    $(document).bind('scroll.a',function(){
        var $skill=$('.skill');
        if($(document).scrollTop()>=$('.mid-info').offset().top+($('.mid-info').outerHeight()/2)){
            $skill.eq(0).animate({
                width:'90%'
            },600);
            $skill.eq(1).animate({
                width:'90%'
            },600);
            $skill.eq(2).animate({
                width:'90%'
            },600);
            $skill.eq(3).animate({
                width:'90%'
            },600);
            $(document).unbind('scroll.a')
        };
    });

    // 小屏响应式菜单
    $('.nav-mobile-btn').bind('click',function(){
        $('.nav-moblie-list').slideToggle('normal');
    })
});
