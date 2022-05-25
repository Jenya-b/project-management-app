export interface ProjectByIdRequest {
  id: string;
}

export type ProjectsData = {
  title: string;
  id: string;
  description: string;
  columns?: [
    {
      id: string;
      title: string;
      order: number;
      tasks: [
        {
          id: string;
          title: string;
          order: number;
          done: boolean;
          description: string;
          userId: string;
          files: [
            {
              filename: string;
              fileSize: number;
            }
          ];
        }
      ];
    }
  ];
};
