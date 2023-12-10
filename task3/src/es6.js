"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    let [lastName, firstName] = fio.split(' ');
    return `${firstName} ${lastName}`;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return Array.from(new Set(array));
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    if (!array.length) return false;
    else {
        return Math.max.apply(null, array) / Math.min.apply(null, array);
    }
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {

    constructor() {
        this.map = new Map();
    }

    get(tag) {
        if (typeof tag === 'string' && this.map.has(tag))
            return this.map.get(tag);
        else return false;
    }

    set(tag, val) {
        if (typeof tag === 'string' && typeof val === 'string') {
            this.map.set(tag, val);
        } else return false;
    }

    showSelectedWord(tag) {
        if (typeof tag === 'string') {
            if (this.map.has(tag)) console.log(tag + ' ' + this.get(tag));
            else return false;
        } else return false;
    }

    remove(tag) {
        if (typeof tag === 'string') {
            if (this.map.has(tag)) {
                this.map.delete(tag);
                return true;
            } else return false;
        } else return false;
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};
