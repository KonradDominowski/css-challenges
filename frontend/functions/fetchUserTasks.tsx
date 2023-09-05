// Maybe convert it to custom hook
import { useCallback, useState } from "react";

export default function useUserTasks() {
  const [tasksData, setTaskData] = useState<TaskData[]>();
  const [err, setErr] = useState<any>();

  const fetchTasks = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:8000/api/tasks-users/", {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error("Fetching user tasks failed");

      const data = await response.json();
      setTaskData(data);
    } catch (err) {
      console.log(err);
      setErr(err);
    }
  }, []);

  return { fetchTasks, tasksData, err };
}
