exports.error = (err) => {
    let message = err.message;

    if (err && err.code === "ConditionalCheckFailedException"){
        message = "Register already exists";
    }
        
    return message;
}