const express = require('express');
const schema = require('../../models/project_model');

exports.PostAddProject =  async (req, res) => {
    const { Project_name, Project_desc, Project_manager, Project_emp } = req.body;

    if (!Project_name || !Project_desc || !Project_manager || !Project_emp) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newProject = new schema({
            Project_name,
            Project_desc,
            Project_manager,
            Project_emp,
        });

        const savedProject = await newProject.save();

        res.json({ message: 'Project added successfully', project: savedProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}