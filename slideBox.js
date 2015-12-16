(function($,window,document,undefined) {
	var defaults = {
		carousel:'#list',
		showCursor:true,
		timeout: 3500,
		toggleBtn:true
	};
	$.fn.slideBox = function(options){
		var opts = $.extend({},defaults,options);//防止污染defaults
		var $me = this,
			$list = $me.find(opts.carousel),
			$prevBtn = $('<span class="prevbtn btn">'),
			$nextBtn = $('<span class="nextbtn btn">');
		var width = $me.width(),
			all = $list.find('li').length-1,
			timer,
			timeout = opts.timeout;

		console.log(opts)
		$me.index = 0;
		var animation = function(index,speed){
			var i = index != undefined ? index : $me.index;
			$list.animate({'margin-left': '-' + (i)*width +'px'}, speed || 400);
			if (opts.showCursor) {
				$me.find('.cursor span').eq(i).addClass('active').siblings().removeClass('active');
			};
		},
		startCarousel = function(){
			if ($me.index < all) 
				$me.index = $me.index + 1;
			else
				$me.index = 0;
			animation();
			timer = setTimeout(startCarousel,timeout);
		};
		
		$list.find('li.item').each(function(index, el) {
			var img = $(this).find('img'),
				title = img.data('title') || '',
				content = img.data('content') || '';
			if (title || content) {
				var captionPanel = $('<div class="captionPanel">'),
					caption = $('<div class="caption">');
				caption.append('<h3>'+title+'</h3>');
				caption.append('<p>'+content+'</p>');
				$(this).append(captionPanel.append(caption));
			}
		});

		//指针悬停在轮播上
		$me.find('img').hover(function() {
			clearTimeout(timer);
		}, function() {
			timer = setTimeout(startCarousel,1000);
		});

		//是否显示切换按钮
		if (opts.toggleBtn){
			$me.append($prevBtn).append($nextBtn);
			//上一页按钮
			$me.on('click','.prevbtn',function(event) {
				if (!$list.is(':animated')) {
					$me.index = $me.index > 0 ? $me.index-1 : all;
					animation();
				}
			});
			//下一页按钮
			$me.on('click','.nextbtn',function(event) {
				if (!$list.is(':animated')) {
					$me.index = $me.index < all ?$me.index+1 : 0;
					animation();
				}
			});
		}
		
		//是否显示指示器
		if (opts.showCursor) {
			var $cursor = $('<div class="cursorPanel">').append('<div class="cursor">');
				list = [];
				console.log(all)
			$cursor.find('.cursor').append($('<span class="circle active">').text(1));
			for(var i = 1 ; i < all + 1 ; i++){
				//list.push('<span class="circle">'+(i+1)+'</span>');
				$cursor.find('.cursor').append($('<span class="circle">').text(i+1));
			}
			//$me.find('.cursor span').eq($me.index-1).addClass('active').siblings().removeClass('active');
			$cursor.on({
				click: function(event) {
					event.preventDefault();
					if (!$list.is(':animated')) {
						$me.index = $(this).index();
						animation();
					}
				}
				,mouseenter: function(event) {
					event.preventDefault();
					$(this).addClass('active');
					console.log($(this).index());
					animation($(this).index(),100);
					clearTimeout(timer);
				}
			}, '.circle');
			$cursor.hover(function() {}, function() {
				console.log('out');
				$cursor.find('.circle').eq($me.index - 1).addClass('active').siblings().removeClass('active');
				animation($me.index,300);
				timer = setTimeout(startCarousel,1000);
			});
			$me.append($cursor);
		}
		timer = setTimeout(startCarousel,timeout-1000);
		return $me;
	}
})(window.jQuery,window,document);