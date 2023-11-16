const express = require("express");
const router = express.Router();
let members = require("../../data/members");

// Get All Members
router.get("/", (req, res) => res.json(members));

// Get Single Member
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const reqMember = members.find((member) => member.id == id);

  if (reqMember) {
    res.json(reqMember);
  } else {
    res.status(400).json({ msg: `No member found with id:${id}` });
  }
});

// Create New Member
router.post("/", (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.status(201).json({ msg: "New Member Created!" });
});

// Update Member
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const reqMember = req.body;
  const doesMemberExist = members.some((member) => member.id === +id);

  if (doesMemberExist) {
    members.forEach((member) => {
      if (member.id == id) {
        member.name = reqMember.name ?? member.name;
        member.email = reqMember.email ?? member.email;
      }
    });
    res.json({ msg: "Member updated!" });
  } else {
    res.status(400).json({ msg: `No member found with id:${id}` });
  }
});

// Delete Member
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const doesMemberExist = members.some((member) => member.id == id);

  if (doesMemberExist) {
    members = members.filter((member) => member.id != id);
    res.json({ msg: "Member deleted!" });
  } else {
    res.status(400).json(`Member not found with id:${id}`);
  }
});

module.exports = router;
