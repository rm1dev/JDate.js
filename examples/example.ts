import '../date.extensions';

// let currentDate = new Date();
// let birthday = new Date(Date.parseJalali("2012-2-27"));
// console.log(`Current date: ${currentDate.echoFa("Y/m/d H:i:s")}`);
// console.log(`birthday: ${birthday.echoFa("Y/m/d")}`);
// console.log(`birthday to gregorian: ${birthday.echo("Y/m/d")}`);

console.log(new Date(Date.parse("2022-01")).echo("v"));
console.log(new Date(Date.parse("2022-01")).echo("J"));
console.log(new Date(Date.parse("2022-01")).echo("V"));