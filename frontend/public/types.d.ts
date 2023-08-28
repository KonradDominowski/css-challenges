interface Task {
  id: number;
  title: string;
  description: string;
  target: string;
  updated?: string;
  order: number;
  chapter: number;
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
