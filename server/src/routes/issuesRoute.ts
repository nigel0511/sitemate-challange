// import express, { Router, Request, Response, NextFunction } from "express";
// import logger from "../common/logger";
// import CustomError from "../common/customError";
// import DeviceProfileService from "../service/DeviceProfileService";
// const express = require("express");
import express, { Router } from "express";

let issues = [
  { id: 1, title: "Issue 1", description: "Description for Issue 1" },
  { id: 2, title: "Issue 2", description: "Description for Issue 2" },
];

const router: Router = express.Router();

router.get("/", (req, res) => {
  res.json(issues);
});

// GET issue by ID
router.get("/:id", (req, res) => {
  const issue = issues.find((i) => i.id === parseInt(req.params.id));
  if (!issue) res.status(404).send("Issue not found");
  res.json(issue);
});

// POST create a new issue
router.post("/", (req, res) => {
  const newIssue = {
    id: issues.length + 1,
    title: req.body.title,
    description: req.body.description,
  };
  console.log("Created New Issue:", JSON.stringify(newIssue));
  issues.push(newIssue);
  res.status(201).json(newIssue);
});

// PUT update an existing issue
router.put("/:id", (req, res) => {
  const issue = issues.find((i) => i.id === parseInt(req.params.id));
  if (!issue) res.status(404).send("Issue not found");

  issue.title = req.body.title;
  issue.description = req.body.description;
  console.log(`Updated Issue id${req.params.id}:`, JSON.stringify(issue));
  res.json(issue);
});

// DELETE an issue
router.delete("/:id", (req, res) => {
  const issueIndex = issues.findIndex((i) => i.id === parseInt(req.params.id));
  if (issueIndex === -1) res.status(404).send("Issue not found");
  console.log(`Deleted Issue id${req.params.id}`);

  issues.splice(issueIndex, 1);
  res.status(204).send();
});

export default router;
