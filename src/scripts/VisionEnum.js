define(function() {

	var VisionEnum = Object.freeze({
		INFRA: 1,
		VISIBLE: 2,
		ULTRA: 3,
		MEGA: 4,
		properties: {
			1: {
				name: "infra"
			},
			2: {
				name: "visible"
			},
			3: {
				name: "ultra"
			},
			4: {
				name: "mega"
			}
		}
	});

    var VisionCurrent = VisionEnum.VISIBLE;

	return {
		getVisionEnum: function() {
			return VisionEnum;
		},
	    setVisionCurrent: function(vision) {
		VisionCurrent = vision;
	    },
	    getVisionCurrent: function() {
		return VisionCurrent;
	    }
	}
})
