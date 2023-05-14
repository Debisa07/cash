function BusStopService()
{
	var stops = [
		{ stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, donationNeeded: 1200, name: 'Alemayew' },
		{ stopId: 2, lat: 33.760138, lng: -84.388043, donationsRaisedInDollars: 0, donationNeeded: 1400, name: 'zewdu' },
		
	];

	/**
	 * returns an array of all stops on success
	 * on failure, throws Error
	 */
	this.getAllStops = function ()
	{
		randomlyFailWith('Unable to read database');

		return clone(stops);
	}

	/**
	 * returns nothing on success
	 * on failure, throws Error
	 */
	this.addDonation = function (stopId, donationAmountInDollars)
	{
		randomlyFailWith('Unable to connect to database');

		var stop = stops.find(function (s)
		{
			return s.stopId === stopId;
		});

		if (!stop)
		{
			throw new Error('Stop with stop id ' + stopId + ' not found.');
		}

		stop.donationsRaisedInDollars += donationAmountInDollars;
	}


	// thanks to http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
	function clone(obj) 
	{
	    var copy;

	    // Handle the 3 simple types, and null or undefined
	    if (null == obj || 'object' != typeof obj) return obj;

	    // Handle Date
	    if (obj instanceof Date) {
	        copy = new Date();
	        copy.setTime(obj.getTime());
	        return copy;
	    }

	    // Handle Array
	    if (obj instanceof Array) {
	        copy = [];
	        for (var i = 0, len = obj.length; i < len; i++) {
	            copy[i] = clone(obj[i]);
	        }
	        return copy;
	    }

	    // Handle Object
	    if (obj instanceof Object) {
	        copy = {};
	        for (var attr in obj) {
	            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
	        }
	        return copy;
	    }

	    throw new Error('Unable to copy obj! Its type is not supported.');
	}

	function randomlyFailWith(errorMessage)
	{
		if ((Math.random() * 100) > 80.0)
		{
			throw new Error(errorMessage);
		}
	}
}
export default BusStopService;