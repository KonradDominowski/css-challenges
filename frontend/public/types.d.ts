interface Task {
  id: number;
  title: string;
  description: string;
  target: string;
  updated: string;
  order: number;
  chapter: number;
}

interface Chapter {
  title: string;
  tasks: Task[];
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
