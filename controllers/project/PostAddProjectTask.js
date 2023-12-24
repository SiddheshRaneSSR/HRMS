const express = require('express');
const schema = require('../../models/project_model');

// Add task to a project
exports.PostAddProjectTask = async (req, res) => {
    const { id } = req.params;
    const { Task_name, Task_Desc, Task_start_date, Task_end_date } = req.body;

    if (!Task_name || !Task_Desc || !Task_start_date || !Task_end_date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const project = await schema.findById(id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Add the task to the project
        project.tasks.push({
            Task_name,
            Task_Desc,
            Task_start_date,
            Task_end_date,
        });

        await project.save();

        res.json({ message: 'Task added successfully', project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
