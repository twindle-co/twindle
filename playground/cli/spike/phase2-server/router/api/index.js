const { Router } = require("express");
const { API } = require("../../api");

const router = Router();

router.post("/convert", API.getTwitterThread);

module.exports.apiRouter = router;
