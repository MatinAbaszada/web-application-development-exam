"use client";

import { Task } from "@/app/models/task";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import TaskComponent from "@/app/components/taskComponent";

async function updateTask(id: string, done: boolean) {
    console.log(`Updating task with id: ${id} to done: ${done}`);
    const request = await fetch(`/api/tasks/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, done }),
    });
    if (!request.ok) {
        throw new Error('Failed to update task');
    }
    const responseData = await request.json();
    return responseData.task as Task;
}

async function addTask(title: string) {
    console.log('Adding task with title:', title);
    const request = await fetch(`/api/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    });
    console.log('Response from server:', request);
    if (!request.ok) {
        throw new Error('Failed to add task');
    }
    const responseData = await request.json();
    return responseData.task as Task;
}


export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks || []);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const updateTaskMutation = useMutation({
        mutationFn: ({ id, done }: { id: string; done: boolean }) => updateTask(id, done),
        onSuccess: (updatedTask) => {
            setTasks((prevTasks) =>
                prevTasks.map(function (task) {
                    console.log('Checking task:', task.id, 'against updated task id:', updatedTask.id);
                    if (task.id == updatedTask.id) {
                        console.log('Updating task in state:', updatedTask);
                    }
                    return task.id === updatedTask.id ? updatedTask : task;
                })
            );
            console.log('Task updated:', updatedTask);
            console.log('Updated tasks list:', tasks);
        },
    });
    const addTaskMutation = useMutation({
        mutationFn: (title: string) => addTask(title),
        onSuccess: (newTask) => {
            console.log('New task added:', newTask);
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskTitle('');
        },
    });

    return (
        <div className="p-4">
            <h1 className="text-lg font-medium ">Tasks To Do</h1>
            {

                tasks.map(function (task) {
                    if (task.done !== true) {
                        return (
                            <TaskComponent key={task.id} task={task} onSelect={() => updateTaskMutation.mutate({ id: task.id, done: !task.done })} />
                        );
                    }
                })
            }
            <h1 className="text-lg font-medium ">Tasks Done</h1>
            {

                tasks.map(function (task) {
                    if (task.done === true) {
                        return (
                            <TaskComponent key={task.id} task={task} />
                        );
                    }
                })
            }
            <h1 className="text-lg font-medium ">Add New Task</h1>
            <input
                className="border p-2 mb-4 w-full"
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addTaskMutation.mutate(newTaskTitle)}>Add Task</button>
        </div>
    );
}