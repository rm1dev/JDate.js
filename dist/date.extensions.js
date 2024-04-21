"use strict";
/**
 * Jalali date for typescript | javascript
 *
 * @author Reza Moghaddam [moghaddam24.ir] @moghaddam24
 * @version 2.1.0
 */
String.prototype.cut = function (left, right, withBoth) {
    if (withBoth === void 0) { withBoth = false; }
    var str = this.slice(this.toLowerCase().indexOf(left.toString().toLowerCase())).substr(left.toString().length);
    var leftLen = str.slice(str.toLowerCase().indexOf(right.toString().toLowerCase())).toString().length;
    leftLen = leftLen ? -(leftLen) : str.toString().length;
    str = str.slice(0, leftLen);
    if (withBoth) {
        str = left + str + right;
    }
    return str;
};
String.prototype.trnumToFa = function () {
    return String.trnumToFa(this);
};
String.prototype.trnumToEn = function () {
    return String.trnumToEn(this);
};
String.trnumToFa = function (str) {
    if (typeof str === "number") {
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
};
String.trnumToEn = function (str) {
    if (typeof str === "number") {
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
};
var jalaliMonths = [
    { long: "فروردین", short: "فر" }, { long: "اردیبهشت", short: "ار" }, { long: "خرداد", short: "خر" },
    { long: "تیر", short: "تی‍" }, { long: "مرداد", short: "مر" }, { long: "شهریور", short: "شه‍" },
    { long: "مهر", short: "مه‍" }, { long: "آبان", short: "آب‍" }, { long: "آذر", short: "آذر" },
    { long: "دی", short: "دی" }, { long: "بهمن", short: "به‍" }, { long: "اسفند", short: "اس‍" }
], jalaliSeasons = [{ long: "بهار", short: "به‍" }, { long: "تابستان", short: "تا" }, { long: "پاییز", short: "پا" }, { long: "زمستان", short: "زم‍" }], jalaliWeeks = [{ long: "شنبه", short: "شن‍" }, { long: "یکشنبه", short: "یک" }, { long: "دوشنبه", short: "دو" }, { long: "سه‌شنبه", short: "سه" }, { long: "چهارشنبه", short: "چه‍" }, { long: "پنج‌شنبه", short: "پن‍" }, { long: "جمعه", short: "جم‍" }], monthNames = [{ long: "January", short: "Jan" }, { long: "February", short: "Feb" }, { long: "March", short: "Mar" }, { long: "April", short: "Apr" }, { long: "May", short: "May" }, { long: "June", short: "Jun" }, { long: "July", short: "Jul" }, { long: "August", short: "Aug" }, { long: "September", short: "Sep" }, { long: "October", short: "Oct" }, { long: "November", short: "Nov" }, { long: "December", short: "Dec" }], seasonNames = [{ long: "Spring", short: "Spr" }, { long: "Summer", short: "Sum" }, { long: "Fall", short: "Fal" }, { long: "Winter", short: "Win" }], weekNames = [{ long: "Sunday", short: "Sun" }, { long: "Monday", short: "Mon" }, { long: "Tuesday", short: "Tue" }, { long: "Wednesday", short: "Wed" }, { long: "Thursday", short: "Thu" }, { long: "Friday", short: "Fri" }, { long: "Saturday", short: "Sat" }];
Date.jalaliToGregorian = function (jy, jm, jd) {
    var _a;
    _a = [parseInt(String.trnumToEn(jy)), parseInt(String.trnumToEn(jm)) + 1, parseInt(String.trnumToEn(jd))], jy = _a[0], jm = _a[1], jd = _a[2];
    var gy = (jy <= 979) ? 621 : 1600;
    jy -= (jy <= 979) ? 0 : 979;
    var days = (365 * jy) + ((Math.trunc(jy / 33)) * 8) + (Math.trunc(((jy % 33) + 3) / 4)) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * (Math.trunc(days / 146097));
    days %= 146097;
    if (days > 36524) {
        gy += 100 * (Math.trunc(--days / 36524));
        days %= 36524;
        if (days >= 365)
            days++;
    }
    gy += 4 * (Math.trunc((days) / 1461));
    days %= 1461;
    gy += Math.trunc((days - 1) / 365);
    if (days > 365)
        days = (days - 1) % 365;
    var gd = days + 1;
    var months = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var i;
    for (i in months) {
        if (gd <= months[i])
            break;
        gd -= months[i];
    }
    var gm = parseInt(i) - 1;
    return { year: gy, month: gm, date: gd };
};
Date.gregorianToJalali = function (gy, gm, gd) {
    var _a;
    _a = [parseInt(String.trnumToEn(gy)), parseInt(String.trnumToEn(gm)) + 1, parseInt(String.trnumToEn(gd))], gy = _a[0], gm = _a[1], gd = _a[2];
    var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var jy = (gy <= 1600) ? 0 : 979;
    gy -= (gy <= 1600) ? 621 : 1600;
    var gy2 = (gm > 2) ? (gy + 1) : gy;
    var days = (365 * gy) + (Math.trunc((gy2 + 3) / 4)) - (Math.trunc((gy2 + 99) / 100)) + (Math.trunc((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * (Math.trunc(days / 12053));
    days %= 12053;
    jy += 4 * (Math.trunc(days / 1461));
    days %= 1461;
    jy += Math.trunc((days - 1) / 365);
    if (days > 365)
        days = (days - 1) % 365;
    var jm = (days < 186) ? 1 + Math.trunc(days / 31) : 7 + Math.trunc((days - 186) / 30);
    var jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return { year: jy, month: --jm, date: jd };
};
Date.parseJalali = function (string) {
    string = string.trnumToEn();
    var dateTime = Date.parse(string);
    if (Number.isNaN(dateTime)) {
        return NaN;
    }
    else if (dateTime > 0) {
        return dateTime;
    }
    else {
        var match = /^(\d|\d\d|\d\d\d\d)(?:([-\/])(\d{1,2})(?:\2(\d|\d\d|\d\d\d\d))?)?(([ T])(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|([+-])(\d{2})(?::?(\d{2}))?)?)?$/.exec(string);
        if (!match)
            return NaN;
        var date = [];
        date.separator = match[2];
        date.delimiter = match[6];
        date.year = +match[1];
        date.month = +(match[3]) - 1 || 0;
        date.date = +match[4] || 1;
        date.hours = +match[7] || 0;
        date.minutes = +match[8] || 0;
        date.seconds = +match[9] || 0;
        date.milliSeconds = +('0.' + (match[10] || '0')) * 1000;
        date.isISO = (date.separator != '/') && (date.delimiter != ' ');
        date.timeZone = match[11];
        date.isNonLocal = date.isISO && (date.timeZone || !match[5]);
        date.timeZoneOffset = (match[12] == '-' ? -1 : 1) * ((+match[13] || 0) * 60 + (+match[14] || 0));
        var gdt = Date.jalaliToGregorian(date.year, date.month, date.date);
        var gd = new Date(gdt.year, gdt.month, gdt.date, date.hours, date.minutes, date.seconds, date.milliSeconds);
        if (date.isNonLocal) {
            gd.setUTCMinutes(gd.getUTCMinutes() - gd.getTimezoneOffset() + date.timeZoneOffset);
        }
        return gd.getTime();
    }
};
Date.realWeekNumber = function (week) {
    week = parseInt(week);
    return week == 6 ? 0 : week + 1;
};
Date.isLeapYear = function (year) {
    return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 1 : 0;
};
Date.isJalaliLeapYear = function (year) {
    var yn = typeof year == "number" ? year : parseInt(year);
    return (yn % 33 % 4 - 1 == Math.floor(yn % 33 * .05)) ? 1 : 0;
};
Date.prototype.setJalali = function (year, month, date, hours, minutes, seconds) {
    if (arguments.length > 0) {
        var gd = void 0;
        if (arguments.length == 3) {
            gd = Date.jalaliToGregorian(year, month, date);
            this.setFullYear(gd.year, gd.month, gd.date);
        }
        else {
            month = month || 0;
            date = date || 1;
            hours = hours || 0;
            minutes = minutes || 0;
            seconds = seconds || 0;
            gd = Date.jalaliToGregorian(year, month, date);
            var ts = Date.parse(gd.year + "/" + (gd.month + 1) + "/" + gd.date + " " + hours + ":" + minutes + ":" + seconds);
            this.setTime(ts);
        }
        this.jalali = { year: year, month: month, date: date };
        return this;
    }
    else {
        return NaN;
    }
};
Date.prototype.jalaliSync = function () {
    this.jalali = Date.gregorianToJalali(this.getFullYear(), this.getMonth(), this.getDate());
};
Date.prototype.getJalaliFullYear = function () {
    this.jalaliSync();
    return this.jalali.year;
};
Date.prototype.getJalaliMonth = function () {
    this.jalaliSync();
    return this.jalali.month;
};
Date.prototype.getJalaliDate = function () {
    this.jalaliSync();
    return this.jalali.date;
};
Date.prototype.getJalaliDay = function () {
    return this.getDay;
};
Date.prototype.getJalaliShortYear = function () {
    var jy = this.getJalaliFullYear();
    return (jy >= 1300 && jy < 1400) ? parseInt(jy.toString().slice(2)) : parseInt(jy.toString().slice(1));
};
Date.prototype.getTimezone = function () {
    return this.toString().cut('GMT', ' ');
};
Date.prototype.isJalaliLeapYear = function () {
    return Date.isJalaliLeapYear(this.getJalaliFullYear());
};
Date.prototype.realWeekNumber = function () {
    return Date.realWeekNumber(this.getDay());
};
Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
};
Date.prototype.echoFa = function (format) {
    this.jalaliSync();
    var jy = this.jalali.year, jm = this.jalali.month, jd = this.jalali.date, jw = this.getJalaliDay(), leapYear = Date.isJalaliLeapYear(jy), jyShort = (jy >= 1300 && jy < 1400) ? parseInt(jy.toString().slice(2)) : parseInt(jy.toString().slice(1)), jtz = this.getTimezone();
    format = format || "l، j F Y - H:i:s";
    format = jdEncodeVars(format);
    format = format.replace(/{a}/g, (this.getHours() < 12) ? 'ق.ظ' : 'ب.ظ');
    format = format.replace(/{b}/g, String(Math.trunc((jm + 1) / 3.1)));
    format = format.replace(/{d}/g, Number.ziroPad(jd));
    format = format.replace(/{f}/g, jalaliSeasons[Math.trunc((jm + 1) / 3.1)].long);
    format = format.replace(/{g}/g, String(this.getHours() <= 12 ? this.getHours() : this.getHours() - 12));
    format = format.replace(/{h}/g, this.getHours() <= 12 ? Number.ziroPad(this.getHours()) : Number.ziroPad(this.getHours() - 12));
    format = format.replace(/{i}/g, Number.ziroPad(this.getMinutes()));
    format = format.replace(/{j}/g, String(jd));
    format = format.replace(/{l}/g, jalaliWeeks[jw].long);
    format = format.replace(/{m}/g, Number.ziroPad(jm + 1));
    format = format.replace(/{n}/g, String(jm + 1));
    format = format.replace(/{s}/g, Number.ziroPad(this.getSeconds()));
    format = format.replace(/{t}/g, String(((jm + 1) != 12) ? (31 - Math.trunc((jm + 1) / 6.5)) : (leapYear + 29)));
    format = format.replace(/{u}/g, String(this.getMilliseconds()));
    format = format.replace(/{v}/g, Number.toPersianWords(jyShort));
    format = format.replace(/{w}/g, String(Date.realWeekNumber(jw)));
    format = format.replace(/{y}/g, String(jyShort));
    format = format.replace(/{A}/g, (this.getHours() < 12) ? 'قبل از ظهر' : 'بعد از ظهر');
    format = format.replace(/{D}/g, jalaliWeeks[jw].short);
    format = format.replace(/{F}/g, jalaliMonths[jm].long);
    format = format.replace(/{G}/g, String(this.getHours()));
    format = format.replace(/{H}/g, Number.ziroPad(this.getHours()));
    format = format.replace(/{J}/g, Number.toPersianWords(jd));
    format = format.replace(/{L}/g, String(leapYear));
    format = format.replace(/{M}/g, jalaliMonths[jm].short);
    format = format.replace(/{O}/g, jtz);
    format = format.replace(/{V}/g, Number.toPersianWords(jy));
    format = format.replace(/{W}/g, String(jw));
    format = format.replace(/{Y}/g, String(jy));
    format = format.replace(/[{,}]/g, '');
    return format;
};
Date.prototype.echo = function (format) {
    this.jalaliSync();
    var gy = this.getFullYear(), gm = this.getMonth(), gd = this.getDate(), gw = this.getDay(), leapYear = Date.isLeapYear(gy), gyShort = parseInt(gy.toString().slice(2)), gtz = this.getTimezone();
    format = format || "l, F j, Y - H:i:s";
    format = jdEncodeVars(format);
    format = format.replace(/{a}/g, (this.getHours() < 12) ? 'AM' : 'PM');
    format = format.replace(/{b}/g, String(Math.trunc((gm + 1) / 3.1)));
    format = format.replace(/{d}/g, Number.ziroPad(gd));
    format = format.replace(/{f}/g, seasonNames[Math.trunc((gm + 1) / 3.1)].long);
    format = format.replace(/{g}/g, String(this.getHours() <= 12 ? this.getHours() : this.getHours() - 12));
    format = format.replace(/{h}/g, this.getHours() <= 12 ? Number.ziroPad(this.getHours()) : Number.ziroPad(this.getHours() - 12));
    format = format.replace(/{i}/g, Number.ziroPad(this.getMinutes()));
    format = format.replace(/{j}/g, String(gd));
    format = format.replace(/{l}/g, weekNames[gw].long);
    format = format.replace(/{m}/g, Number.ziroPad(gm + 1));
    format = format.replace(/{n}/g, String(gm + 1));
    format = format.replace(/{s}/g, Number.ziroPad(this.getSeconds()));
    format = format.replace(/{t}/g, String(new Date(gy, gm + 1, 0).getDate()));
    format = format.replace(/{u}/g, String(this.getMilliseconds()));
    format = format.replace(/{v}/g, Number.toEnglishWords(gyShort));
    format = format.replace(/{w}/g, String(Date.realWeekNumber(gw)));
    format = format.replace(/{y}/g, String(gyShort));
    format = format.replace(/{A}/g, (this.getHours() < 12) ? 'Before Noon' : 'After Noon');
    format = format.replace(/{D}/g, weekNames[gw].short);
    format = format.replace(/{F}/g, monthNames[gm].long);
    format = format.replace(/{G}/g, String(this.getHours()));
    format = format.replace(/{H}/g, Number.ziroPad(this.getHours()));
    format = format.replace(/{J}/g, Number.toEnglishWords(gd));
    format = format.replace(/{L}/g, String(leapYear));
    format = format.replace(/{M}/g, monthNames[gm].short);
    format = format.replace(/{O}/g, gtz);
    format = format.replace(/{V}/g, Number.toEnglishWords(gy));
    format = format.replace(/{W}/g, String(gw));
    format = format.replace(/{Y}/g, String(gy));
    format = format.replace(/[{,}]/g, '');
    return format;
};
function jdEncodeVars(str) {
    var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var _i = 0, chars_1 = chars; _i < chars_1.length; _i++) {
        var ch = chars_1[_i];
        str = str.replace(new RegExp(ch, 'g'), "{" + ch + "}");
    }
    return str;
}
Number.ziroPad = function (num) {
    var str = "";
    if (num < 10)
        str = '0' + num;
    else
        str = num.toString();
    return str;
};
Number.prototype.ziroPad = function () {
    return Number.ziroPad(this);
};
Number.toEnglishWords = function (number) {
    number = typeof number == "number" ? number : parseInt(number);
    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '], b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if ((number = number.toString()).length <= 9) {
        var n = ('000000000' + number).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (n) {
            var str = '';
            str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
            str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
            str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
            str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
            str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
            return str.substring(0, 1).toUpperCase() + str.substring(1);
        }
        else {
            return String(number);
        }
    }
    else {
        return String(number);
    }
};
Number.toPersianWords = function (number, counter) {
    if (counter === void 0) { counter = false; }
    number = typeof number == "number" ? number : parseInt(number);
    var yekan = ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"], dahgan = ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"], dahyek = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"], sadgan = ["", "یکصد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"], basegan = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];
    if (number == 0)
        return "صفر";
    var stotal = "";
    if (number.toString().length <= 3) {
        var d12 = number % 100, d3 = Math.trunc(number / 100);
        if (d3 != 0) {
            stotal = sadgan[d3] + " و ";
        }
        if ((d12 >= 10) && (d12 <= 19)) {
            stotal = stotal + dahyek[d12 - 10];
        }
        else {
            var d2 = Math.trunc(d12 / 10);
            if (d2 != 0) {
                stotal = stotal + dahgan[d2] + " و ";
            }
            var d1 = Math.trunc(d12 % 10);
            if (d1 != 0) {
                stotal = stotal + yekan[d1] + " و ";
            }
            stotal = stotal.slice(0, stotal.length - 3);
        }
    }
    else {
        var padLen = Array.chunk(number.toString().split(""), 3);
        padLen = padLen[padLen.length - 1].length;
        switch (padLen) {
            case 1:
                padLen = 2;
                break;
            case 2:
                padLen = 1;
                break;
            default: padLen = 0;
        }
        number = number.toString().padStart(number.toString().length + padLen, '0');
        var L = Math.trunc(number.toString().length / 3 - 1), b = null;
        for (var i = 0; i <= L; i++) {
            b = parseInt(number.toString().substr(i * 3, 3));
            if (b != 0) {
                stotal = stotal + Number.toPersianWords(b) + " " + basegan[L - i] + " و ";
            }
        }
        stotal = stotal.slice(0, -4);
    }
    stotal = stotal.trim();
    if (!counter) {
        return stotal;
    }
    else {
        if (number == 1) {
            return "اول";
        }
        else if (("" + number).slice(-1) == "3" && number.toString().slice(-2) != 'ده') {
            return stotal.toString().slice(0, -1) + "وم";
        }
        else if (("" + number).slice(-2) == "30") {
            return stotal + " ام";
        }
        else {
            return stotal + "م";
        }
    }
};
/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
Array.chunk = function (myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
        tempArray.push(myArray.slice(index, index + chunk_size));
    }
    return tempArray;
};
