"use server";

import { Session, getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createCompleteStatus(formData: FormData, session: Session) {
  const data = Object.fromEntries(formData);

  console.log("form action is sent");

  let taskData;

  try {
    if (data.id) {
      taskData = {
        id: +data.id,
        task: +data.task,
        html_code: data.html_code,
        css_code: data.css_code,
        completed: true,
      };

      const res = await fetch(`http://localhost:8000/api/tasks-users/${taskData?.id}/`, {
        method: "put",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed updating task");
    } else {
      taskData = {
        task: +data.task,
        html_code: data.html_code,
        css_code: data.css_code,
        completed: true,
      };

      const res = await fetch(`http://localhost:8000/api/tasks-users/`, {
        method: "post",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed submitting task");
    }

    return { message: "Success!", status: "success" };
  } catch (e) {
    return { message: "Failed", status: "failed" };
  }
}
