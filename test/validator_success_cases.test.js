const Validator = require('../validator')
const moment = require('moment')

describe('Test validator', ()=>{
    
    test('should pass when mark require and value is not empty',()=>{
        const ex = new Validator('Kritchat', 'ex').require();
        expect(()=>ex.validate()).not.toThrow()
    })

    test('should pass when mark maxLength and value length is not more than it',()=>{
        const ex = new Validator('Kritchat', 'ex').length(10);
        expect(()=>ex.validate()).not.toThrow()
    })

    test('should pass when value is in list and type is String', ()=>{
        const ex = new Validator('123', 'ex').in(['123','456']);
        expect(()=>ex.validate()).not.toThrow()
    })

    test('should pass when value is in list and type is Number', ()=>{
        const ex = new Validator(123, 'ex').in([123,456]);
        expect(()=>ex.validate()).not.toThrow()
    })

    test('should pass when value is in list and type is boolean', ()=>{
        const ex = new Validator(true, 'ex').in([true]);
        expect(()=>ex.validate()).not.toThrow()
    })

    test('should pass when mark numeric and value type is Number',()=>{
        const ex = new Validator(123, 'ex').numeric()
        expect(()=>ex.validate()).not.toThrow()
    })

    test('should pass when mark numeric and value type is Number in type String',()=>{
        const ex = new Validator('123', 'ex').numeric()
        expect(()=>ex.validate()).not.toThrow()
    })

    test('should pass when mark date and value type is date and format is valid',()=>{
        const ex = new Validator('1993-07-31', 'ex').typeDate('YYYY-MM-DD')
        expect(()=>ex.validate()).not.toThrow()
    })

    test('should pass when mark toDayDate and value is todayDate',()=>{
        const ex = new Validator(moment().format('YYYY-MM-DD'), 'ex').typeDate('YYYY-MM-DD').today()
        expect(()=>ex.validate()).not.toThrow()
    })

})
