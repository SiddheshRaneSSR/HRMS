const express = require('express');
const schema = require('../../models/project_model');



exports.DeleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await schema.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
