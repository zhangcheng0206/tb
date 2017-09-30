slider(".slider1",5,520);
slider(".slider2",6,520);


//吸顶效果
$(function(){
	$(window).on("scroll",function(){
		//获取当前滚动条   scrollTop() 滚动的距离
		$(window).scrollTop();
		if( $(window).scrollTop() > 90 ){
			//滚 过头了，现在要把.search 固定定位。 加一个类 .fixed
			$(".search").addClass("fixed");
		}
		else{
			//滚 回来了，现在要把.search 固定定位 取消。 去掉类 .fixed
			$(".search").removeClass("fixed");
		}
		//console.info( Date.now()  + " -- " + $(window).scrollTop())
	})
})
  
//搜索框的选项卡切换
$(function(){
	
	$(".tabitem").click(function(){
		//如果现在处于固定导航的状态，则把当前项放在最前面去
		if($(".search").hasClass("fixed") ){
			$(".tab").prepend( this );
		}
//		$(".tab").append( this );
	})
	
	
	$(".baobei").click(function(){
		//给自己加 on这个类，把兄弟的on去掉
		$(this).addClass("on").siblings().removeClass("on");
		
		//更改form的背景色
		$(".form").css("background-color","#f40")
		//对应的keywords中的内容显示
		$(".hotwords p").hide().eq(0).show();
	});
	$(".tianmao").click(function(){
		//给自己加 on这个类，把兄弟的on去掉
		$(this).addClass("on").siblings().removeClass("on");
		
		$(".form").css("background-color","#c60000")
		$(".hotwords p").hide().eq(1).show();
	})
	
	$(".dianpu").click(function(){
		//给自己加 on这个类，把兄弟的on去掉
		$(this).addClass("on").siblings().removeClass("on");
		
		$(".form").css("background-color","#f40")
		$(".hotwords p").hide().eq(2).show();
		//$(this).addClass("on");
	})
})



//右侧的选项卡效果
$(function(){
	
	$(".tab-links a").hover(function(){
		//第几个标签
		var index = $(this).index(); 
		//加下划线
		$(this).addClass("underline").siblings().removeClass("underline");
		
//		$(this).siblings().removeClass("underline").addClass("underline")
		
		//显示对应的选项卡的内容
		$(".tab-body li").hide().eq(index).show();
		
		
		//console.info("进入",this)
	},function(){
		//console.info("离开",this)
	})
});

//快捷服务
$(function(){
	$(".convenice .menu").on("mouseenter",function(){
		
		
		var index = $(this).index();
		
		console.info("index",index);
		
		$(this).addClass("on").siblings().removeClass("on");
	});
	
	$(".convenice .indrector span").click(function(){
		
		$(".convenice .item").removeClass("on");
	})
	
	$(".convenice .indrector a").hover(function(){
		
		console.info( $(this).index()  );
		var index =    $(this).index();
		
		var content = $(this).parent().parent().find(".maskcontent");
		
		content.css("transform","translateX("+ index*-1*288  +"px)");
		
		console.info( $(this).parent().parent().find(".maskcontent") );
		
		
		
		
	})
	
});

//反馈-模态框
$(function(){
	$("#sug").click(function(){
		$("#fullpagemask").fadeIn();
	})
	
	$("#close").click(function(){
		$("#fullpagemask").fadeOut();
	})
	
});




 //右侧固定导航
var fixedNavPositionArr = []; //右侧固定导航li对应的区域的offsetTop值

window.onload = function(){
	console.info("window.onload ")

	//对右侧固定导航中的每一项，都：
	//(1)取出它对应的那个区域的div的class名。
	//(2)得到区域的offsetTop，存入到数组中
	$(".fixednav .item").each(function( index,item){
		
		var className = $(item).attr("data-classname");
		var t = $("." + className).offset().top;
		//console.info(index,className,t);
		fixedNavPositionArr.push(t);
	})
	
	$(window).on("scroll",function(){
		
		
		var top = $("body").scrollTop();  //获取当前的scroll值
		//console.info( Date.now() , fixedNavPositionArr)
	
		var minDist =Math.abs( top - fixedNavPositionArr[0] );  //最小的距离
		var minIndex = 0;                       //最小的距离所对应的元素的下标
		
		for(var i = 1; i< fixedNavPositionArr.length;i++){
		    var currentDis = Math.abs( top - fixedNavPositionArr [ i ]);
		    if( currentDis < minDist ){
		        minDist = currentDis;
		        minIndex = i;
		    }
		}
		
		//把自己加on 把兄弟去掉on
		$(".fixednav .item").eq(minIndex).addClass("on").siblings().removeClass("on");
		
	})
	
	console.info(fixedNavPositionArr);
}
//固定导航
$(function(){
	
	$(window).on("scroll",function(){	
		
		
		//获取当前的scroll值
		var currtop = $("body").scrollTop();
		
		//console.info( Date.now( ) , top );
		if( currtop > 428 ){
			$(".fixednav").css(
				{
					"position":"fixed",
					"top":55
				})
		}
		else{
			$(".fixednav").css(
				{
					"position":"absolute",
					"top":480
				})
		}
	});
	
	//当一个li被点击时， 我知道，当前是哪一个被点了
	$(".fixednav .item").click(function(){
		
		//把自己加on
		//把兄弟去掉on
		$(this).addClass("on").siblings().removeClass("on");
		
		//1.获取当前的li对应的那个  classname
		var classname = $(this).attr("data-classname");
		
		//2.获取当前classname那个区块的offsetTop
		var top = $("."+classname).offset().top;
		console.info(classname, top);
		
		//3.通过animate动画，让滚动条滚动到指定的位置
		// -60 因为上面有一个固定位置的搜索框
		$("body").stop(true).animate({"scrollTop": top - 60 } , 1000);
	

	})
	
})
