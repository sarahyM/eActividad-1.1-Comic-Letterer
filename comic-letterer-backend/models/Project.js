const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  startDate: { type: Date, required: true },
  deadline: { type: Date, required: true },
  totalPages: { type: Number, required: true },
  completedPages: { type: Number, default: 0 },
  tasks: [{ text: String, completed: Boolean }],
  styleReferences: [{ name: String, imageUrl: String }],
  coverImage: { type: String, required: false },
});

module.exports = mongoose.model("Project", ProjectSchema);
