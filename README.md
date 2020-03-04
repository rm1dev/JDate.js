<p align="center">
    <img src="https://github.com/moghaddam24/JDate.js/blob/master/examples/logo.png?raw=true"><br/>
    Simple yet flexible JavaScript jalali date and time for developers
</p>
<p align="center">
    <a href="https://github.com/moghaddam24/JDate.js"><img src="https://img.shields.io/github/v/release/moghaddam24/JDate.js" alt="Downloads"></a>
    <a href="https://ci.appveyor.com/project/moghaddam24/jdate-js"><img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Builds"></a>
    <a href="https://github.com/moghaddam24/JDate.js/issues"><img src="https://img.shields.io/github/issues/moghaddam24/JDate.js" alt="Issues"></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/github/license/moghaddam24/JDate.js" alt="Licence"></a>
</p>

# Javascript JDate Class ;)

## new JDate()

new JDate() creates a new jalali date object with the current date and time:

    var jd = new JDate();
    document.getElementById("example-1").innerHTML = jd;
    
    ~~>    چهارشنبه، 14 اسفند 1398 ساعت 01:43:03
    
## new JDate(year, month, ...)

new JDate(year, month, ...) creates a new jalali date object with a specified date and time.
7 numbers specify year, month, day, hour, minute, second, and millisecond (in that order):

    var jd = new JDate(2019, 4, 3, 10, 33, 30, 0);
    document.getElementById("example-3").innerHTML = jd;
    
    ~~>     جمعه، 13 اردیبهشت 1398 ساعت 10:33:30

## new JDate(...).echo

    var jd = new JDate(2019, 4, 3, 10, 33, 30, 0);
    document.getElementById("example-5").innerHTML = jd.echo("l، d F Y ساعت H:i:s");
    
    ~~>     جمعه، 13 اردیبهشت 1398 ساعت 10:33:30

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
    <tr><td>a</td><td>زمان به صورت خلاصه</td><td>ق.ظ - ب.ظ</td><td>ق.ظ</td></tr>
    <tr><td>b</td><td>شماره فصل</td><td>0-3</td><td>1</td></tr>
    <tr><td>d</td><td>روز - ۲ رقمی</td><td>01-31</td><td>13</td></tr>
    <tr><td>f</td><td>نام فصل با حروف فارسی</td><td>بهار-زمستان</td><td>بهار</td></tr>
    <tr><td>g</td><td>ساعت به صورت ۱۲ ساعته - عدد صحیح</td><td>0-12</td><td>11</td></tr>
    <tr><td>h</td><td>ساعت به صورت ۱۲ ساعته - دو رقمی</td><td>00-12</td><td>03</td></tr>
    <tr><td>i</td><td>دقیقه - دو رقمی</td><td>00-59</td><td>13</td></tr>
    <tr><td>j</td><td>روز - عدد صحیح</td><td>1-31</td><td>4</td></tr>
    <tr><td>l</td><td>روز هفته - کامل</td><td>شنبه-جمعه</td><td>یکشنبه</td></tr>
    <tr><td>m</td><td>ماه - دو رقمی</td><td>01-12</td><td>02</td></tr>
    <tr><td>n</td><td>ماه - عدد صحیح</td><td>1-12</td><td>2</td></tr>
    <tr><td>s</td><td>ثانیه - دو رقمی</td><td>00-59</td><td>03</td></tr>
    <tr><td>t</td><td>تعداد روز های ماه</td><td>0-31</td><td>28</td></tr>
    <tr><td>u</td><td>میکروثانیه</td><td>000000</td><td>28</td></tr>
    <tr><td>v</td><td>سال به حروف - کوتاه</td><td>یک-نهصد و نود و نه</td><td>نود و هشت | چهارصد و دو</td></tr>
    <tr><td>w</td><td>روز هفته - عددی</td><td>0-6</td><td>6</td></tr>
    <tr><td>y</td><td>سال - عددی کوتاه</td><td>1-999</td><td>98 | 402</td></tr>
    <tr><td>A</td><td>زمان به صورت کامل</td><td>بعد از ظهر - قبل از ظهر</td><td>قبل از ظهر</td></tr>
    <tr><td>D</td><td>روز هفته - خلاصه</td><td>شن‍ - جم‍</td><td>سه</td></tr>
    <tr><td>F</td><td>ماه - کامل</td><td>فروردین - اسفند</td><td>اردیبهشت</td></tr>
    <tr><td>G</td><td>ساعت به صورت ۲۴ ساعته - عدد صحیح</td><td>0-24</td><td>3</td></tr>
    <tr><td>H</td><td>ساعت به صورت ۲۴ ساعته - دو رقمی</td><td>00-24</td><td>03</td></tr>
    <tr><td>J</td><td>روز به حروف</td><td>یک-سی و یک</td><td>سیزده</td></tr>
    <tr><td>L</td><td>سال کبیسه است یا خیر</td><td>0-1</td><td>1</td></tr>
    <tr><td>M</td><td>ماه - خلاصه</td><td>فر-اس‍</td><td>ار</td></tr>
    <tr><td>O</td><td>اختلاف ساعت گرینویچ</td><td>-1200 - +1400</td><td>+0330</td></tr>
    <tr><td>V</td><td>سال به حروف</td><td>صفر-...</td><td>یک هزار و سیصد و نود و هشت</td></tr>
    <tr><td>Y</td><td>سال</td><td>0-...</td><td>1398</td></tr>
    </tbody>
</table>


## License

JDate.js is available under the [MIT license](https://opensource.org/licenses/MIT).
