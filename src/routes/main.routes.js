const { Router } = require("express");
const router = Router();
const { findAll, findBYName, updateStatus, deleteCharacter, loadData } = require("../controllers/main.controller");

router.get("/", findAll);
router.get("/load", loadData);
/* router.get("/:name", findBYName);
router.delete("/:id", deleteCharacter);
router.put("/?id=:id&status=:status", updateStatus); */

module.exports = router;