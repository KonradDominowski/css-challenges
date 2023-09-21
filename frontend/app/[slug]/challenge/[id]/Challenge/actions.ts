"use server";

import { Session } from "next-auth";
import { revalidateTag } from "next/cache";

// TODO - handle the case where user is not logged in - maybe save the tasks to localstorage or smth
export async function createCompleteStatus(formData: FormData, session: Session | null) {
  const data = Object.fromEntries(formData);

  let taskData;

  if (!session) {
    return { message: "Sign in", status: "notLoggedIn" };
  }

  try {
    if (data.id) {
      taskData = {
        id: +data.id,
        task: +data.task,
        html_code: data.html_code,
        css_code: data.css_code,
        completed: true,
      };

      const res = await fetch(`${process.env.BACKEND_URL}/api/tasks-users/${taskData?.id}/`, {
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

      const res = await fetch(`${process.env.BACKEND_URL}/api/tasks-users/`, {
        method: "post",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed submitting task");
    }

    revalidateTag("userTasks");
    return { message: "Success!", status: "success" };
  } catch (e) {
    return { message: "Failed", status: "failed" };
  }
}
