import { getTasks, updateTask, createTask } from '@/app/server/taskService';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
    try {
        const tasks = await getTasks();
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const { id, done } = await request.json();
    const updatedTask = await updateTask(id, done);
    return NextResponse.json({ task: updatedTask }, { status: 200 });
}

export async function POST(request: NextRequest) {
    const { title } = await request.json();
    const newTask = await createTask(title);
    return NextResponse.json({ task: newTask }, { status: 201 });
}

