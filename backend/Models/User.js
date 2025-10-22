import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  id: { type: String, required: true },
  files: { type: mongoose.Schema.Types.Mixed, required: true }
});

projectSchema.index({ userId: 1, id: 1 }, { unique: true });


const User = mongoose.model("User", userSchema);
const Project = mongoose.model('Project', projectSchema);

export { User, Project};