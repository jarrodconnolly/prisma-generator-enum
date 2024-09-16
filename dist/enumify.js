export class Enumify{static enumKeys;static enumValues;constructor(label){this.label=label}static closeEnum(){const enumKeys=[],enumValues=[],enumDocs=[];for(const[key,value]of Object.entries(this))enumKeys.push(key),value.enumKey=key,value.enumOrdinal=enumValues.length,enumValues.push(value),enumDocs.push(value.label);this.enumKeys=enumKeys,this.enumValues=enumValues,this.enumDocs=enumDocs,Object.freeze(this)}static enumValueOf(str){const index=this.enumKeys.indexOf(str);if(index>=0)return this.enumValues[index]}static[Symbol.iterator](){return this.enumValues[Symbol.iterator]()}static reactSelectOptions(){return this.enumValues.map((value=>({value:value.enumKey,label:value.label})))}enumKey;enumOrdinal;toString(){return this.constructor.name+"."+this.enumKey}}