
jQuery.fn.gdAppend = function(name, argv) {
	var parent = this.get()[0];
	jQuery.gdComponent(name, parent, argv);
	return this;
}

jQuery.gdEval = function($, argv) {
	eval(argv.shift());
};

jQuery.gdComponent = (function() {
	return function(name, parent, argv) {
		if (!argv) argv = [];
		
		var base  = "file:///android_asset/components/" + name.replace(/\.+/g, "/");
		var comp = {
				html:	base + ".html",
				css:	base + ".css",
				js:		base + ".js",
		};
		var _index = [];
		
		var index = function(idx, node) {
			idx.push(node);
			jQuery(node).children().each(function() {
				index(idx, this);
			});
		};
		
		var $ = function(selector) {
			if (typeof(selector) != "string")
				return jQuery(selector);
			
			var res = jQuery(selector, $.root).get();
			var tmp = [];
			
			for (var i = 0; i < res.length; i++) {
				for (var j = 0; j < _index.length; j++) {
					if (res[i] == _index[j]) {
						tmp.push(res[i]);
					}
				}
			}
			res = tmp;
			return jQuery(res);
		};
		
		jQuery.extend($, jQuery);
		
		$.component = name;
		
		jQuery.get(comp.html, function(data) {
			var p		= jQuery(data).get()[0];
			var frag	= document.createDocumentFragment();
			
			frag.appendChild(p);
			index(_index, p);
			parent.appendChild(frag);
			
			$.root = p.parentNode;
			
			jQuery.get(comp.js, function(data) {
				argv.push(data);
				jQuery.gdEval($, argv);
			});
			
		});
	};
})();