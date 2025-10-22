import mongoose from "mongoose";
import { Project } from "../Models/User.js";


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id }).select('_id id').sort({ id: 1 });
    res.json(projects.map(p => ({ id: p._id, name: p.id })));
  } catch {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const createProject = async (req, res) => {
  const { name, files } = req.body;
  if (!name || !files) return res.status(400).json({ error: 'Missing name or files' });
  try {
    const existingProject = await Project.findOne({ userId: req.user._id, id: name });
    if (existingProject) return res.status(409).json({ error: 'Project with this name already exists' });
    const project = new Project({ userId: req.user._id, id: name, files });
    await project.save();
    res.status(201).json({ success: true, id: project._id, name: project.id });
  } catch {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const getProjectById = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findOne({ userId: req.user._id, _id: projectId });
    if (project) res.json({ name: project.id, files: project.files });
    else res.status(404).json({ error: 'Project not found' });
  } catch {
    res.status(500).json({ error: 'Failed to load project' });
  }
};

export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { files } = req.body;
  if (!files) return res.status(400).json({ error: 'Missing files' });
  try {
    const project = await Project.findOneAndUpdate(
      { userId: req.user._id, _id: projectId },
      { files },
      { new: true }
    );
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true, id: project._id, name: project.id });
  } catch {
    res.status(500).json({ error: 'Failed to save project' });
  }
};

export const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const deleted = await Project.findOneAndDelete({ userId: req.user._id, _id: projectId });
    if (deleted) res.json({ success: true });
    else res.status(404).json({ error: 'Project not found' });
  } catch {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
