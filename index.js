import express from "express";
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/Backend", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database Connected"))
.catch((e) => console.log(e));

// Define the Message schema and model
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const Message = mongoose.model("Message", messageSchema);

// Define the Task schema and model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
});
const Task = mongoose.model("Task", taskSchema);

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.json()); // This replaces bodyParser.json()
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set view engine to EJS
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    res.render("logout");
  } else {
    res.render("login");
  }
});

app.get("/add", (req, res) => {
  Message.create({ name: "Aakash", email: "rktaakash@gmail.com" }).then(() => {
    res.send("Nice")
  });
});

app.post("/login", (req, res) => {
  res.cookie("token", "iamin", {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 100),
  });
  res.redirect("/")
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/contact", async (req, res) => {
  const { name, email } = req.body;
  await Message.create({ name: name, email: email });
  res.redirect("/success");
});

// Task CRUD API Endpoints
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.json(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.send('Task deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Starting the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
