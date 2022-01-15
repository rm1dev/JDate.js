import '../date.extensions';

let currentDate = new Date();
console.log(`Current date: ${currentDate.echoFa("Y/m/d H:i:s")}`);

let birthday = new Date(Date.parseJalali("1372-2-13"));
birthday.setJalali(1372,1, 13); // OR
birthday.setFullYear(1993,4, 3); // OR

console.log(`birthday: ${birthday.echoFa("Y/m/d")}`);
console.log(`birthday to gregorian: ${birthday.echo("Y/m/d")}`);