<p align="center">
    <img src="https://github.com/moghaddam24/JDate.js/blob/master/examples/logo.png?raw=true"><br/>
    Simple yet flexible Typescript | Javascript jalali date and time for developers
</p>
<p align="center">
    <a href="https://github.com/moghaddam24/JDate.js"><img src="https://img.shields.io/github/v/release/moghaddam24/JDate.js" alt="Downloads"></a>
    <a href="https://ci.appveyor.com/project/moghaddam24/jdate-js"><img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Builds"></a>
    <a href="https://github.com/moghaddam24/JDate.js/issues"><img src="https://img.shields.io/github/issues/moghaddam24/JDate.js" alt="Issues"></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/github/license/moghaddam24/JDate.js" alt="Licence"></a>
</p>

# Typescript | Javascript JDate Class ;)

## Installation
    npm i jdate.js

## Usage
### Typescript
    import 'jdate.js';

    let date = new Date();
    
    console.log("Normal format: " + date.echo("Y/m/d"));
    console.log("Jalali format: " + date.echoFa("Y/m/d"));

### ECMAScript
    require('jdate.js');

    let date = new Date();
    
    console.log("Normal format: " + date.echo("Y/m/d"));
    console.log("Jalali format: " + date.echoFa("Y/m/d"));

### Browser
    <script src="https://cdn.jsdelivr.net/npm/jdate.js"></script>
    <script type="text/javascript">
      (function() {
        var date = new Date();
        console.log("Normal format: " + date.echo("Y/m/d"));
        console.log("Jalali format: " + date.echoFa("Y/m/d"));
      })();
    </script>
    

## new Date()

Now with new Date() creates a new gregorian and jalali date object with the current date and time:

    var date = new Date();
    console.log( date.echoFa() );
    console.log( date.echo() );
    console.log( date );
    
    ~~>    شنبه، 25 دی 1400 - 19:22:22
    ~~>    Saturday January 15 2022 - 19:22:22
    ~~>    Sat Jan 15 2022 19:22:22 GMT+0330 (Iran Standard Time)
    

## new Date(...).echo | echoFa

    var date = new Date(2019, 4, 3, 10, 33, 30, 0);
    console.log( date.echoFa("l، j F Y - H:i:s") );
    console.log( date.echo("l، j F Y - H:i:s") );
    
    ~~>     جمعه، 13 اردیبهشت 1398 - 10:33:30
    ~~>     Friday، 3 May 2019 - 10:33:30

## Format guide
<table width="100%">
    <thead>
    <tr>
        <td width="72">Character</td>
        <td>Description</td>
        <td>Range</td>
        <td>Example</td>
    </tr>
    </thead>
    <tbody>
    <tr><td>a</td><td>Before noon and afternoon</td><td>ق.ظ - ب.ظ</td><td>ق.ظ</td></tr>
    <tr><td>b</td><td>Numeric representation of a season, without leading zeros</td><td>0-3</td><td>1</td></tr>
    <tr><td>d</td><td>Day of the month, 2 digits with leading zeros</td><td>01-31</td><td>13</td></tr>
    <tr><td>f</td><td>Season name</td><td>بهار-زمستان</td><td>بهار</td></tr>
    <tr><td>g</td><td>12-hour format of an hour without leading zeros</td><td>0-12</td><td>11</td></tr>
    <tr><td>h</td><td>12-hour format of an hour with leading zeros</td><td>00-12</td><td>03</td></tr>
    <tr><td>i</td><td>Minutes with leading zeros</td><td>00-59</td><td>13</td></tr>
    <tr><td>j</td><td>Day of the month without leading zeros</td><td>1-31</td><td>4</td></tr>
    <tr><td>l</td><td>A full textual representation of the day of the week</td><td>شنبه-جمعه</td><td>یکشنبه</td></tr>
    <tr><td>m</td><td>Numeric representation of a month, with leading zeros</td><td>01-12</td><td>02</td></tr>
    <tr><td>n</td><td>Numeric representation of a month, without leading zeros</td><td>1-12</td><td>2</td></tr>
    <tr><td>s</td><td>Seconds, with leading zeros</td><td>00-59</td><td>03</td></tr>
    <tr><td>t</td><td>Number of days in the given month</td><td>0-31</td><td>28</td></tr>
    <tr><td>u</td><td>Millisecond</td><td>000000</td><td>28</td></tr>
    <tr><td>v</td><td>Short year display in letters</td><td>یک-نهصد و نود و نه</td><td>نود و هشت | چهارصد و دو</td></tr>
    <tr><td>w</td><td>Numeric representation of the day of the week</td><td>0-6</td><td>6</td></tr>
    <tr><td>y</td><td>A two or three digit representation of a year</td><td>1-999</td><td>98 | 402</td></tr>
    <tr><td>A</td><td>Before noon and afternoon</td><td>بعد از ظهر - قبل از ظهر</td><td>قبل از ظهر</td></tr>
    <tr><td>D</td><td>Persian ordinal suffix for the day of the month, 2 characters</td><td>شن‍ - جم‍</td><td>سه</td></tr>
    <tr><td>F</td><td>A full textual representation of a month</td><td>فروردین - اسفند</td><td>اردیبهشت</td></tr>
    <tr><td>G</td><td>24-hour format of an hour without leading zeros</td><td>0-24</td><td>3</td></tr>
    <tr><td>H</td><td>24-hour format of an hour with leading zeros</td><td>00-24</td><td>03</td></tr>
    <tr><td>J</td><td>Day of the month</td><td>یک-سی و یک</td><td>سیزده</td></tr>
    <tr><td>L</td><td>Whether it’s a leap year</td><td>0-1</td><td>1</td></tr>
    <tr><td>M</td><td>A short textual representation of a month, two letters</td><td>فر-اس‍</td><td>ار</td></tr>
    <tr><td>O</td><td>Difference to Greenwich time (GMT) in hours</td><td>-1200 - +1400</td><td>+0330</td></tr>
    <tr><td>V</td><td>Full year display in letters</td><td>صفر-...</td><td>یک هزار و سیصد و نود و هشت</td></tr>
    <tr><td>Y</td><td>A full numeric representation of a year, 4 digits</td><td>0-...</td><td>1398</td></tr>
    </tbody>
</table>


## Date.parseJalali(...)

You can parse specified shamsi or gregorian date from valid date string to convert it to milliseconds.

    Date.parseJalali("1399");                    ~~> 1584662400000 ~~> 1399/01/01 - 03:30:00
    Date.parseJalali("1399/02");                 ~~> 1587324600000 ~~> 1399/02/01 - 00:00:00
    Date.parseJalali("1399/02/13");              ~~> 1588361400000 ~~> 1399/02/13 - 00:00:00
    Date.parseJalali("1399/02/13 03:14:30");     ~~> 1588373070000 ~~> 1399/02/13 - 03:14:30
    Date.parseJalali("2019/05/03 01:02:03");     ~~> 1556829123000 ~~> 1398/02/13 - 01:02:03
    new Date(
        Date.parseJalali("1993/05/03 03:01:03")
    ).echoFa("Y/m/d - H:i:s")                   ~~> 1372/02/13 - 03:01:03


## Get Jalali Date Methods

These methods can be used for getting information from a date object as a jalali date:
<table width="100%">
    <thead>
    <tr>
        <td>Method</td>
        <td>Description</td>
    </tr>
    </thead>
    <tbody>
    <tr><td>getJalaliDate()</td><td>Get the day as a number (1-31)</td></tr>
    <tr><td>getJalaliDay()</td><td>Get the weekday as a number (0-6)</td></tr>
    <tr><td>getJalaliFullYear()</td><td>Get the year as a four digit number (yyyy)</td></tr>
    <tr><td>getJalaliShortYear()</td><td>Get the year as a two or three digit number (yy | yyy)</td></tr>
    <tr><td>getHours()</td><td>Get the hour (0-23)</td></tr>
    <tr><td>getMilliseconds()</td><td>Get the millisecond (0-999)</td></tr>
    <tr><td>getMinutes()</td><td>Get the minute (0-59)</td></tr>
    <tr><td>getJalaliMonth()</td><td>Get the month as a number (0-11)</td></tr>
    <tr><td>getSeconds()</td><td>Get the second (0-59)</td></tr>
    <tr><td>getTime()</td><td>Get the time (milliseconds)</td></tr>
    <tr><td>getTimezone()</td><td>Difference to Greenwich time (GMT) in hours</td></tr>
    <tr><td>getTimezoneOffset()</td><td>Difference between UTC and Local Time</td></tr>
    <tr><td>isJalaliLeapYear()</td><td>Whether it’s a leap year (0-1)</td></tr>
    </tbody>
</table>

## Set Jalali Date Methods

These methods can be used for set jalali date values (years, months, days, hours, minutes, seconds, milliseconds) for a date object:

<table width="100%">
    <thead>
    <tr>
        <td>Method</td>
        <td>Description</td>
    </tr>
    </thead>
    <tbody>
    <tr><td>setJalali(year, [month, date, hours, minutes, seconds])</td><td>Set jalali date</td></tr>
    <tr><td>setHours(hours, min, sec, ms)</td><td>Set the hour (0-23)</td></tr>
    <tr><td>setMilliseconds(ms)</td><td>Set the milliseconds (0-999)</td></tr>
    <tr><td>setMinutes(min, sec, ms)</td><td>Set the minutes (0-59)</td></tr>
    <tr><td>setSeconds(sec, ms)</td><td>Set the seconds (0-59)</td></tr>
    <tr><td>setTime(ms)</td><td>Set the time (milliseconds)</td></tr>
    </tbody>
</table>

## License

JDate.js is available under the [MIT license](https://opensource.org/licenses/MIT).
