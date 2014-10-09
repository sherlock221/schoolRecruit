var MobileUI = {

    list    : $("#topic-list"),
    questionSub : $("#questionSubmit"),
    message   :  $("#layer-message"),
    result     :   $("#layer-result")

};

var imgList = ["./imgs/school.png","./imgs/gezi.jpg"];


var  Message = {

    success : {
        title : "恭喜您，",
        content : "您与习悦的匹配度超过了90%，您很适合我们公司哦，我们的福利，只有您想不到，没有我们做不到的，来了习悦，您将摆脱快播和陌陌的缠绕，您是想要成为IT男？高富帅？我们都能成就你，快用你的简历猛砸我们吧！我们的HR在等着翻你牌呢！"
    },
    error50  : {
        title : "亲，",
        content : "您与习悦的匹配度少于50%哦，看来还要努力努力才能见到我们谯美美的真容啦，想要更多的了解我们就去搜搜我们的两款产品吧（校园云、家校即时通）！"
    },
    errorless : {
        title :  "小伙伴，",
        content : "就差一点点哦，您与习悦的匹配度在50%-80%之间，看来还要详细了解下我们公司的文化，才有机会见到我们的女神谯美美，不要灰心哦，我们还有校招等着你！"
    }
}


function loadData(data){

    //加载问题
    $.getJSON("topic.json",function(data){

        var ld = new loadermsk(imgList, "#0e79ef", function () {
            var newData = {list : data};
            var hl = template("topicTp",newData);
            MobileUI.list.html(hl);
            MobileEvent.init();
           $("#main").removeClass("hide");


        });

    });



};

var as = ["b","c","c","c","c","b","a","c"];

var calc = 0;

var MobileEvent = {
    init: function () {

        //初始化配置
        this.form();

    },
    form: function () {


        //提交
        MobileUI.questionSub.bind("tap",function(){

            //检测非空
            var topics = MobileUI.list.find(".topic");



            for(var i =0 ;i<topics.length; i++){

                var $this = $(topics[i]);
                var main = $this.find(".switch-main");

                var num =  $this.attr("num");
                var check = checkSwitchMain(main);
                if(check.isPass){

                    if(i  >= 2){

                        var option = check.dom.closest("li").attr("option");
                        if(option == as[i-2]){
                            calc++
                        }
                    }

                }
                else{
                    //未选中
                    $("html,body").scrollTop($this.offset().top);
                    MobileUI.message.show();
                    setTimeout(function(){
                        MobileUI.message.hide();
                    },1500);
                    return;
                }



            }

            var title,content;
            //显示结果  7-8
            if(calc >=  7){
                title   =   Message.success.title;
                content =    Message.success.content;
                MobileUI.result.addClass("success");
            }
            //显示结果  5-6
            else  if(calc >4 && calc  <7){
                title   =   Message.errorless.title;
                content =    Message.errorless.content;
                MobileUI.result.addClass("error-less");
            }
            //显示结果  4
            else  if(calc <=4){
                title   =   Message.error50.title;
                content =    Message.error50.content;
                MobileUI.result.addClass("error-50");
            }

            MobileUI.result.find("h1").html( title);
            MobileUI.result.find("p").html( content);

            MobileUI.result.show();
            MobileUI.list.hide();
            calc = 0 ;

        });


        function checkSwitchMain(main){
            for(var j=0;j<main.length;j++){
                var  other =  $(main[j]);
                if(other.hasClass("success")){
                    return {dom : other , isPass : true}
                }
                else{


                }
            }

            return {dom : "" , isPass : false}
        }

        //switch选择
        MobileUI.list.find(".topic-options").on("tap",".switch-main",function(){
            var $this = $(this);
            var status = $this.attr("status");
            var paper = $this.find(".switch-paper");
            //取消选中
            if(status == "1"){

                     paper.css("-webkit-transform","translateX(28px)");
                    $this.addClass("error").removeClass("success");

                status = 0;
            }
            //选中
            else{
                    paper.css("-webkit-transform","translateX(0)");
                    $this.addClass("success").removeClass("error");

                    //其他組的設為關閉
               var tps = $this.closest("li").siblings().find(".switch-main");
                tps.each(function(){
                    var _this = $(this);
                    _this.attr("status","0");
                    _this.find(".switch-paper").css("-webkit-transform","translateX(28px)");
                    _this.addClass("error").removeClass("success");
                });

                status = 1;
            }

            $this.attr("status",status);
        });







    }


};


$(function () {
    loadData();
});
