const bcrypt = require("bcrypt");
const db = require("./db");

async function createUser(username, fullname, password) {
    await db.connect();

    if (await db.User.exists({ username })) {
	db.close();
	throw new Error(`Username ${username} already exists`);
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new db.User({ username, fullname, passwordHash });
    await user.save();
    db.close();
    return user;
}

module.exports = createUser;
