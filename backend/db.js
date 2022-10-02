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

const Subject = mongoose.model("Subject", {
    code: {
	type: String,
	required: true,
	unique: true
    },
    description: String
});

const Teacher = mongoose.model("Teacher", {
    fullname: {
	type: String,
	required: true
    },
    subjects: [String]
});

const Class = mongoose.model("Class", {
    day: {
	type: Number,
	required: true,
	min: 0,
	max: 6
    },
    branch: {
	type: String,
	required: true
    },
    level: {
	type: Number,
	required: true,
	min: 1,
	max: 10
    },
    subject: String,
    timeframe: [Number],
    teacher: {
	type: mongoose.ObjectId,
	ref: "Teacher"
    }
});

module.exports = { connect, close, Class, Student, Subject, Teacher, User };
