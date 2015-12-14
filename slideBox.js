(function($) {
	var defaults = {
		carousel:'#list',
		showCursor:true
	};
	$.fn.slideBox = function(options){
		var opts = $.extend({},defaults,options);
		var $me = $(this),$list = $me.find(opts.carousel),
			$prevBtn = $('<span class="prevbtn btn">'),
			$nextBtn = $('<span class="nextbtn btn">');
		var width = $me.width(),
			index = 0, all = $list.find('li').length-1,
			timer;

		$me.append($prevBtn).append($nextBtn);

		function animation(speed){
			if (!$list.is(':animated')) {
				$list.animate({'margin-left': '-'+ $me.index*width+'px'}, speed || 700);
			}
		}
		function startCarousel () {
			if ($me.index < all) 
				$me.index++;
			else
				$me.index = 0;
			animation();
			timer = setTimeout(startCarousel,3500);
		}
		timer = setTimeout(startCarousel,3500);

		$me.hover(function() {
			console.log('hover');
			clearTimeout(timer);
		}, function() {
			timer = setTimeout(startCarousel,1000);
		});

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

		$me.on('click','.prevbtn',function(event) {
			$me.index = $me.index > 0 ? $me.index-1 : all;
			console.log($me.index);
			animation();
		});

		$me.on('click','.nextbtn',function(event) {
			$me.index = $me.index < all ?$me.index+1 : 0;
			animation();
		});

		if ($me.showCursor) {
			var $cursor = $('<div class="pointerPanel">').append('<div class="pointer">');
			for(var i = 0 ; i < all ; i++){
				var $point = $('<span class="circle">').text(i+1);
				$cursor.find('.pointer').append($point);
			}
			$me.append($cursor);
		}

		return $me.each(function(index, el) {
			$(this).options = $(this).opts;
		});
	}
})(window.jQuery);