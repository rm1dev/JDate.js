/**
 * @preserve JDate: creates a new jalali date object with the current date and time.
 *
 * @version 1.0.1
 * @author Reza Moghaddam
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License https://opensource.org/licenses/MIT
 */

const jalaliMonths = [
    {long: "فروردین", short: "فر"}, {long: "اردیبهشت", short: "ار"}, {long: "خرداد", short: "خر"},
    {long: "تیر", short: "تی‍"}, {long: "مرداد", short: "مر"}, {long: "شهریور", short: "شه‍"},
    {long: "مهر", short: "مه‍"}, {long: "آبان", short: "آب‍"}, {long: "آذر", short: "آذر"},
    {long: "دی", short: "دی"}, {long: "بهمن", short: "به‍"}, {long: "اسفند", short: "اس‍"}
],
jalaliSeasons = [{long: "بهار", short: "به‍"}, {long: "تابستان", short: "تا"}, {long: "پاییز", short: "پا"}, {long: "زمستان", short: "زم‍"}],
jalaliWeeks = [{long: "شنبه", short: "شن‍"}, {long: "یکشنبه", short: "یک"}, {long: "دوشنبه", short: "دو"}, {long: "سه‌شنبه", short: "سه"}, {long: "چهارشنبه", short: "چه‍"}, {long: "پنج‌شنبه", short: "پن‍"}, {long: "جمعه", short: "جم‍"}],
jalaliTRWeek = {0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:0};

Date.__proto__.jalaliToGregorian = function(jy, jm, jd) {
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

Date.__proto__.gregorianToJalali = function(gy, gm, gd){
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
}

Date.__proto__.isJalaliLeapYear = function(year){
    year = parseInt(year);
    return (year%33%4-1==parseInt(year%33*.05))?1:0;
}

Date.__proto__.parseJalali = function (string) {
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

        var gdt = Date.jalaliToGregorian(date.year, date.month, date.date);
        var gd = new Date(gdt.year, gdt.month, gdt.date, date.hours, date.minutes, date.seconds, date.milliSeconds);
        if (date.isNonLocal) {
            gd.setUTCMinutes(gd.getUTCMinutes() - gd.getTimezoneOffset() + date.timeZoneOffset);
        }
        return gd.getTime();
    }
}

Date.prototype.setJalali = function(year, month, date, hours, minutes, seconds){
    if( arguments.length > 0 ){
        let gd;
        if( arguments.length == 3 ){
            gd = Date.jalaliToGregorian(year, month, date);
            this.setFullYear(gd.year, gd.month, gd.date);
        }else{
            month = month || 0;
            date = date || 1;
            hours = hours || 0;
            minutes = minutes || 0;
            seconds = seconds || 0;
            gd = Date.jalaliToGregorian(year, month, date);
            const ts = Date.parse(gd.year+"/"+gd.month+"/"+gd.date+" "+hours+":"+minutes+":"+seconds);
            this.setTime(ts);
        }
        
        this.jalali = {year, month, date};
        return this;
    }else{
        return NaN;
    }
}

Date.prototype.jalaliSync = function(){
    this.jalali = Date.gregorianToJalali(this.getFullYear(), this.getMonth(), this.getDate());
}

Date.prototype.getJalaliFullYear = function(){
    this.jalaliSync();
    return this.jalali.year;
}
Date.prototype.getJalaliMonth = function(){
    this.jalaliSync();
    return this.jalali.month;
}
Date.prototype.getJalaliDate = function(){
    this.jalaliSync();
    return this.jalali.date;
}
Date.prototype.getJalaliDay = function(){
    return this.getDay() == 6 ? 0:this.getDay()+1;
}
Date.prototype.getJalaliShortYear = function(){
    const jy = this.getJalaliFullYear();
    return (jy >= 1300 && jy < 1400) ? parseInt(jy.toString().slice(2)) : parseInt(jy.toString().slice(1));
}
Date.prototype.getTimezone = function(){
    return this.toString().cut('GMT', ' ');
}
Date.prototype.isJalaliLeapYear = function(){
    return Date.isJalaliLeapYear(this.getJalaliFullYear());
}

Date.prototype.echoFa = function(format){
    this.jalaliSync();
    const
    jy = this.jalali.year,
    jm = this.jalali.month,
    jd = this.jalali.date,
    jw = jalaliTRWeek[this.getDay()],
    leapYear = Date.isJalaliLeapYear(jy),
    jyShort = (jy >= 1300 && jy < 1400) ? parseInt(jy.toString().slice(2)) : parseInt(jy.toString().slice(1)),
    jtz = this.getTimezone();

    format = format || "l، d F Y ساعت H:i:s";

    format = format.replace(/a/g, (this.getHours()<12)?'ق.ظ':'ب.ظ');
    format = format.replace(/b/g, parseInt((jm+1)/3.1));
    format = format.replace(/d/g, Number.ziroPad(jd));
    format = format.replace(/f/g, jalaliSeasons[parseInt((jm+1)/3.1)].long);
    format = format.replace(/g/g, this.getHours() <= 12 ? this.getHours() : this.getHours() - 12);
    format = format.replace(/h/g, this.getHours() <= 12 ? Number.ziroPad(this.getHours()) : Number.ziroPad(this.getHours() - 12));
    format = format.replace(/i/g, Number.ziroPad(this.getMinutes()));
    format = format.replace(/j/g, jd);
    format = format.replace(/l/g, jalaliWeeks[jw].long);
    format = format.replace(/m/g, Number.ziroPad(jm+1));
    format = format.replace(/n/g, jm+1);
    format = format.replace(/s/g, Number.ziroPad(this.getSeconds()));
    format = format.replace(/t/g, ((jm+1)!=12)?(31-parseInt((jm+1)/6.5)):(leapYear+29));
    format = format.replace(/u/g, this.getMilliseconds());
    format = format.replace(/v/g, numToPersianStr(jyShort));
    format = format.replace(/w/g, jw);
    format = format.replace(/y/g, jyShort);
    
    format = format.replace(/A/g, (this.getHours()<12)?'قبل از ظهر':'بعد از ظهر');
    format = format.replace(/D/g, jalaliWeeks[jw].short);
    format = format.replace(/F/g, jalaliMonths[jm].long);
    format = format.replace(/G/g, this.getHours());
    format = format.replace(/H/g, Number.ziroPad(this.getHours()));
    format = format.replace(/J/g, numToPersianStr(jd));
    format = format.replace(/L/g, leapYear);
    format = format.replace(/M/g, jalaliMonths[jm].short);
    format = format.replace(/O/g, jtz);

    format = format.replace(/V/g, numToPersianStr(jy));
    format = format.replace(/Y/g, jy);

    return format;
}

Date.__proto__.isLeapYear = function(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

Date.prototype.echo = function(format){
    this.jalaliSync();
    const
    gy = this.getFullYear(),
    gm = this.getMonth(),
    gd = this.getDate(),
    gw = this.getDay(),
    leapYear = Date.isLeapYear(gy),
    gyShort = parseInt(gy.toString().slice(2)),
    gtz = this.getTimezone();

    format = format || "Y/m/d - H:i:s";

    format = format.replace(/a/g, (this.getHours()<12)?'AM':'PM');
    format = format.replace(/d/g, Number.ziroPad(gd));
    format = format.replace(/g/g, this.getHours() <= 12 ? this.getHours() : this.getHours() - 12);
    format = format.replace(/h/g, this.getHours() <= 12 ? Number.ziroPad(this.getHours()) : Number.ziroPad(this.getHours() - 12));
    format = format.replace(/i/g, Number.ziroPad(this.getMinutes()));
    format = format.replace(/j/g, gd);
    format = format.replace(/m/g, Number.ziroPad(gm+1));
    format = format.replace(/n/g, gm+1);
    format = format.replace(/s/g, Number.ziroPad(this.getSeconds()));
    format = format.replace(/u/g, this.getMilliseconds());
    format = format.replace(/w/g, gw);
    format = format.replace(/y/g, gyShort);
    
    format = format.replace(/A/g, (this.getHours()<12)?'Before Noon':'After Noon');
    format = format.replace(/G/g, this.getHours());
    format = format.replace(/H/g, Number.ziroPad(this.getHours()));
    format = format.replace(/L/g, leapYear);
    format = format.replace(/O/g, gtz);
    
    // format = format.replace(/b/g, parseInt((gm+1)/3.1));
    // format = format.replace(/f/g, jalaliSeasons[parseInt((gm+1)/3.1)].long);
    // format = format.replace(/l/g, jalaliWeeks[gw].long);
    // format = format.replace(/t/g, ((gm+1)!=12)?(31-parseInt((gm+1)/6.5)):(leapYear+29));
    // format = format.replace(/v/g, numToPersianStr(gyShort));
    // format = format.replace(/D/g, jalaliWeeks[gw].short);
    // format = format.replace(/F/g, jalaliMonths[gm].long);
    // format = format.replace(/J/g, numToPersianStr(gd));
    // format = format.replace(/M/g, jalaliMonths[gm].short);
    // format = format.replace(/V/g, numToPersianStr(gy));
    format = format.replace(/Y/g, gy);

    return format;
}

Number.__proto__.ziroPad = function(num){
    if(num < 10){
        num = '0' + num;
    }
    return num;
}