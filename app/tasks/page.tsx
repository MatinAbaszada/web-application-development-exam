
import { getTasks } from "@/app/server/taskService";
import TaskList from "../components/taskList";

export default async function TasksPage() {
    const tasks = await getTasks();
    console.log('Fetched tasks:', tasks);
    
    const taskFormatted = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        done: task.done,
        createdAt: task.createdAt.toISOString(),
    }));
    return (
        <TaskList initialTasks={taskFormatted} />
    );
}