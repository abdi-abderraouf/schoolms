/* Copyright 2022 Hassan El anabi (al-annabi.tech) */

const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./db");
const Crud = require("./crud");
const PORT = Number(process.env.BACKEND_PORT);
const app = express();

db.connect().then((conn) => {
    console.log(`Connected to db at ${conn.host} port ${conn.port}`);
});

app.use(express.json());

app.post("/api/auth", (req, res) => {
    const receivedUser = req.body;

    try {
	const decodedUser = jwt.verify(receivedUser.token, process.env.JWT_SECRET);
	if (receivedUser.id === decodedUser.id) return res.status(202).end();
	else throw new Error("Received user does match associated token");

    } catch (err) {
	console.error(err);
	return res.status(406).json({ error: "Invalid token" });
    }
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
	return res.status(400).json({ error: "Missing username or password"});
    
    const user = await db.User.findOne({ username });

    if (!user)
	return res.status(406).json({ error: "Username does not exist" });

    if(!(await bcrypt.compare(password, user.passwordHash)))
	return res.status(406).json({ error: "Wrong password" });

    res.json({
	id: user._id,
	username: user.username,
	fullname: user.fullname,
	token: await jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    });
});

app.use("/api/students", new Crud(db.Student, "studentNum"));
app.use("/api/subjects", new Crud(db.Subject, "code"));
app.use("/api/teachers", new Crud(db.Teacher, "_id"));
app.use("/api/classes", new Crud(db.Class, "_id", "teacher"));

app.use((err, req, res, next) => {
    console.error(`${err.name}: ${err.message}`);
    
    if (res.headersSent) {
	return next(err)
    }
    
    if (err.name === "JsonWebTokenError") {
	return res.status(401).json({ error: err.message });
    }

    if (err.name === "ValidationError") {
	return res.status(400).json({ error: err.message });
    }

    if (err.name === "MongoServerError" &&
	err.message.includes("duplicate key error")) {
	return res.status(400).json({ error: "Duplicate Key Error" });
    }
    
    return res.status(500).end();
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
