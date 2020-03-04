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

| Character | Description       | Range     | Example |
|-----------|-------------------|-----------|---------|
|     a     | Time to summarize | ق.ظ - ب.ظ |   ق.ظ   |
|           |                   |           |         |


## License

JDate.js is available under the [MIT license](https://opensource.org/licenses/MIT).
