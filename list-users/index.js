const {db} = require("./db.js");
const { error } = require("./utils.js");

class User{
    constructor(event){        
        this.event = event;
    }

    async readAll() {
        let promise = db.scan(this.params).promise();
        let result = await promise;
        let data = result.Items;

        if (result.LastEvaluatedKey) {
            this.params.ExclusiveStartKey = result.LastEvaluatedKey;
            data = data.concat(await this.readAll());
        }

        return data;
    }
    
    async listAll(){
        let response = { statusCode: 200 };
        
        try {
            this.params = {
                TableName: process.env.DB_TABLE
            };

            let data = await this.readAll();

            response.body = JSON.stringify(data);
        } catch (err) {            
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: "Failed to create user",
                errorMsg: error(err)
                //errorStack: e.stack,
            });
        }
    
        return response;
    }
    
}

exports.handler = async (event) => {
    const user = new User(event);
    return await user.listAll();
};