$(function(){
	
	$(".smallimg li").hover(function(){
		
		//自己设边框
		$(this).addClass("on").siblings().removeClass("on");
		
		//得到当前的li中的图片的地址
		
		var path = $(this).find("img").attr("src");
		console.info(path)
		
		//改showImg的背景图
		$(".showImg").css("backgroundImage","url("+ path + ")"  )
		
		//改bigImg的背景图
		$(".bigImg").css("backgroundImage","url("+ path + ".big.jpg)"  )
		
		
	});
	
	$(".showImg").on("mouseenter",function(){
		//显示镜头 mask
		$(".mask").fadeIn();
		$(".bigImg").fadeIn();
		
	});
	
	$(".showImg").on("mousemove",function(e){
		
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top;
		var left = x - $(".mask").width()/2;
		var top = y - $(".mask").height()/2;
		
		if(top > $(".showImg").height() -  $(".mask").height()){
			
			top = $(".showImg").height() -  $(".mask").height();
			
		}
		else if(top < 0){
			top = 0 ;
		}

		if(left > $(".showImg").width() -  $(".mask").width()){
			left = $(".showImg").width() -  $(".mask").width();
		}
		else if(left < 0){
			left = 0 ;
		}
		
		
		console.info(e.pageX,e.pageY );
		
		console.info("-----",x,y);
		
		$(".mask").css({"left":left,"top":top});
		$(".bigImg").css("background-position",-2*left +"px " + -2*top +"px")
	})
	
	$(".showImg").on("mouseleave",function(){
		//隐藏镜头 mask
		$(".mask").fadeOut();
		$(".bigImg").fadeOut();
		
	});
	
	
})
