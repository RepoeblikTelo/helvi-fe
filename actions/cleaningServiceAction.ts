"use server";

import { db } from "@/lib/db";
import { CLEANINGTYPE } from "@prisma/client";

export const getAllCleaningServices = async () => {
  const cleaning_services = await db.cleaningServices.findMany();

  return cleaning_services;
};

export const getAllUserCleaningServices = async (user_id: string) => {
  const cleaning_services = await db.cleaningServices.findMany({
    where: {
      user_id,
    },
  });

  return cleaning_services;
};

export const createNewCleaningService = async (
  address: string,
  description: string,
  customer_contact: string,
  type: CLEANINGTYPE,
  user_id: string,
  cleaning_date: Date
) => {
  try {
    const createCleaningService = await db.cleaningServices.create({
      data: {
        address,
        cleaning_date,
        customer_contact,
        description,
        type,
        user_id,
      },
    });

    return createCleaningService;
  } catch (err) {
    console.log(err);
  }
};

export const updateCleaningServiceStatus = async (id: string) => {
  try {
    await db.cleaningServices.update({
      where: {
        id,
      },
      data: {
        status: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
