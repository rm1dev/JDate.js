/**
 * Jalali date for typescript | javascript
 *
 * @author Reza Moghaddam [moghaddam24.ir] @moghaddam24
 * @version 2.1.5
 */
interface Date {
    echo(format?: string): string;
    echoFa(format?: string): string;
    jalali: {
        year: number;
        month: number;
        date: number;
    };
    isLeapYear(year: number): number;
    isJalaliLeapYear(): number;
    getTimezone(): string;
    getJalaliShortYear(): number;
    getJalaliDay(): number;
    getJalaliDate(): number;
    getJalaliMonth(): number;
    getJalaliFullYear(): number;
    jalaliSync(): void;
    setJalali(year: number, month?: number, date?: number, hours?: number, minutes?: number, seconds?: number): Date | number;
}
interface DateConstructor {
    isLeapYear(year: number): number;
    isJalaliLeapYear(year: number | string): number;
    gregorianToJalali(gy: number, gm: number, gd: number): {
        year: number;
        month: number;
        date: number;
    };
    jalaliToGregorian(jy: number, jm: number, jd: number): {
        year: number;
        month: number;
        date: number;
    };
    parseJalali(string: string): number;
    realWeekNumber(string: string | number): number;
}
interface NumberConstructor {
    ziroPad(number: number): string;
    toEnglishWords(number: number | string): string;
    toPersianWords(number: number | string): string;
}
interface Number {
    ziroPad(): string;
}
interface String {
    cut(left: string, right: string, withBoth?: boolean): string;
    trnumToFa(): string;
    trnumToEn(): string;
}
interface ArrayConstructor {
    chunk(myArray: any, chunk_size: any): any;
}
interface StringConstructor {
    trnumToFa(str: string | number): string;
    trnumToEn(str: string | number): string;
}
declare const jalaliMonths: {
    long: string;
    short: string;
}[], jalaliSeasons: {
    long: string;
    short: string;
}[], jalaliWeeks: {
    long: string;
    short: string;
}[], monthNames: {
    long: string;
    short: string;
}[], seasonNames: {
    long: string;
    short: string;
}[], weekNames: {
    long: string;
    short: string;
}[];
declare function jdEncodeVars(str: string): string;
