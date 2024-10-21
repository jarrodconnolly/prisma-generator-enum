/*
Modified version of enumify.js from:
  https://github.com/rauschma/enumify
  Copyright (c) 2020 Axel Rauschmayer
  License: MIT
*/
export class Enumify {
  static keys;
  static enumValues;
  constructor(label) {
    this.label = label;
  }
  static closeEnum() {
    const keys = [];
    const enumValues = [];
    const enumDocs = [];

    for (const [key, value] of Object.entries(this)) {
      keys.push(key);

      value.key = key;
      value.enumOrdinal = enumValues.length;
      enumValues.push(value);
      enumDocs.push(value.label);
    }

    this.keys = keys;
    this.enumValues = enumValues;
    this.enumDocs = enumDocs;
    Object.freeze(this);
  }

  static enumValueOf(str) {
    const index = this.keys.indexOf(str);
    if (index >= 0) {
      return this.enumValues[index];
    }
    return undefined;
  }

  static [Symbol.iterator]() {
    return this.enumValues[Symbol.iterator]();
  }

  static reactSelectOptions() {
    return this.enumValues.map((value) => {
      return { value: value.key, label: value.label };
    });
  }


  key;
  enumOrdinal;

  toString() {
    return this.constructor.name + '.' + this.key;
  }
}
