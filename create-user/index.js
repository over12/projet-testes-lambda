const {v4: uuidv4} = require('uuid');
const { error } = require('./utils.js');
const {db} = require("./db.js");
const UserSchema = require('./UserSchema.js');

class User extends UserSchema{
    constructor(event){
        super();
        this.event = event;
    }
    
    async create(){
        let response = { statusCode: 200 };
        
        try {
            let id = uuidv4();
            
            this.payload = JSON.parse(this.event.body);
            
            //validate fields
            await this.validate();
            
            const params = {
                TableName: process.env.DB_TABLE,
                Item: Object.assign({
                    id: id,
                }, this.payload),
                ConditionExpression: "attribute_not_exists(#publicAddress)",
                ExpressionAttributeNames: {
                    '#publicAddress': 'publicAddress'
                },
            };
            
            await db.put(params).promise();
            
            response.body = JSON.stringify({
                message: "Successfully created user",
                id: id,
            });
        } catch (err) {            
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: "Failed to create user",
                errorMsg: error(err),
                //errorStack: e.stack,
            });
        }
    
        return response;
    }
    
}

exports.handler = async (event) => {
    const user = new User(event);
    return await user.create();
};