/**
 * @preserve JDate: creates a new jalali date object with the current date and time.
 *
 * @version 1.0.0
 * @author Reza Moghaddam
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

function JDate(year, month, date, hours, minutes, seconds, milliseconds) {
    'use strict';
    this.gregorian = 0;
    this.jalali = 0;
    if( arguments.length === 0 ) {
        this.gregorian = new Date();
    }else if( arguments.length === 1 ){
        var ts = JDate.parse(arguments[0]);
        if ( ts > 0 ){
            this.gregorian = new Date(ts);
        }else{
            throw 'Cannot parse date string';
        }
    }else{
        date = date || 1;
        if( new Date(year, month, date).getTime() > 0 ){
            var gd = {year: year,month: month,date: date};
        }else{
            var gd = jalali_to_gregorian(year, month, date);
        }
        this.gregorian = new Date(gd.year, gd.month, gd.date, hours, minutes, seconds, milliseconds);
    }
    this.setJalali();
}

JDate.prototype = {
    getDate: function(){
        return this.jalali.date;
    },
    getDay: function(){
        return this.gregorian.getDay() == 6 ? 0:this.gregorian.getDay()+1;
    },
    getFullYear: function(){
        return this.jalali.year;
    },
    getShortYear: function(){
        return (this.jalali.year >= 1300 && this.jalali.year < 1400) ? parseInt(this.jalali.year.toString().slice(2)) : parseInt(this.jalali.year.toString().slice(1));
    },
    getHours: function(){
        return this.gregorian.getHours();
    },
    getMilliseconds: function(){
        return this.gregorian.getMilliseconds();
    },
    getMinutes: function(){
        return this.gregorian.getMinutes();
    },
    getMonth: function(){
        return this.jalali.month;
    },
    getSeconds: function(){
        return this.gregorian.getSeconds();
    },
    getTime: function(){
        return this.gregorian.getTime();
    },
    getTimezone: function(){
        return this.gregorian.toString().cut('GMT', ' ');
    },
    getTimezoneOffset: function(){
        return this.gregorian.getTimezoneOffset();
    },
    isLeapYear: function(){
        return (this.jalali.year%33%4-1==parseInt(this.jalali.year%33*.05))?1:0;
    },

    setDate: function(date){
        if(date > 0 && date <= 31){
            this.jalali.date = date;
            var gd = jalali_to_gregorian(this.jalali.year, this.jalali.month, this.jalali.date);
            this.gregorian.setFullYear(gd.year, gd.month, gd.date);
            return this.gregorian.getTime();
        }else{
            throw 'Cannot parse date number';
        }
    },
    setMonth: function(month, date){
        if(month >= 0 && month <= 11){
            this.jalali.month = month;
            if( date != undefined ){
                if(date > 0 && date <= 31){
                    this.jalali.date = date;
                }else{
                    throw 'Cannot parse date number';
                }
            }
            var gd = jalali_to_gregorian(this.jalali.year, this.jalali.month, this.jalali.date);
            this.gregorian.setFullYear(gd.year, gd.month, gd.date);
            return this.gregorian.getTime();

        }else{
            throw 'Cannot parse month number';
        }
    },
    setFullYear: function(year, month, date){
        if(year >= 1000 && year <= 9999){
            this.jalali.year = year;
            if( month != undefined ){
                if(month >= 0 && month <= 11){
                    this.jalali.month = month;
                }else{
                    throw 'Cannot parse month number';
                }
            }
            if( date != undefined ){
                if(date > 0 && date <= 31){
                    this.jalali.date = date;
                }else{
                    throw 'Cannot parse date number';
                }
            }
            var gd = jalali_to_gregorian(this.jalali.year, this.jalali.month, this.jalali.date);
            this.gregorian.setFullYear(gd.year, gd.month, gd.date);
            return this.gregorian.getTime();
        }else{
            throw 'Cannot parse year number';
        }
    },
    setHours: function(hours, min, sec, ms){
        if( hours != undefined && min != undefined && sec != undefined && ms != undefined ){
            return this.gregorian.setHours(hours, min, sec, ms);
        }else if( hours != undefined && min != undefined && sec != undefined ){
            return this.gregorian.setHours(hours, min, sec);
        }else if( hours != undefined && min != undefined ){
            return this.gregorian.setHours(hours, min);
        }else{
            return this.gregorian.setHours(hours);
        }
    },
    setMilliseconds: function(ms){
        return this.gregorian.setMilliseconds(ms);
    },
    setMinutes: function(min, sec, ms){
        if( min != undefined && sec != undefined && ms != undefined ){
            return this.gregorian.setMinutes(min, sec, ms);
        }else if( min != undefined && sec != undefined ){
            return this.gregorian.setMinutes(min, sec);
        }else{
            return this.gregorian.setMinutes(min);
        }
    },
    setSeconds: function(sec, ms){
        if( sec != undefined && ms != undefined ){
            return this.gregorian.setSeconds(sec, ms);
        }else{
            return this.gregorian.setSeconds(sec);
        }
    },
    echo: function (format) {
        var
        leapYear = this.isLeapYear(),
        jw = this.getDay(),
        jy = this.getShortYear(),
        jtz = this.getTimezone();

        format = format || "l، d F Y ساعت H:i:s";

        format = format.replace(/a/g, (this.gregorian.getHours()<12)?'ق.ظ':'ب.ظ');
        format = format.replace(/b/g, parseInt((this.jalali.month+1)/3.1));
        format = format.replace(/d/g, withZiro(this.jalali.date));
        format = format.replace(/f/g, jalaliSeasons[parseInt((this.jalali.month+1)/3.1)].long);
        format = format.replace(/g/g, this.gregorian.getHours() <= 12 ? this.gregorian.getHours() : this.gregorian.getHours() - 12);
        format = format.replace(/h/g, this.gregorian.getHours() <= 12 ? withZiro(this.gregorian.getHours()) : withZiro(this.gregorian.getHours() - 12));
        format = format.replace(/i/g, withZiro(this.gregorian.getMinutes()));
        format = format.replace(/j/g, this.jalali.date);
        format = format.replace(/l/g, jalaliWeeks[jw].long);
        format = format.replace(/m/g, withZiro(this.jalali.month+1));
        format = format.replace(/n/g, this.jalali.month+1);
        format = format.replace(/s/g, withZiro(this.gregorian.getSeconds()));
        format = format.replace(/t/g, ((this.jalali.month+1)!=12)?(31-parseInt((this.jalali.month+1)/6.5)):(leapYear+29));
        format = format.replace(/u/g, this.gregorian.getMilliseconds());
        format = format.replace(/v/g, numToPersianStr(jy));
        format = format.replace(/w/g, jw);
        format = format.replace(/y/g, jy);

        format = format.replace(/A/g, (this.gregorian.getHours()<12)?'قبل از ظهر':'بعد از ظهر');
        format = format.replace(/D/g, jalaliWeeks[jw].short);
        format = format.replace(/F/g, jalaliMonths[this.jalali.month].long);
        format = format.replace(/G/g, this.gregorian.getHours());
        format = format.replace(/H/g, withZiro(this.gregorian.getHours()));
        format = format.replace(/J/g, numToPersianStr(this.jalali.date));
        format = format.replace(/L/g, leapYear);
        format = format.replace(/M/g, jalaliMonths[this.jalali.month].short);
        format = format.replace(/O/g, jtz);

        format = format.replace(/V/g, numToPersianStr(this.jalali.year));
        format = format.replace(/Y/g, this.jalali.year);

        return format;
    },
    setJalali: function () {
        this.jalali = gregorian_to_jalali(this.gregorian.getFullYear(), this.gregorian.getMonth(), this.gregorian.getDate());
    },
    toString: function () {
        return this.echo();
    }
};

JDate.parse = function (string) {
    string = trnumToEn(string);
    var dateTime = Date.parse(string);
    if( Number.isNaN(dateTime) ){
        return NaN;
    }else if( dateTime > 0 ){
        return dateTime;
    }else{
        var match = /^(\d|\d\d|\d\d\d\d)(?:([-\/])(\d{1,2})(?:\2(\d|\d\d|\d\d\d\d))?)?(([ T])(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|([+-])(\d{2})(?::?(\d{2}))?)?)?$/.exec(string);
        if (!match) return NaN;
        var date = [];
        date.separator = match[2];
        date.delimiter = match[6];
        date.year = +match[1];
        date.month = +(match[3])-1 || 0;
        date.date = +match[4] || 1;
        date.hours = +match[7] || 0;
        date.minutes = +match[8] || 0;
        date.seconds = +match[9] || 0;
        date.milliSeconds = +('0.' + (match[10] || '0')) * 1000;
        date.isISO = (this.separator != '/') && (match[6] != ' ');
        date.timeZone = match[11];
        date.isNonLocal = this.isISO && (this.timeZone || !match[5]);
        date.timeZoneOffset = (match[12] == '-' ? -1 : 1) * ((+match[13] || 0) * 60 + (+match[14] || 0));

        var gdt = jalali_to_gregorian(date.year, date.month, date.date);
        var gd = new Date(gdt.year, gdt.month, gdt.date, date.hours, date.minutes, date.seconds, date.milliSeconds);
        if (date.isNonLocal) {
            gd.setUTCMinutes(gd.getUTCMinutes() - gd.getTimezoneOffset() + date.timeZoneOffset);
        }
        return gd.getTime();
    }
};

JDate.now = function () {
    Date.now();
};

var
jalaliMonths = [
    {long: "فروردین", short: "فر"}, {long: "اردیبهشت", short: "ار"}, {long: "خرداد", short: "خر"},
    {long: "تیر", short: "تی‍"}, {long: "مرداد", short: "مر"}, {long: "شهریور", short: "شه‍"},
    {long: "مهر", short: "مه‍"}, {long: "آبان", short: "آب‍"}, {long: "آذر", short: "آذر"},
    {long: "دی", short: "دی"}, {long: "بهمن", short: "به‍"}, {long: "اسفند", short: "اس‍"}
],
jalaliSeasons = [{long: "بهار", short: "به‍"}, {long: "تابستان", short: "تا"}, {long: "پاییز", short: "پا"}, {long: "زمستان", short: "زم‍"}],
jalaliWeeks = [{long: "شنبه", short: "شن‍"}, {long: "یکشنبه", short: "یک"}, {long: "دوشنبه", short: "دو"}, {long: "سه‌شنبه", short: "سه"}, {long: "چهارشنبه", short: "چه‍"}, {long: "پنج‌شنبه", short: "پن‍"}, {long: "جمعه", short: "جم‍"}],
jalaliTRWeek = {0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:0};

function jalali_to_gregorian(jy, jm, jd) {
    [jy, jm, jd] = [parseInt(trnumToEn(jy)), parseInt(trnumToEn(jm))+1, parseInt(trnumToEn(jd))];
    var gy = (jy<=979) ? 621 : 1600;
    jy -= (jy<=979) ? 0 : 979;
    var days = (365*jy) + ((parseInt(jy/33))*8) +(parseInt(((jy%33)+3)/4)) + 78 + jd + ((jm<7)?(jm-1)*31:((jm-7)*30)+186);
    gy += 400*(parseInt(days/146097));
    days %= 146097;

    if(days > 36524){
        gy += 100*(parseInt(--days / 36524));
        days %= 36524;
        if(days >= 365) days++;
    }

    gy += 4 * (parseInt((days) / 1461));
    days %= 1461;
    gy += parseInt((days-1)/365);
    if(days > 365) days = (days-1)%365;
    var gd = days + 1;
    var months = [0,31,((gy%4==0 && gy%100!=0) || (gy%400==0))?29:28,31,30,31,30,31,31,30,31,30,31];

    var i = 0;
    for(i in months){
        if(gd<=months[i])break;
        gd -= months[i];
    }
    var gm = parseInt(i)-1;

    return {year:gy,month:gm,date:gd};
}

function gregorian_to_jalali(gy, gm, gd){
    [gy, gm, gd] = [parseInt(trnumToEn(gy)), parseInt(trnumToEn(gm))+1, parseInt(trnumToEn(gd))];
    var g_d_m = [0,31,59,90,120,151,181,212,243,273,304,334];
    var jy = (gy<=1600) ? 0:979;
    gy -= (gy<=1600) ? 621:1600;
    var gy2 = (gm>2) ? (gy+1):gy;
    var days = (365*gy) +(parseInt((gy2+3)/4)) -(parseInt((gy2+99)/100)) +(parseInt((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
    jy += 33*(parseInt(days/12053));
    days %= 12053;
    jy += 4 * (parseInt(days/1461));
    days %= 1461;
    jy += parseInt((days-1)/365);
    if(days > 365)days=(days-1)%365;
    var jm = (days < 186) ? 1 + parseInt(days/31) : 7 + parseInt((days-186)/30);
    var jd = 1+((days < 186)?(days%31):((days-186)%30));
    return {year:jy,month:--jm,date:jd};
}

function numToPersianStr(number, counter){
    counter = counter || false;
    number = parseInt(number);
    var
    yekan = ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"],
    dahgan = ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"],
    dahyek = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"],
    sadgan = ["", "یکصد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"],
    basegan = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];

    if(number == 0) return "صفر";
    if( number.toString().length <= 3 ){
        var stotal = "", d12 = number % 100, d3 = parseInt( number / 100 );

        if (d3 != 0){
            stotal = sadgan[d3] + " و ";
        }

        if ((d12 >= 10) && (d12 <= 19))
        {
            stotal = stotal + dahyek[d12 - 10];
        } else {
            var d2 = parseInt(d12 / 10);
            if (d2 != 0){
                stotal = stotal + dahgan[d2] + " و ";
            }

            var d1 = parseInt(d12 % 10);
            if (d1 != 0){
                stotal = stotal + yekan[d1] + " و ";
            }

            stotal = stotal.slice(0, stotal.length - 3);
        }

    }else{
        var stotal = "",
        padLen = chunkArray(number.toString().split(""), 3);
        padLen = padLen[padLen.length-1].length;
        switch (padLen){
            case 1: padLen = 2;break;
            case 2: padLen = 1;break;
            default: padLen = 0;
        }
        number = number.toString().padStart(number.toString().length+padLen, '0');
        var L = parseInt(number.toString().length / 3 - 1), b = null;
        for (var i = 0; i <= L; i++)
        {
            b = parseInt( number.toString().substr(i * 3, 3) );
            if (b != 0){
                stotal = stotal + numToPersianStr(b) + " " + basegan[L - i] + " و ";
            }
        }
        stotal = stotal.slice(0, - 4);
    }

    stotal = stotal.trim();

    if( !counter ){
        return stotal;
    }else{
        if (number == 1){
            return "اول";
        }else if (number.toString().slice(-1) == 3 && number.toString().slice(-2) != 'ده') {
            return stotal.toString().slice(0, -1) + "وم";
        }else if (number.toString().slice(-2) == 30){
            return stotal + " ام";
        }else{
            return stotal + "م";
        }
    }
}

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        tempArray.push( myArray.slice(index, index+chunk_size) );
    }

    return tempArray;
}

function trnumToFa(str){
    if( typeof str === "number" ) {
        str = str.toString();
    }
    return str.replace(/0/g, "۰")
        .replace(/1/g, "۱")
        .replace(/2/g, "۲")
        .replace(/3/g, "۳")
        .replace(/4/g, "۴")
        .replace(/5/g, "۵")
        .replace(/6/g, "۶")
        .replace(/7/g, "۷")
        .replace(/8/g, "۸")
        .replace(/9/g, "۹");
}

function trnumToEn(str){
    if( typeof str === "number" ) {
        str = str.toString();
    }
    return str.replace(/[۰٠]/g, "0")
        .replace(/[۱١]/g, "1")
        .replace(/[۲٢]/g, "2")
        .replace(/[۳٣]/g, "3")
        .replace(/[۴٤]/g, "4")
        .replace(/[۵٥]/g, "5")
        .replace(/[۶٦]/g, "6")
        .replace(/[۷٧]/g, "7")
        .replace(/[۸٨]/g, "8")
        .replace(/[۹٩]/g, "9");
}

function withZiro(num){
    if(num < 10){
        num = '0' + num;
    }
    return num;
}

String.prototype.cut = function(left, right, withBoth) {
    withBoth = withBoth || false;
    var str = this.slice(this.toLowerCase().indexOf(left.toString().toLowerCase())).substr(left.toString().length);
    var leftLen = str.slice(str.toLowerCase().indexOf(right.toString().toLowerCase())).toString().length;
    leftLen = leftLen ? -(leftLen) : str.toString().length;
    str = str.slice(0, leftLen);

    if( withBoth ){
        str = left + str + right;
    }

    return str;
};
