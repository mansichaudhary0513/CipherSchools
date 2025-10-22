import express from "express";
import { authMiddleware } from "../Controllers/AuthMiddelware.js";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject
} from "../Controllers/ApiController.js";

const router = express.Router();

router.get('/projects', authMiddleware, getProjects);
router.post('/projects', authMiddleware, createProject);
router.get('/projects/:projectId', authMiddleware, getProjectById);
router.put('/projects/:projectId', authMiddleware, updateProject);
router.delete('/projects/:projectId', authMiddleware, deleteProject);

export { router as apiRouter };
