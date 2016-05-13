//Necessary functions for all ( .Y .) <-- Totally eyes
var random = function(high, low) {
	low = low || 0;

	if (isString(high)) {
		console.log("Invalid high parameter");
		return "Invalid";
	} else if (isString(low)) {
		console.log("Invalid low parameter");
		return "Invalid";
	} else {
		var diff = high - low;
		return (Math.random() * diff) + low;	
	} 	
};

var round = function(num, type, decimalPlaces) {
	type = type || "nearest";
	decimalPlaces = decimalPlaces || 0;

	if (type === "down") {
		return Math.floor(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
	} else if (type === "up") {
		return Math.ceil(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
	} else if (type === "nearest") {
		return Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
	} else {
		console.log("Invalid round type");
	}
};

var isString = function(obj) {
	return isNaN(obj);
};

var sortArrayNumber = function(a, b) {
	return a - b;
};
//end

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
	//Somehow using return true;  and return false; doesn't work

	var max = prompt("Enter a positive number or leave blank for a random number");
	max = max || round(random(Math.PI * 100, 50));

	while (isString(max)) {
		max = prompt("Enter a positive number or leave blank for a random number");
		max = max || round(random(Math.PI * 100, 50));
	}

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
	
	var b = performance.now();
	console.log("getPrimes() performance: " + round((b - a), "nearest", 2) + "ms");
};

var convertHour = function() {
	var c = performance.now();
	
	var hourToConvert = prompt("Enter a positive number or leave blank for a random number");
	hourToConvert = hourToConvert || random(365 * 24);

	while (isString(hourToConvert)) {
		hourToConvert = prompt("Enter a positive number or leave blank for a random number");
		hourToConvert = hourToConvert || random(365 * 24);
	}
	
	var weekToConvert = hourToConvert / (24 * 7);
	var week = round(weekToConvert, "down");

	var dayToConvert = (weekToConvert - week) * 7;
	var day = round(dayToConvert, "down");

	hourToConvert = (dayToConvert - day) * 24;
	var hour = round(hourToConvert, "down");

	var minuteToConvert = (hourToConvert - hour) * 60;
	var minute = round(minuteToConvert, "down");

	var second = round((minuteToConvert - minute) * 60, "nearest", 2);

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
	console.log("convertHour() performance: " + round((d - c), "nearest", 2) + "ms")
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
			return round(num, "down");
		} else if (num < 0) {
			return round(num, "up");
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

	//var validate = futureDate;
	while (!isValidDate(futureDate) || (futureDate.getTime() <= currentDate.getTime())) {
		var date = prompt("Enter the future date, like this: October 13, 2014 11:13:00 (time is in 24 hour format)");
		var selectDate = date || "random";

		if (selectDate === "random") {
			var tempDate = new Date();
			
			var month = tempDate.getMonth() + 1;
			if (month <= 9) {
				month = "0" + month;
			}
			//console.log(month);

			var days = tempDate.getDate();
			if (days <= 9) {
				days = "0" + days;
			}
			//console.log(days);

			var year = tempDate.getFullYear() + 1;
			//console.log(year);

			var hours = tempDate.getHours();
			if (hours <= 9) {
				hours = "0" + hours;
			}
			//console.log(hours);

			var minutes = tempDate.getMinutes();
			if (minutes <= 9) {
				minutes = "0" + minutes;
			}
			//console.log(minutes);

			var tempDate1 = month + " " + days + ", " + year + " " + hours + ":" + minutes;
			tempDate1 = new Date(tempDate1);

			var randomisedDate = random(tempDate1.getTime(), currentDate.getTime());
			
			futureDate = new Date(randomisedDate);
			//validate = futureDate.getTime();
			//alert(futureDate);
		} else {
			futureDate = new Date(date);
		}                
	}  
	
	var weekToConvert = inWeeks(futureDate, currentDate);
	//console.log(weekToConvert);
	var week = convertRound(weekToConvert);
	//console.log(week);

	var dayToConvert = (weekToConvert - week) * 7 ;
	var day = convertRound(dayToConvert);

	var hourToConvert = (dayToConvert - day) * 24;
	var hour = convertRound(hourToConvert);

	var minuteToConvert = (hourToConvert - hour) * 60;
	var minute = convertRound(minuteToConvert);

	var second = round((minuteToConvert - minute) * 60, "nearest", 2);
	
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
	console.log("timeTill() performance: " + round((f - e), "nearest", 2) + "ms");
};

var mathTrick = function() {
	var g = performance.now();

	var num1 = function(total, diff) {
		return (total - diff) / 2;
	};

	var num2 = function(total, diff) {
		return total - ((total - diff) / 2);
	};

	var total = prompt("Think of two numbers. Calculate the total and the difference. Enter the total or leave blank for a random number");
	var diff = prompt("Enter the difference or leave blank for a random number");

	total = total || round(random(100));
	diff = diff || round(random(50));

	while (isString(total) || isString(diff)) {
		total = prompt("Think of two numbers. Calculate the total and the difference. Enter the total or leave blank for a random number");
		total = total || round(random(100));

		diff = prompt("Enter the difference or leave blank for a random number");
		diff = diff || round(random(50));
	}

	var numbers = [num1(total, diff), num2(total, diff)];

	var guess = "You were thinking of " + numbers[0] + " and " + numbers[1] + ".";

	document.getElementById('guess').innerHTML = guess;

	var h = performance.now();
	console.log("mathTrick() performance: " + round((h - g), "nearest", 2) + "ms");
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

	var n = prompt("Enter a positive number or leave empty for a random number");
	n = n || round(random(255));

	while (isString(n)) {
		n = prompt("Enter a positive number or leave empty for a random number");
		n = n || round(random(255));
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
		console.log("denaryToBinary() performance: " + round((j - i), "nearest", 2) + "ms")
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
	var num = prompt("Enter a number you want to find the approximate number of partitions of, or leave empty for a random number");
	num = num || round(random(Math.pow(10, 4.884042141949543225365459875320084393024444580078125)));

	while (isString(num)) {
		num = prompt("Enter a number you want to find the approximate number of partitions of, or leave empty for a random number");
		num = num || round(random(Math.pow(10, 4.884042141949543225365459875320084393024444580078125)));
	}

	var part1 = 4 * num * sqrt(3);
	var part2 = Math.PI * sqrt((2 * num) / 3);

	var result = (1 / part1) * exp(part2);

	document.getElementById('partitions').innerHTML = num + " has " + round(result) + " partitions";

	var l = performance.now();
	console.log("partitions() performance: " + round((l - k), "nearest", 2) + "ms");
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
		a = round(random(5, -5));
	}

	while (b === 0) {
		b = round(random(15, -15));
	}

	while (c === 0) {
		c = round(random(5, -5));
	}

	while (d === 0) {
		d = round(random(15, -15));
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
	console.log("factorableQuadratic() performance: " + round((n - m), "nearest", 2) + "ms")
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

	var randomArrayLength = prompt("Enter the length of the array you want to generate or leave empty for a random number");
	randomArrayLength = randomArrayLength || round(random(15, 5));

	while (isString(randomArrayLength)) {
		randomArrayLength = prompt("Enter the length of the array you want to generate or leave empty for a random number");
		randomArrayLength = randomArrayLength || round(random(15, 5));
	}

	var randomArrayMax = prompt("Enter the maximum of the array you want to generate or leave empty for a random number");
	randomArrayMax = randomArrayMax || round(random(15, 10));

	while (isString(randomArrayMax)) {
		randomArrayMax = prompt("Enter the maximum of the array you want to generate or leave empty for a random number");
		randomArrayMax = randomArrayMax || round(random(15, 10));
	}

	var array = [];

	for (var d = 1; d <= round(randomArrayLength); d++) {
		array.push(round(random(randomArrayMax), "up", 1));
	}

	array.sort(sortArrayNumber);

	var q1 = round(array[round(((array.length / 4) - 1), "up")], "nearest", 1);
	var q3 = round(array[round((((array.length * 3) / 4) - 1), "up")], "nearest", 1);
	var iqr = round(q3 - q1, "nearest", 1);

	var nthValueInArray = (array.length - 1) / 2;

	var median = 0;

	if (isDecimal(nthValueInArray)) {
		median = round((array[round(nthValueInArray, "down")] + array[round(nthValueInArray, "up")]) / 2, "nearest", 1);
	} else {
		median = round(array[nthValueInArray], "nearest", 1);
	}

	var maxArray = round(array[array.length - 1],"nearest", 1);
	var minArray = round(array[0], "nearest", 1);

	var output = "The median is " + median + ", Q1 is " + q1 + ", Q3 is " + q3 + " and the interquartile range is " + iqr + ". The max is " + maxArray + " and the min is " + minArray;

	document.getElementById('IQR').innerHTML = output;

	var p = performance.now();
	console.log("medianIQR() performance: " + round((p - o), "nearest", 2) + "ms");
};

var approxSqrt = function() {
	//https://github.com/ErmiyaEskandary/Slither.io-bot/pull/127
	var q = performance.now();

	var num = prompt("Enter a number or leave blank for a random number");
	num = round(Math.abs(num)) || round(random(Math.PI * 100));

	while (isString(num)) {
		num = prompt("Enter a number or leave blank for a random number");
		num = round(Math.abs(num)) || round(random(Math.PI * 100));	
	}

	var diff = 1;
	var closestSquare = 1;

	while (diff > 0) {
		diff = num - (closestSquare * closestSquare);
		if (diff === 0) {
			closestSquare++;
			break;
		}
		closestSquare++;
	}

	//console.log(closestSquare);
	//console.log(diff);

	closestSquare = closestSquare - 1;
	//console.log(newClosestSquare);

	diff = num - (closestSquare * closestSquare);
	//console.log(newDiff);

	var approximate = round(closestSquare + (diff / (closestSquare * 2)), "nearest", 4);
	var actual = Math.sqrt(num);
	console.log("Actual value " + round(actual, "nearest", 4));
	var percentOff = round((Math.abs(actual - approximate) / actual) * 100, "nearest", 4);

	document.getElementById('approxSqrt').innerHTML = "The approximate square root of " + num + " is " + approximate + " and it was " + percentOff + "% off the real value"; 

	var r = performance.now();
	console.log("approxSqrt() performance: " + round((r - q), "nearest", 2) + "ms");	
};


/*
TODO List - 
1. Enhancement {
	a. None
}
2. None
*/