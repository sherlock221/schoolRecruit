var Images = {
    "chunmaoxuan" : {
        imgs : [
            "img/chunmaoxuan/chumaoxuan-01.png",
            "img/chunmaoxuan/chumaoxuan-02.jpg",
            "img/chunmaoxuan/chumaoxuan-03.jpg",
            "img/chunmaoxuan/chumaoxuan-04.jpg",
            "img/chunmaoxuan/chumaoxuan-05.jpg",
            "img/chunmaoxuan/chumaoxuan-06.jpg"
        ]
    },
    "baixianfu" : {
        imgs : [


        ]
    }
};






//js获取url参数的function
function request(paras){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf
        ("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}







var MobileUI = {
    screenAll      : $("#screen-all"),
    menu           : $("#menu"),
    menu_layer     : $("#left-content"),
    close          : $("#close")
};



var MobileEvent = {
	init : function(){
		this.form();
        //保证android下流畅 启动动画
//       MobileUI.screen01.removeClass("hide");
	},
	form : function(){


         //初始化页面
          var tp = request("tp");
          var object =Images[tp];

        var temp = "";
        for(var i=0; i<object.imgs.length;i++){
             var im = object.imgs[i];
             var image = '<image src="'+im+'" class="response-img" />';
              temp += '<li class="screen" >'+
                 '<div class="content">'
                 +image
                 +'</div>'
                 +'</li>';
         }


        MobileUI.screenAll.html(temp);

          //滚动条
		  var wrapper_scroll = new Scroller('#main', {
                Scontainer : '.screen-all',
                hScroll : true,
                vScroll : false,
                momentum : true,
                bounce : false,
                snap: true,
                scrollBefore: function(name, e){
                },
                onScroll: function(name, obj){
                },
                onTouchEnd: function(name, obj){
                },
                scrollEnd: function(index){

                }
            });

        //绑定menu
        MobileUI.menu.tap(function(){
            MobileUI.menu_layer.show();
        });

        MobileUI.close.tap(function(){
            MobileUI.menu_layer.hide();
        });


        MobileUI.menu_layer.on("tap",".trans-main",function(){


            var $parent =  $(this).closest(".trans-content");
            var $other  = $parent.siblings();
            var $ul = $parent.find("ul");
            $other.find("ul").addClass("hide");

            if($ul.hasClass("hide")){
                $ul.removeClass("hide");
            }
            else{
                $ul.addClass("hide");
            }


        });

    }





};



$(function(){
	MobileEvent.init();
});
