interface File {
  content: string;
  filename: string;
  language: string;
  raw_url: string;
  size: number;
  truncated: boolean;
  type: string;
}

export interface GistResponse {
  comments: number;
  comments_url: string;
  commits_url: string;
  created_at: string;
  description: string;
  files: { [key: string]: File };
  forks: Array;
  forks_url: string;
  git_pull_url: string;
  git_push_url: string;
  history: Array;
  html_url: string;
  id: string;
  node_id: string;
  owner: Object;
  public: boolean;
  truncated: boolean;
  updated_at: string;
  url: string;
  user: Object;
}
