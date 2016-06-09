//The "keystone" functions for all ( .Y .) <-- Totally eyes
var keystone = (function() {
	return {
		isString: function(obj) {
			return isNaN(obj);
		},

		random: function(high, low) {
			low = low || 0;
			
			var diff = high - low;
			return (Math.random() * diff) + low;
		},

		round: function(num, type, decimalPlaces) {
			type = type || "nearest";
			decimalPlaces = decimalPlaces || 0;

			var toDecimalPlaces = function(num) {
				return num * Math.pow(10, decimalPlaces);
			};

			if (type === "down") {
				return Math.floor(toDecimalPlaces(num)) / Math.pow(10, decimalPlaces);
			} else if (type === "up") {
				return Math.ceil(toDecimalPlaces(num)) / Math.pow(10, decimalPlaces);
			} else if (type === "nearest") {
				return Math.round(toDecimalPlaces(num)) / Math.pow(10, decimalPlaces);
			}
		},

		approximateSqrt: function(num) {
			var diff = num;
			var closestSquare = 1;

			while (true) {
				diff = num - (closestSquare * closestSquare);
				
				if (diff === 0) {
					break;
				} else if (diff < 0) {
					closestSquare--;
					break;
				} else {
					closestSquare++;
				}
			}

			diff = num - (closestSquare * closestSquare);
			return closestSquare + (diff / (closestSquare * 2));
		},

		sortArrayNumber: function(a, b) {
			return a - b;
		}
	};
})();

var reload = function() {
	location.reload();
};

var getPrimes = function() {
	var a = performance.now();

	var isPrime = function(num) {
		for (var a = 2; a <= Math.sqrt(num); a++) {
			if ((num % a) === 0) {
				return 0;
			}
		}
		return 1;
	};
	//Somehow using return true; and return false; doesn't work

	var max = "foo";
	while (keystone.isString(max)) {
		max = prompt("Enter a positive number or leave blank for a random number");
		max = max || keystone.round(keystone.random(Math.PI * 100, 50));
	}

	var primes = [];
	primes.push(2);

	for (var b = 3; b <= max; b++) {
		if (isPrime(b) === 1) {
			primes.push(b);
		}
	}

	var output = "foo";

	for (var c = 0; c < primes.length; c++) {
		if (c === 0){
			output = primes[c] + ", ";
		} else if (c === primes.length - 1) {
			output = output + primes[c];
		} else {
			output = output + primes[c] + ", ";
		}
	}

	document.getElementById('primes').innerHTML = output;

	var b = performance.now();
	console.log("getPrimes() performance: " + keystone.round(b - a, "nearest", 2) + "ms");
};

var convertHour = function() {
	var c = performance.now();

	var hourToConvert = "foo";
	while (keystone.isString(hourToConvert)) {
		hourToConvert = prompt("Enter a postive number or leave blank for random");
		hourToConvert = hourToConvert || keystone.random(365 * 24);
	}

	var weekToConvert = hourToConvert / (24 * 7);
	var week = keystone.round(weekToConvert, "down");

	var dayToConvert = (weekToConvert - week) * 7;
	var day = keystone.round(dayToConvert, "down");

	hourToConvert = (dayToConvert - day) * 24;
	var hour = keystone.round(hourToConvert, "down");

	var minuteToConvert = (hourToConvert - hour) * 60;
	var minute = keystone.round(minuteToConvert, "down");

	var second = keystone.round((minuteToConvert - minute) * 60, "nearest", 2);

	if (week == 1) {
		week = week + " week, ";
	} else {
		week = week + " weeks, ";
	}

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

	var converted = [week, day, hour, minute, second];

	document.getElementById('converted').innerHTML = converted[0] + converted[1] + converted[2] + converted[3] + converted[4];

	var d = performance.now();
	console.log("convertHour() performance: " + keystone.round((d - c), "nearest", 2) + "ms");
};

var timeTill = function() {
	var e = performance.now();
	//http://ditio.net/2010/05/02/javascript-date-difference-calculation/

	var inWeeks = function(d1, d2) {
		var t1 = d1.getTime();
		var t2 = d2.getTime();

		return (t1 - t2) / (7 * 24 * 60 * 60 * 1000);
	};

	var convertRound = function(num) {
		if (num > 0) {
			return keystone.round(num, "down");
		} else if (num < 0) {
			return keystone.round(num, "up");
		}
	};

	var isValidDate = function(d) {
		if ( Object.prototype.toString.call(d) !== "[object Date]" ) {
			return false;
		}
		return !isNaN(d.getTime());
	};

	var futureDate = new Date();
	var currentDate = new Date();

	while (!isValidDate(futureDate) || (futureDate.getTime() <= currentDate.getTime())) {
		var date = prompt("Enter the future date, like this: October 13, 2014 11:13:00 (time is in 24 hour format)");
		var selectDate = date || "random";

		if (selectDate === "random") {
			var tempDate = new Date();
			
			var month = tempDate.getMonth() + 1;
			if (month <= 9) {
				month = "0" + month;
			}

			var days = tempDate.getDate();
			if (days <= 9) {
				days = "0" + days;
			}

			var year = tempDate.getFullYear() + 1;

			var hours = tempDate.getHours();
			if (hours <= 9) {
				hours = "0" + hours;
			}

			var minutes = tempDate.getMinutes();
			if (minutes <= 9) {
				minutes = "0" + minutes;
			}

			var tempDate1 = month + " " + days + ", " + year + " " + hours + ":" + minutes;
			tempDate1 = new Date(tempDate1);

			var randomisedDate = keystone.random(tempDate1.getTime(), currentDate.getTime());
			
			futureDate = new Date(randomisedDate);
		} else {
			futureDate = new Date(date);
		}                
	}  
	
	var weekToConvert = inWeeks(futureDate, currentDate);

	var week = convertRound(weekToConvert);

	var dayToConvert = (weekToConvert - week) * 7 ;
	var day = convertRound(dayToConvert);

	var hourToConvert = (dayToConvert - day) * 24;
	var hour = convertRound(hourToConvert);

	var minuteToConvert = (hourToConvert - hour) * 60;
	var minute = convertRound(minuteToConvert);

	var second = keystone.round((minuteToConvert - minute) * 60, "nearest", 2);
	
	if (week == 1 ) {
		week = week + " week, ";
	} else {
		week = week + " weeks, ";
	}

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

	var converted = [week, day, hour, minute, second];
	//console.log(converted[0]);

	document.getElementById('timeTill').innerHTML = converted[0] + converted[1] + converted[2] + converted[3] + converted[4];

	var f = performance.now();
	console.log("timeTill() performance: " + keystone.round((f - e), "nearest", 2) + "ms");
};

var mathTrick = function() {
	var g = performance.now();

	var num1 = function(total, diff) {
		return (total - diff) / 2;
	};

	var num2 = function(total, diff) {
		return total - ((total - diff) / 2);
	};

	var total = "foo";
	var diff = "foo";

	while (keystone.isString(total) || keystone.isString(diff)) {
		total = prompt("Think of two numbers. Calculate the total and the difference. Enter the total or leave blank for a random number");
		total = total || keystone.round(keystone.random(100));

		diff = prompt("Enter the difference or leave blank for a random number");
		diff = diff || keystone.round(keystone.random(50));
	}

	var numbers = [num1(total, diff), num2(total, diff)];

	var guess = "You were thinking of " + numbers[0] + " and " + numbers[1] + ".";

	document.getElementById('guess').innerHTML = guess;

	var h = performance.now();
	console.log("mathTrick() performance: " + keystone.round((h - g), "nearest", 2) + "ms");
};

var denaryToBinary = function() {
	var i = performance.now();

	var n1;
	var n2;
	var n4;
	var n8;

	var n16;
	var n32;
	var n64;
	var n128;

	var n = "foo";

	while (keystone.isString(n)) {
		n = prompt("Enter a positive number or leave empty for a random number");
		n = n || keystone.round(keystone.random(255));
	}

	if (n > 255) {
		document.getElementById('binary').innerHTML = "Overflow Error";
	} else if ((n % 1) !== 0) {
		document.getElementById('binary').innerHTML = "Invalid Integer";
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

		document.getElementById('binary').innerHTML = binary[0] + binary[1] + binary[2] + binary[3] + " " + binary[4] + binary[5] + binary[6] + binary[7];

		var j = performance.now();
		console.log("denaryToBinary() performance: " + keystone.round((j - i), "nearest", 2) + "ms");
	}
};

var partitions = function() {
	var k = performance.now();

	var exp = function(num) {
		return Math.exp(num);
	};

	var sqrt = function(num) {
		return Math.sqrt(num);
	};

	//https://www.desmos.com/calculator/yo526tkuvu
	var num = "foo";

	while (keystone.isString(num)) {
		num = prompt("Enter a number you want to find the approximate number of partitions of, or leave empty for a random number");
		num = num || keystone.round(keystone.random(76567));
	}

	var part1 = 4 * num * sqrt(3);
	//var part1a = 4 * num * Math.sqrt(3);
	
	var part2 = Math.PI * sqrt((2 * num) / 3);
	//var part2a = Math.PI * Math.sqrt((2 * num) / 3);

	var result = (1 / part1) * exp(part2);
	//var resulta = (1 / part1a) * exp(part2a);

	//console.log("Result using Math.sqrt result: " + keystone.round(resulta, "nearest", 4));
	//var percentOff = (Math.abs(result - resulta) / resulta) * 100;
	//console.log("Percent off: " + keystone.round(percentOff, "nearest", 4));

	document.getElementById('partitions').innerHTML = num + " has " + keystone.round(result) + " partitions";

	var l = performance.now();
	console.log("partitions() performance: " + keystone.round((l - k), "nearest", 2) + "ms");
};

var factorableQuadratic = function() {
	var m = performance.now();

	var plusOrMinus = function(num) {
		if (num > 0) {
			return "+ " + num;
		} else if (num < 0) {
			return "- " + (num * -1);
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
		a = keystone.round(keystone.random(5, -5));
	}

	while (b === 0) {
		b = keystone.round(keystone.random(15, -15));
	}

	while (c === 0) {
		c = keystone.round(keystone.random(5, -5));
	}

	while (d === 0) {
		d = keystone.round(keystone.random(15, -15));
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

	var n = performance.now();
	console.log("factorableQuadratic() performance: " + keystone.round((n - m), "nearest", 2) + "ms");
};

var medianIQR = function() {
	var o = performance.now();

	var isDecimal = function(num) {
		if ((num % 1) === 0) {
			return false;
		} else {
			return true;
		}
	};

	var sortArrayNumber = function(a, b) {
		return a - b;
	};

	var randomArrayLength = "foo";
	while (keystone.isString(randomArrayLength)) {
		randomArrayLength = prompt("Enter the length of the array you want to generate or leave empty for a random number");
		randomArrayLength = randomArrayLength || keystone.round(keystone.random(15, 5));
	}

	var randomArrayMax = "foo";
	while (keystone.isString(randomArrayMax)) {
		randomArrayMax = prompt("Enter the maximum of the array you want to generate or leave empty for a random number");
		randomArrayMax = randomArrayMax || keystone.round(keystone.random(15, 10));
	}

	var array = [];

	for (var d = 0; d < keystone.round(randomArrayLength); d++) {
		array.push(keystone.round(keystone.random(randomArrayMax), "up", 1));
	}

	array.sort(keystone.sortArrayNumber);

	var q1 = keystone.round(array[keystone.round(((array.length / 4) - 1), "up")], "nearest", 1);
	var q3 = keystone.round(array[keystone.round((((array.length * 3) / 4) - 1), "up")], "nearest", 1);
	var iqr = keystone.round(q3 - q1, "nearest", 1);

	var nthValueInArray = (array.length - 1) / 2;

	var median = 0;

	if (isDecimal(nthValueInArray)) {
		median = keystone.round((array[keystone.round(nthValueInArray, "down")] + array[keystone.round(nthValueInArray, "up")]) / 2, "nearest", 1);
	} else {
		median = keystone.round(array[nthValueInArray], "nearest", 1);
	}

	var maxArray = keystone.round(array[array.length - 1],"nearest", 1);
	var minArray = keystone.round(array[0], "nearest", 1);

	var output = "The median is " + median + ", Q1 is " + q1 + ", Q3 is " + q3 + " and the interquartile range is " + iqr + ". The max is " + maxArray + " and the min is " + minArray;

	document.getElementById('IQR').innerHTML = output;

	var p = performance.now();
	console.log("medianIQR() performance: " + keystone.round((p - o), "nearest", 2) + "ms");
};

var approxSqrt = function() {
	//https://github.com/ErmiyaEskandary/Slither.io-bot/pull/127
	var q = performance.now();

	var num = "foo";
	while (keystone.isString(num)) {
		num = prompt("Enter a number or leave blank for a random number");
		num = keystone.round(Math.abs(num)) || keystone.round(keystone.random(Math.PI * 100));	
	}

	var approximate = keystone.approximateSqrt(num);
	
	var actual = Math.sqrt(num);
	console.log("Actual value " + keystone.round(actual, "nearest", 4));
	
	var percentOff = keystone.round((Math.abs(actual - approximate) / actual) * 100, "nearest", 4);

	document.getElementById('approxSqrt').innerHTML = "The approximate square root of " + num + " is " + keystone.round(approximate, "nearest", 4) + " and it was " + percentOff + "% off the real value"; 

	var r = performance.now();
	console.log("approxSqrt() performance: " + keystone.round((r - q), "nearest", 2) + "ms");
};

var normalDistribution = function() {
	var s = performance.now();

	var normalCDF = function(x) {
		var t = 1 / (1 + 0.2316419 * Math.abs(x));
        var d = 0.3989423 * Math.exp(-x * x / 2);
        var prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
        if (x > 0) {
            prob = 1 - prob;
        }
        return prob;
	};

	var calculate = function(val, mean, sd) {
		var prob = 0;
		sd = Math.abs(sd);

		if (sd === 0) {
			if (val < mean) {
				prob = 0;
			} else {
				prob = 1;
			}
		} else {
			prob = normalCDF((val - mean) / sd);
		}
		return prob;
	};

	var mean = "foo";
	while (keystone.isString(mean)) {
		mean = prompt("Enter the mean or leave blank for a random number");
		mean = mean || keystone.random(Math.PI * 100);
	}

	var sd = "foo";
	while (keystone.isString(sd)) {
		sd = prompt("Enter the standard deviation or leave blank for a random number");

		if (mean === 0) {
			sd = sd || keystone.random(10);
		} else {
			sd = sd || keystone.random(mean / 10);
		}
	}

	var val = "foo";
	while (keystone.isString(val)) {
		val = prompt("Enter the value for P(X < x) or leave blank for a random number");
		val = val || keystone.random(mean + (sd * 4), mean - (sd * 4))
	}

	var result = keystone.round(calculate(val, mean, sd), "nearest", 4);

	val = keystone.round(val, "nearest", 2);
	mean = keystone.round(mean, "nearest", 2);
	var sdSquared = keystone.round(sd * sd, "nearest", 2);

	document.getElementById('normalDF').innerHTML = "X ~ N(" + mean + ", " + sdSquared + ") --> P(X < " + val + ") = " + result;
	console.log("Standard Deviation: " + keystone.round(sd, "nearest", 2));

	var t = performance.now();
	console.log("normalDistribution() performance: " + keystone.round(t - s, "nearest", 2) + "ms");
};

/*
TODO List - 
1. Enhancement {
	a. None
}
2. None
*/
