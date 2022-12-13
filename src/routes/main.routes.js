const { Router } = require("express");
const router = Router();
const { findAll, findBYName, updateStatus, deleteCharacter, loadData } = require("../controllers/main.controller");

router.get("/", findAll);
router.get("/load", loadData);
router.get("/query/?", findBYName);
router.put("/query/?", updateStatus);
router.delete("/query/?", deleteCharacter);

module.exports = router;