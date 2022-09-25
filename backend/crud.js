const jwt = require("jsonwebtoken");
const express = require("express")

function Crud(dbModel, key) {
    const router = express.Router();

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
	    res.json(await dbModel.find({}));
	} catch (err) {
	    next(err);
	}
    });

    router.get("/:id", async (req, res, next) => {
	try {
	    const resource = await dbModel.findOne({ [key]: req.params.id });
	    if (resource)
		return res.json(resource);
	    else
		return res.status(404).end();
	} catch (err) {
	    next(err);
	}
    });

    router.post("/", async (req, res, next) => {
	try {
	    await new dbModel(req.body).save();
	    res.status(201).end();
	} catch (err) {
	    next(err);
	}
    });

    router.put("/:id", async (req, res, next) => {
	try {
	    return await dbModel
		.findOneAndReplace({[key]: req.params.id }, req.body) ?
		res.end() :
		res.status(404).end();
	} catch (err) {
	    next(err);
	}
    });

    router.delete("/:id", async (req, res, next) => {
	try {
	    return await dbModel
		.findOneAndDelete({ [key]: req.params.id }) ?
		res.end():
		res.status(404).end();
	} catch (err) {
	    next(err);
	}
    });

    return router;
}

module.exports = Crud;
