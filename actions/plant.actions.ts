"use server";

import { revalidatePath } from "next/cache";
import { getUserId } from "./user.actions";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";

export async function getPlants(searchTerm?: string) {
  try {
    const currentUserId = getUserId();

    const whereClause: any = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userPlants = await prisma.plants.findMany({
      where: whereClause,
    });

    return { success: true, userPlants };
  } catch (error) {
    console.error("Error fetching plants:", error);
    throw new Error("Failed to fetch plants");
  }
}

export async function getPlantById(id: string) {
  try {
    return await prisma.plants.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error("Error fetching plant:", error);
    throw new Error("Failed to fetch plant");
  }
}

export async function createPlant(data: Prisma.PlantsCreateInput) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const newPlant = await prisma.plants.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });

    revalidatePath("/plants");

    return newPlant;
  } catch (error) {
    console.error("Error creating plant:", error);
    throw new Error("Failed to create plant");
  }
}

export async function updatePlant(id: number, data: Prisma.PlantsUpdateInput) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;
    const updatedPlant = await prisma.plants.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });

    revalidatePath("/plants");

    // return updatedPlant;
  } catch (error) {
    console.error("Error updating plant:", error);
    throw new Error("Failed to update plant");
  }
}

export async function deletePlant(id: number) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;
    await prisma.plants.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/plants");
  } catch (error) {
    console.error("Error deleting plant:", error);
    throw new Error("Failed to delete plant");
  }
}
