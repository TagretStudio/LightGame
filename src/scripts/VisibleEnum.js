define(function() {

    var VisibleEnum = Object.freeze({
	HIGH: 0,
	VISIBLE: 1,
	LOW: 2,
	properties: {
	    0: {
		name: "high"
	    },
	    1: {
		name: "visible"
	    },
	    2: {
		name: "low"
	    }
	}
    });

    return{
	getVisibleEnum : function() {
	    return VisibleEnum;
	}
    }
})
