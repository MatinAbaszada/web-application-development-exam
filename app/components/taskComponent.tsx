"use client";

import { Task } from '../models/task';

export default function TaskComponent({ task, onSelect }: { task: Task; onSelect?: () => void }) {
    return (
        <div onClick={onSelect} style={{ backgroundColor: task.done ? 'lightgray' : 'white' }}
        className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
            <h5 className=" text-2xl font-semibold tracking-tight text-heading leading-8">Task Title</h5>
            <p>{task.title}</p>
            <h5 className=" text-2xl font-semibold tracking-tight text-heading leading-8">Task Done</h5>
            <p>{task.done ? 'Done' : 'Not Done'}</p>
            <h5 className=" text-2xl font-semibold tracking-tight text-heading leading-8">Task Created At</h5>
            <p>{new Date(task.createdAt).toLocaleString()}</p>
            { 
                task.done === false && (
                    <div className="flex items-center align-center cursor-pointer">
                    <label className="mr-2">
                        Mark as Done
                    </label>
                        <input type="checkbox" checked={task.done} readOnly onClick={onSelect} />
                    </div>
                )
            }
        </div>
       
    );
}