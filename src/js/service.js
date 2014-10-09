var MobileUI = {

    screenAll  : $("#screen-all"),
    screen01   : $("#screen00"),
    gameStart  :$("#gameStart")
};

//var imgList = ["./imgs/school.png"];
//var ld = new loader(imgList);
//ld.loadend(function(i){
//
//}).complete(function(){
//
//});


var MobileEvent = {
    init: function () {

        //初始化配置
        this.form();

        //保证android下流畅 启动动画
        MobileUI.screen01.find(".content").removeClass("hide");

    },
    form: function () {

        //设置当前高度
        var height = document.body.offsetHeight;
        var width = document.body.offsetWidth;


        MobileUI.gameStart.tap(function(){
            window.location.href   =  "question.html"
        });

        //滚动条
        var wrapper_scroll = new Scroller('#main', {
            Scontainer: '.screen-all',
            hScroll : false,
            vScroll : true,
            momentum : true,
            bounce : false,
            snap: true,
            scrollBefore: function (name, e) {

            },
            onScroll: function (name, obj) {
            },
            onTouchEnd: function (name, obj) {
            },
            scrollEnd: function (index) {
                    console.log(index);

                var $screen = MobileUI.screenAll.find(".screen");
                var node = $screen.filter("[id='screen0" + index + "']");
                for (var i = 0; i < $screen.length; i++) {
                    var $sc = $($screen[i]);
                    $sc.children(".content").addClass("hide");
                }

                node.children(".content").removeClass("hide");
            }
        });






    }


};


$(function () {
    MobileEvent.init();
});
