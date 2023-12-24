const express = require('express');
const schema = require('../../models/project_model');

// Single API to handle different functionalities based on parameters
exports.GetProjects= async (req, res) => {
    const { id } = req.params;

    if (!id) {
        // Get all projects
        const projects = await schema.find();
        return res.json({ projects });
    }

    // Get details about a specific project
    const project = await schema.findById(id);

    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }

    // Check for different parameters and provide corresponding responses
    if (req.query.taskStatus) {
        return res.json({ Task_status: project.Task_status });
    } else if (req.query.status) {
        return res.json({ status: project.status });
    } else if (req.query.deadline) {
        return res.json({ deadline: project.deadline });
    } else if (req.query.statistics) {
        return res.json({ statistics: project.statistics });
    }

    // If no specific parameter is provided, return the project details
    return res.json({ project });
}
