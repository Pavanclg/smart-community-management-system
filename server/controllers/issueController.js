const Issue = require("../models/Issue");


// CREATE ISSUE
const createIssue = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            location
        } = req.body;

        const issue = await Issue.create({

            title,
            description,
            category,
            location,

            image: req.file ? req.file.path : "",

            createdBy: req.user.id

        });

        res.status(201).json({
            message: "Issue created successfully",
            issue
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



// GET ALL ISSUES
const getIssues = async (req, res) => {

    try {

        const issues = await Issue.find()
        .populate("createdBy", "name email");

        res.status(200).json(issues);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



// UPDATE ISSUE STATUS
const updateIssueStatus = async (req, res) => {

    try {

        const issue = await Issue.findById(req.params.id);

        if (!issue) {

            return res.status(404).json({
                message: "Issue not found"
            });

        }

        issue.status = req.body.status || issue.status;

        await issue.save();

        res.status(200).json({
            message: "Issue updated successfully",
            issue
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



// DELETE ISSUE
const deleteIssue = async (req, res) => {

    try {

        const issue = await Issue.findById(req.params.id);

        if (!issue) {

            return res.status(404).json({
                message: "Issue not found"
            });

        }

        await Issue.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Issue deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



module.exports = {
    createIssue,
    getIssues,
    updateIssueStatus,
    deleteIssue
};