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

const Student = mongoose.model("Student", {
    studentNum: {
	type: String,
	required: true,
	unique: true
    },
    fullname: String,
    birthDate: String,
    branch: {
	type: String,
	required: true
    },
    level: {
	type: Number,
	required: true, 
	min: 1,
	max: 10
    }
});

module.exports = { connect, close, Student, User };
