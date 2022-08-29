const mongoose = require("mongoose");

const connect = async () => {
    return (await mongoose.connect(process.env.MONGODB_URI))
	.connection;
};

const close = () => {
    mongoose.connection.close();
};

const User = mongoose.model("User", {
    username: {
	type: String,
	required: true
    },
    fullname: {
	type: String,
	required: true
    },
    passwordHash: {
	type: String,
	required: true
    }
});

module.exports = { connect, close, User };
