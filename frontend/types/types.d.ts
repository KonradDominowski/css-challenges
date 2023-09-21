interface Task {
  id: number;
  title: string;
  description: string;
  target: string;
  updated?: string;
  order: number;
  chapter: number;
}

interface TaskData {
  id?: number;
  user?: number;
  task: number;
  html_code: string;
  css_code: string;
  completed: boolean;
}

interface Chapter {
  id: number;
  title: string;
  tasks: Task[];
  order: number;
  topic: number;
}

interface Topic {
  id: number;
  title: string;
  slug: string;
  logo_url: string;
  short_description: string;
  chapters?: Chapter[];
  long_description?: string;
  order?: number;
  is_ready?: boolean;
}

interface Providers {
  github: string;
  google: string;
}
