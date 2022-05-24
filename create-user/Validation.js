const {Validator} = require('jsonschema');

class Validation {
    constructor(){
        this.validator = new Validator();
    }
    
    async validate(){
		let schema = this.validator.schemas[this.typeName];
		
		var validation = this.validator.validate(this.payload, schema);
		if(validation.errors.length > 0){
			console.log(validation);
			throw new Error(validation.errors);
		}
		
		Promise.resolve();
	}
}

module.exports = Validation;