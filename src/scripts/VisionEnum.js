define(function() {
	
	var VisionEnum = Object.freeze({
		INFRA: 1,
		VISIBLE: 2,
		ULTRA: 3
	});
	
	return {
		getVisionEnum: function() {
			return VisionEnum;
		}
	}
})