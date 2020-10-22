const { Router } = require("express");

const router = Router();

router.get("/*", (req, res) => {
 res.send({
  message: "This is the homepage"
 });
});

module.exports.pagesRouter = router;
