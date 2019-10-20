const _ = require('underscore')
const BException = require('./common/BException')
const moment = require('moment')

class Validator {
  constructor(value, key) {
    if(!_.isUndefined(value) && value != null){
      this.value = value.toString()
    }
    this.key = key
    this.required = false
    this.maxLength = 0
    this.valueInList = null
    this.isNumeric = false
    this.isDate = null
    this.dateformat = null
    this.isTodayDate = false
  }

  require() {
    this.require = true
    return this
  }

  length(maxLength) {
    this.maxLength = maxLength
    return this
  }

  in(list) {
    this.valueInList = list
    return this
  }

  numeric() {
    this.isNumeric = true
    return this
  }

  //must be set isDate type before
  today() {
    this.isTodayDate = true
    return this
  }

  typeDate(format){
    this.isDate = true
    this.dateformat = format
    return this
  }

  validate() {
    this.validateRequire()
    this.validateMaxLength()
    this.validateValueInList()
    this.validateNumeric()
    this.validateDate()
    this.validateTodayDate()
  }

  //===================//=================== validate logic ===================//===================
  validateRequire(){
    if (this.isTrue(this.require, true) && _.isEmpty(this.value)) {
      console.log(this.value);
      throw new BException('001', `${this.key} is requried`)
    } 
  }

  validateMaxLength(){
    if (this.isNotEquals(this.maxLength, 0) && this.value.length > this.maxLength) {
      throw new BException('002', `${this.key} is more than ${this.maxLength}`)
    }
  }

  //cases sensitive
  validateValueInList(){
    if(!_.isEmpty(this.valueInList)){
      const result = _.find(this.valueInList, (e)=>{return this.isEquals(e.toString(), this.value)})
      if(_.isUndefined(result)){
        console.log(result);
        throw new BException('002', `${this.key} is not in list`)
      }
    }
  }

  validateNumeric(){
    if(this.isTrue(this.isNumeric)){
      if(Number.isNaN(Number(this.value))){
        throw new BException('002', `${this.key} is not numeric`)
      }
    }
  }

  validateDate(){
    if(this.isTrue(this.isDate)){
      if(new Date(this.value) === "Invalid Date" || isNaN(new Date(this.value))){
        throw new BException('002', `${this.key} is not date`)
      }

      const isValid = moment(this.value, this.dateformat, true).isValid()
      if(!isValid){
        throw new BException('002', `${this.key} is invalid date format`)
      }
    }
  }

  validateTodayDate(){
    if(this.isTrue(this.isDate) && this.isTrue(this.isTodayDate)){
      const rqDate = new Date(this.value)
      const now = new Date()
      console.log(rqDate)
      console.log(now)

      if(rqDate.getDate() != now.getDate() || rqDate.getMonth() != now.getMonth() || rqDate.getFullYear() != now.getFullYear()){
        throw new BException('002', `${this.key} is not today date`)
      }
    }
  }


  //===================//=================== helper ===================//===================

  isEquals(first, second) {
    return _.isEqual(first, second)
  }

  isNotEquals(first, second) {
    return !this.isEquals(first, second)
  }

  isTrue(e){
    return _.isEqual(e, true)
  }

}

module.exports = Validator
