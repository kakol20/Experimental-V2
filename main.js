//Keystone Functions

var keystone = (function() {
	return {
		isString: function(a) {
			return isNaN(a);
		},

		random: function(a, b) {
			b = b || 0;
			var c = a - b;
			return (Math.random() * c) + b;
		},

		round: function(a, b, c) {
			b = b || "nearest";
			c = c || 0;
			if (b === "down") {
				return Math.floor(a * Math.pow(10, c)) / Math.pow(10, c);
			} else if (b === "up") {
				return Math.ceil(a * Math.pow(10, c)) / Math.pow(10, c);
			} else if (b === "nearest") {
				return Math.round(a * Math.pow(10, c)) / Math.pow(10, c);
			}
		},

		approximateSqrt: function(a) {
			var b = a;
			var c = 1;
			while (true) {
				b = a - (c * c);
				if (b === 0) {
					break;
				} else if (b < 0) {
					c--;
					break;
				} else {
					c++;
				}
			}
			b = a - (c * c);
			return c + (b / (c * 2));
		},

		sortAscending: function(a, b) {
			return a - b
			//array.sort(keystone.sortAscending) - for reference
		},
		sortDescending: function(a, b) {
			return b - a;
		},

		isPrime: function(a) {
			if (a === 2) {
				return "true";
			} else if (a > 2) {
				for (var i = 2; i <= Math.sqrt(a); i++) {
					if ((a % i) === 0) {
						return "false";
					}
				}
				return "true";
			} else {
				return "false";
			}
		},

        removeDupes: function(a) {
            function b(c) {
                var d = [];
                $.each(c, function(i, e) {
                    if ($.inArray(e, d) == -1) d.push(e);
                });
                return d;
            }
            return b(a); //Has no use yet
        }

		//Just for reference
		removeFromArray: function(a, b) {
			if (b > -1) {
				a.splice(b, 1);
			}
		}
	};
})();

var reload = function() {
	location.reload();
};

var getPrimes = function() {
	var min = Math.abs(document.getElementById('primesMin').value) || keystone.random(Math.PI * 10);
	var max = Math.abs(document.getElementById('primesMax').value) || keystone.random(Math.PI * 100);

	var minNmax = [min, max];
	minNmax.sort(keystone.sortAscending);

	min = keystone.round(minNmax[0], "up");
	max = keystone.round(minNmax[1], "down");

	var primes = [];
	for (var i = min; i <= max; i++) {
		if (i >= 2) {
			if (keystone.isPrime(i) === "true") {
				primes.push(i);
			}
		}
	}

	var output;
	for (var i = 0; i < primes.length; i++) {
		if (i > 0) {
			output = output + ", " + primes[i].toString();
		} else {
			output = primes[i].toString();
		}
	}

	document.getElementById('primes').innerHTML = output;
	console.log("Min: " + min);
	console.log("Max: " + max);
};

var convertHour = function() {
	var hourToConvert = document.getElementById('convertedHours').value || keystone.random(365 * 24);

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
};

var timeTill = function() {
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
		var date = document.getElementById('timeTillFuture').value;
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

	document.getElementById('timeTill').innerHTML = converted[0] + converted[1] + converted[2] + converted[3] + converted[4];
};

var mathTrick = function() {
	var num1 = function(total, diff) {
		return (total - diff) / 2;
	};

	var num2 = function(total, diff) {
		return total - ((total - diff) / 2);
	};

	var total = document.getElementById('guessTotal').value || keystone.round(keystone.random(Math.PI * 100));
	var diff = document.getElementById('guessDiff').value || keystone.round(keystone.random((Math.PI * 100) / 2));

	var numbers = [num1(total, diff), num2(total, diff)];

	var guess = "You were thinking of " + numbers[0] + " and " + numbers[1] + ".";

	document.getElementById('guess').innerHTML = guess;
};

var denaryToBinary = function() {
	var n1;
	var n2;
	var n4;
	var n8;

	var n16;
	var n32;
	var n64;
	var n128;

	var n = keystone.round(document.getElementById('binaryNum').value) || keystone.round(keystone.random(255));

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
	}
};

var partitions = function() {
	var exp = function(num) {
		return Math.exp(num);
	};

	var sqrt = function(num) {
		return Math.sqrt(num);
	};

	var num = keystone.round(document.getElementById('partitionsNum').value) || keystone.round(keystone.random(100));

	var part1 = 4 * num * sqrt(3);
	var part2 = Math.PI * sqrt((2 * num) / 3);
	var result = (1 / part1) * exp(part2);

	document.getElementById('partitions').innerHTML = num + " has " + keystone.round(result) + " partitions";
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
	var isDecimal = function(num) {
		if ((num % 1) === 0) {
			return false;
		} else {
			return true;
		}
	};

	var randomArrayLength = document.getElementById('IQRLength').value || keystone.round(keystone.random(15, 10));
	var randomArrayMax = document.getElementById('IQRMax').value || keystone.round(keystone.random(15, 10));

	var array = [];

	for (var i = 0; i < keystone.round(randomArrayLength); i++) {
		array.push(keystone.round(keystone.random(randomArrayMax), "up", 1));
	}

	array.sort(keystone.sortAscending);

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
	console.log(array);
};

var approxSqrt = function() {
	//https://github.com/ErmiyaEskandary/Slither.io-bot/pull/127

	var num = keystone.round(document.getElementById('approxSqrtNum').value) || keystone.round(keystone.random(Math.PI * 100));

	var approximate = keystone.approximateSqrt(num);
	
	var actual = Math.sqrt(num);
	console.log("Actual value " + keystone.round(actual, "nearest", 4));
	
	var percentOff = keystone.round((Math.abs(actual - approximate) / actual) * 100, "nearest", 4);

	document.getElementById('approxSqrt').innerHTML = "The approximate square root of " + num + " is " + keystone.round(approximate, "nearest", 4) + " and it was " + percentOff + "% off the real value";
};

var normalDistribution = function() {
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

	var mean = document.getElementById('normalDFMean').value || keystone.random(Math.PI * 100);
	var sd;
	if ((mean > 0) || (mean < 0)) {
		//The standard deviation must never be a negative number
		sd = Math.abs(document.getElementById('normaldDFSd').value) || keystone.random(Math.abs(mean) / 10);
	} else {
		sd = Math.abs(document.getElementById('normaldDFSd').value) || 1;
	}
	var val = document.getElementById('normalDFVal').value || keystone.random(mean + (sd * 4), mean - (sd * 4));

	var result = keystone.round(calculate(val, mean, sd), "down", 4);

	val = keystone.round(val, "nearest", 2);
	mean = keystone.round(mean, "up", 2);
	//var sdSquared = keystone.round(sd * sd, "nearest", 2);

	document.getElementById('normalDF').innerHTML = "X ~ N(" + mean + ", " + keystone.round(sd, "nearest", 2) + "²) --> P(X < " + val + ") = " + result;
	console.log("Standard Deviation: " + keystone.round(sd, "nearest", 2));
	console.log("P(Z < " + keystone.round((val - mean) / sd, "nearest", 2) + ")");
};

/*
TODO List - 
1. Enhancement {
	a. None
}
2. None
*/