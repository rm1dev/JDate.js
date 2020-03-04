Javascript JDate Class ;)
=====

new JDate()
------
new JDate() creates a new jalali date object with the current date and time:

    var jd = new JDate();
    document.getElementById("example-1").innerHTML = jd;
    
    ~~>    چهارشنبه، 14 اسفند 1398 ساعت 01:43:03
    
new JDate(year, month, ...)
-----
new JDate(year, month, ...) creates a new jalali date object with a specified date and time.
7 numbers specify year, month, day, hour, minute, second, and millisecond (in that order):

    var jd = new JDate(2019, 4, 3, 10, 33, 30, 0);
    document.getElementById("example-3").innerHTML = jd;
    
    ~~>     جمعه، 13 اردیبهشت 1398 ساعت 10:33:30

new JDate(...).echo
-----

    var jd = new JDate(2019, 4, 3, 10, 33, 30, 0);
    document.getElementById("example-5").innerHTML = jd.echo("l، d F Y ساعت H:i:s");
    
    ~~>     جمعه، 13 اردیبهشت 1398 ساعت 10:33:30


