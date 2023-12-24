const express = require('express');
const schema = require('../../models/project_model');



// Update project details by ID
exports.PutProjectDetails =  async (req, res) => {
    const { id } = req.params;
    const { Project_name, Project_desc, Project_manager, Project_emp, project_end_date } = req.body;

    if (!Project_name || !Project_desc || !Project_manager || !Project_emp || !project_end_date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedProject = await schema.findByIdAndUpdate(
            id,
            {
                Project_name,
                Project_desc,
                Project_manager,
                Project_emp,
                project_end_date,
            },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

