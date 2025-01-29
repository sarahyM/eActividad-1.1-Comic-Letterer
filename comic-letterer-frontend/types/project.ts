export interface ProjectCard {
  _id?: string;
  title: string;
  client: string;
  startDate: Date;
  deadline: Date;
  totalPages: number;
  completedPages: number;
  coverImage?: string;
  tasks: Array<{
    text: string;
    completed: boolean;
  }>;
  styleReferences: Array<{
    name: string;
    imageUrl: string;
  }>;
}
