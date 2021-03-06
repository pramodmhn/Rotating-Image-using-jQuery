(function($){
	$.fn.rotateImage=function(options){
		var defaults={
			id: "image-container",			
			imageAttribute: {							
				source:["noimage.jpg"],
				url:["#"]												
			},			
			width: 600,
			height: 250,		 
			fadeTime: 2000, 
			easing: "swing",
			timeInterval: 2000			
		};
		
		var imageNum=0;
		
		var settings=$.extend({},defaults,options);		
		return this.each(function(){
			Len=settings.imageAttribute.source.length;
			var id="#"+settings.id;	
			width=settings.width;			
			var height=settings.height;
			setImagePlaceHolder(Len,id,width,height);			
			rotateImage=$(id + " img");		
			rotateImageUrl=$(id + " a");				
			rotateImage.css("border","0").attr("src",settings.imageAttribute.source[0]);
			rotateImageUrl.attr("href",settings.imageAttribute.url[0]);
			rotateImage.eq(0).fadeIn();	
			rotateImage.bind({
				mouseover: function(){clearInterval(interval);},
				mouseleave: function(){interval=startRotating();}	
			});
			interval=startRotating(id);
		});
		
		 function setImagePlaceHolder(Len,id,width,height){
			for(var j=0;j<Len;j++)	
			{	if(settings.imageAttribute.url[j]=="")
					$(id).append('<img class="img-responsive" src="noimage.jpg" />');	
				else
					$(id).append('<a href="#"><img class="img-responsive" src="noimage.jpg" /></a>');
			}
			$(id).css({
				 	"display" : "block",
				  	"margin-top" : "10px",
				  	"margin-left" : "auto",
				  	"margin-right" : "auto",
				 	"width" : width+"px",
				 	"height" : height+"px"
			});
			$(id + " img").css( {
 					display: "none",
  					position: "absolute"
			}) 
		}
		function startRotating(id){			
			i=setInterval(function(){
			rotateImage.eq(imageNum).fadeOut(settings.fadeTime,settings.easing);		
			if(imageNum==Len-1?imageNum=0:imageNum++);							
			rotateImageUrl.eq(imageNum).attr("href",settings.imageAttribute.url[imageNum]);
			rotateImage.eq(imageNum).attr("src",settings.imageAttribute.source[imageNum]);
			var new_height=rotateImage.eq(imageNum).css("height");	
			//alert($(id).css("height",40));
			$(id).css("height",new_height);
			//alert($(id).css("height"));			
			rotateImage.eq(imageNum).fadeIn(settings.fadeTime,settings.easing);			
			},settings.timeInterval);	
			return i;	
		}
		
	};


}(jQuery));
