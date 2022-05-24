const Validation = require('./Validation.js');

class UserSchema extends Validation{

    constructor(){
        super();
        
        const schema = {
			"id": "/Users",
			"type": "object",
			"properties": {
				"name": {"type": "string"},
				"birthday": {"type": "date"},
				"publicAddress": {"type": "string"},
			},
			"required": ["name", "publicAddress"],
			"additionalProperties": false
		}
        
        this.typeName = '/Users';
		this.validator.addSchema(schema, this.typeName);
    }
}

module.exports = UserSchema;