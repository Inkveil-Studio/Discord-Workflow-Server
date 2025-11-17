import { Router } from "express";
import fs from "fs";

const router = Router();
const DB = "./src/database/tasks.json";

function load() {
    return JSON.parse(fs.readFileSync(DB, "utf8"));
}

function save(data) {
    fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

router.get("/", (req, res) => {
    res.json(load());
});

router.post("/", (req, res) => {
    const tasks = load();
    const newTask = {
        id: tasks.length + 1,
        text: req.body.text,
        done: false,
        deadline: req.body.deadline || null,
    };
    tasks.push(newTask);
    save(tasks);
    res.json(newTask);
});

router.patch("/:id", (req, res) => {
    const tasks = load();
    const task = tasks.find((t) => t.id === Number(req.params.id));
    if (!task) return res.status(404).json({ error: "Not found" });

    Object.assign(task, req.body);
    save(tasks);
    res.json(task);
});

router.delete("/:id", (req, res) => {
    const tasks = load();
    const newList = tasks.filter((t) => t.id !== Number(req.params.id));
    save(newList);
    res.json({ deleted: true });
});

export default router;
