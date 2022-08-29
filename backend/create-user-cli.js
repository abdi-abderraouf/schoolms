const minimist = require("minimist");
const createUser = require("./create-user");
const { username, fullname, password }  = minimist(process.argv.slice(2));

createUser(username, fullname, password)
    .then(res => {
	console.log("User created");
	console.log(res);
    })
    .catch(err => {
	console.error(err);
    });
