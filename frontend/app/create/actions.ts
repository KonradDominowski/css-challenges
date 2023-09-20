"use server";

import { revalidatePath } from "next/cache";

export default async function createTask(formData: FormData) {
  const data = Object.fromEntries(formData);
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/tasks/`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error();
    revalidatePath("/create");
    const resData = await response.json();

    return { message: "Success!", status: "success", taskID: resData.id };
  } catch (e) {
    return { message: "Failed", status: "failed" };
  }
}
