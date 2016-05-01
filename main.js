//Necessary functions for all
var random = function(high, low) {
	low = low || 0;
	diff = high - low;
	return (Math.random() * diff) + low;
};

var round = function(num, type, decimalPlaces) {
	type = type || "round";
	decimalPlaces = decimalPlaces || 0;

	if (type === "down") {
		return Math.floor(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
	} else if (type === "up") {
		return Math.ceil(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
	} else if (type === "round") {
		return Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
	}
};

var isString = function(obj) {
	//Does not have a use yet, but it's useful
	return toString.call(obj) == '[object String]';
};
//end

var reload = function() {
	location.reload();
};

var getPrimes = function() {
	var isPrime = function(num) {
		for (var a = 2; a <= Math.sqrt(num); a++) {
			if ((num % a) === 0) {
				return 0;
			}
		}
		return 1;
	};
	//Somehow using return true;  and return false; doesn't work

	var max = prompt("Enter a positive number or leave blank for a random number");
	max = max || round(random(Math.PI * 100, 50));

	var primes = [];
	primes.push(2);

	for (var b = 3; b <= max; b++) {
		if (isPrime(b) == 1) {
			primes.push(b);
		}
	}

	var output = "";

	for (var c = 0; c < primes.length; c++) {
		if (c === 0) {
			output = primes[0].toString() + ", ";
		} else if (c == primes.length - 1) {
			output = output + primes[c].toString();
		} else {
			output = output + primes[c].toString() + ", ";
		}
	}

	document.getElementById('primes').innerHTML = output;
};

var convertHour = function() {
	var hourToConvert = prompt("Enter a positive number or leave blank for a random number");
	hourToConvert = hourToConvert || random(Math.PI * 100);

	var dayToConvert = hourToConvert / 24;
	var day = round(dayToConvert, "down");

	hourToConvert = (dayToConvert - day) * 24;
	var hour = round(hourToConvert, "down");

	var minuteToConvert = (hourToConvert - hour) * 60;
	var minute = round(minuteToConvert, "down");

	var second = round((minuteToConvert - minute) * 60, "round", 2);
	
	if (day == 1) {
		day = day + " day, ";
	} else {
		day = day + " days, ";
	}

	if (hour == 1) {
		hour = hour + " hour, ";
	} else {
		hour = hour + " hours, ";
	}

	if (minute == 1) {
		minute = minute + " minute and ";
	} else {
		minute = minute + " minutes and ";
	}

	if (second == 1) {
		second = second + " second.";
	} else {
		second = second + " seconds.";
	}

	var converted = [day, hour, minute, second];

	document.getElementById('converted').innerHTML = converted[0] + converted[1] + converted[2] + converted[3];
};

var timeTill = function() {
	//http://ditio.net/2010/05/02/javascript-date-difference-calculation/

	var inDays = function(d1, d2) {
		var t1 = d1.getTime();
		var t2 = d2.getTime();

		return (t1 - t2) / (24*3600*1000);
	};

	var convertRound = function(num) {
		if (num > 0) {
			return round(num, "down");
		} else if (num < 0) {
			return round(num, "up");
		}
	};

	var date = prompt("Enter the future date, like this: October 13, 2014 11:13:00 (time is in 24 hour format)");
	date = date || "March 14, 2017 15:26";

	var futureDate = new Date(date);
	var currentDate = new Date();

	var dayToConvert = inDays(futureDate, currentDate);
	var day = convertRound(dayToConvert);

	var hourToConvert = (dayToConvert - day) * 24;
	var hour = convertRound(hourToConvert);

	var minuteToConvert = (hourToConvert - hour) * 60;
	var minute = convertRound(minuteToConvert);

	var second = round((minuteToConvert - minute) * 60, "round", 2);

	if (day == 1) {
		day = day + " day, ";
	} else {
		day = day + " days, ";
	}

	if (hour == 1) {
		hour = hour + " hour, ";
	} else {
		hour = hour + " hours, ";
	}

	if (minute == 1) {
		minute = minute + " minute and ";
	} else {
		minute = minute + " minutes and ";
	}

	if (second == 1) {
		second = second + " second left till " + futureDate + ".";
	} else {
		second = second + " seconds left till " + futureDate + ".";
	}

	var converted = [day, hour, minute, second];

	document.getElementById('timeTill').innerHTML = converted[0] + converted[1] + converted[2] + converted[3];
};

var mathTrick = function() {
	var num1 = function(total, diff) {
		return (total - diff) / 2;
	};

	var num2 = function(total, diff) {
		return total - ((total - diff) / 2);
	};

	var total = prompt("Think of two numbers. Calculate the total and the difference. Enter the total");
	var diff = prompt("Enter the difference");

	total = total || round(random(100));
	diff = diff || round(random(50));

	var numbers = [num1(total, diff), num2(total, diff)];

	var guess = "You were thinking of " + numbers[0] + " and " + numbers[1] + ".";

	document.getElementById('guess').innerHTML = guess;
};

var denaryToBinary = function() {
	var random = function(high, low) {
		low = low || 0;
		diff = high - low;
		return (Math.random() * diff) + low;
	};

	var n1;
	var n2;
	var n4;
	var n8;

	var n16;
	var n32;
	var n64;
	var n128;

	var n = prompt("Enter a positive number or leave empty for a random number");
	n = n || round(random(255));

	if (n >= 256) {
		document.getElementById('binary').innerHTML = "Overflow Error";
	} else {
		if (n >= 128) {
			n128 = "1";
			n -= 128;
		} else {
			n128 = "0";
		}

		if (n >= 64) {
			n64 = "1";
			n -= 64;
		} else {
			n64 = "0";
		}

		if (n >= 32) {
			n32 = "1";
			n -= 32;
		} else {
			n32 = "0";
		}

		if (n >= 16) {
			n16 = "1";
			n -= 16;
		} else {
			n16 = "0";
		}

		if (n >= 8) {
			n8 = "1";
			n -= 8;
		} else {
			n8 = "0";
		}

		if (n >= 4) {
			n4 = "1";
			n -= 4;
		} else {
			n4 = "0";
		}

		if (n >= 2) {
			n2 = "1";
			n -= 2;
		} else {
			n2 = "0";
		}

		if (n >= 1) {
			n1 = "1";
		} else {
			n1 = "0";
		}

		var binary = [n128, n64, n32, n16, n8, n4, n2, n1];

		document.getElementById('binary').innerHTML = binary[0] + binary[1] + binary[2] + binary[3] + " " + binary[4] + binary[5] + binary [6] + binary[7];
	}
};

var partitions = function() {
	var exp = function(num) {
		return Math.exp(num);
	};

	var sqrt = function(num) {
		return Math.sqrt(num);
	};
	
	var num = prompt("Enter a number you want to find the approximate number of partitions of, or leave empty for a random number");
	num = num || round(random(114));

	var part1 = 4 * num * sqrt(3);
	var part2 = Math.PI * sqrt((2 * num) / 3);

	var result = (1 / part1) * exp(part2);

	document.getElementById('partitions').innerHTML = round(result);

};

var factorableQuadratic = function() {
	var plusOrMinus = function(num) {
		if (num > 0) {
			return "+ " + num;
		} else if (num < 0) {
			return  "- " + (num * -1);
		}
	};

	var xValue4Quadratic = function(num) {
		if (num === 1) {
			return "+ x";
		} else if (num === -1) {
			return "- x";
		} else {
			return plusOrMinus(num) + "x";
		}
	};

	var xValue4Factored = function(num) {
		if (num === 1) {
			return "x";
		} else if (num === -1) {
			return "-x";
		} else {
			return num + "x";
		}
	};

	var a = 0;
	var b = 0;
	var c = 0;
	var d = 0;

	while (a === 0) {
		a = round(random(-15,15));
	}

	while (b === 0) {
		b = round(random(-15,15));
	}

	while (c === 0) {
		c = round(random(-15,15));
	}
    
	while (d === 0) {
		d = round(random(-15,15));
	}

	var aX = xValue4Factored(a);
	var bX = plusOrMinus(b);
	var cX = xValue4Factored(c);
	var dX = plusOrMinus(d);

	var factored = "(" + aX + " " + bX + ")(" + cX + " " + dX + ")";

	var ac = a * c;
	var adbc = xValue4Quadratic((a * d) + (b * c));
	var bd = plusOrMinus(b * d);

	var quadratic = ac + "x^2 " + adbc + " " + bd;

	document.getElementById('factorable').innerHTML = quadratic + " to " + factored;
};

var medianIQR = function() {	
	var isDecimal = function(num) {
		if ((num % 1) === 0) {
			return false;
		} else {
			return true;
		}
	};

	var sortArray = function(a, b) {
		return a - b;
	};	

	var randomArrayLength = prompt("Enter the length of the array you want to generate or leave empty for a random number");
	randomArrayLength = randomArrayLength || round(random(15, 5));	

	var randomArrayMax = prompt("Enter the maximum of the array you want to generate or leave empty for a random number");
	randomArrayMax = randomArrayMax || round(random(15, 5));

	var array = [];

	for (var d = 1; d <= round(randomArrayLength); d++) {
		array.push(round(random(0, randomArrayMax), "up", 1));
	}

	array.sort(sortArray);

	var q1 = array[round(((array.length / 4) - 1), "up")];
	var q3 = array[round((((array.length * 3) / 4) - 1), "up")];
	var iqr = q3 - q1;

	var nthValueInArray = (array.length - 1) / 2;

	var median = 0;

	if (isDecimal(nthValueInArray)) {
		median = (array[round(nthValueInArray, "down")] + array[round(nthValueInArray, "up")]) / 2;
	} else {
		median = array[nthValueInArray];
	}

	var maxArray = array[array.length - 1];
	var minArray = array[0];

	var output = "The median is " + median + ", Q1 is " + q1 + ", Q3 is " + q3 + " and the interquartile range is " + iqr + ". The max is " + maxArray + " and the min is " + minArray;

	document.getElementById('IQR').innerHTML = output;
};

/*
TODO List - 
1. None
*/