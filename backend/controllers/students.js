const jwt = require("jsonwebtoken");
const router = require("express").Router();
const db = require("../db");

router.use((req, res, next) => {
    const token = req.get("Authentication")?.split(" ")[1];
    
    try {
	jwt.verify(token, process.env.JWT_SECRET);
	next();
    } catch (err) {
	next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
	res.json(await db.Student.find({}));
    } catch (err) {
	next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
	const student = await db.Student.findOne({ studentNum: req.params.id });
	if (student)
	    return res.json(student);
	else
	    return res.status(404).end();
    } catch (err) {
	next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
	await new db.Student(req.body).save();
	res.status(201).end();
    } catch (err) {
	next(err);
    }
});

 router.put("/:id", async (req, res, next) => {
    try {
	return await db.Student
	    .findOneAndReplace({studentNum: req.params.id }, req.body) ?
	    res.end() :
	    res.status(404).end();
    } catch (err) {
	next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
	return await db.Student
	    .findOneAndDelete({ studentNum: req.params.id }) ?
	    res.end():
	    res.status(404).end();
    } catch (err) {
	next(err);
    }
});

module.exports = router;
