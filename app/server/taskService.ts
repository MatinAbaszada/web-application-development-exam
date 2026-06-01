import { prismaClient } from "@/app/server/db";
import { taskModel } from "@/app/generated/prisma/models";


export async function getTasks(): Promise<taskModel[]> {
    const tasks = await prismaClient.task.findMany();
    return tasks;
}

export async function createTask(title: string): Promise<taskModel> {
    const task = await prismaClient.task.create({
        data: {
            title,
        },
    });
    return task;
}

export async function updateTask(id: string, done: boolean): Promise<taskModel> {
    const task = await prismaClient.task.update({
        where: { id },
        data: { done },
    });
    return task;
}

export async function deleteTask(id: string): Promise<taskModel> {
    const task = await prismaClient.task.delete({
        where: { id },
    });
    return task;
}
