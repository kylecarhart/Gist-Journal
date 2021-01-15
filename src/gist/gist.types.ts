interface File {
  content?: string;
  filename: string;
  language: string;
  raw_url: string;
  size: number;
  truncated: boolean;
  type: string;
}

interface User {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

interface History {
  change_status: {
    total: number;
    additions: number;
    deletions: number;
  };
  committed_at: string;
  url: string;
  user: User;
  version: string;
}

export interface Gist {
  comments: number;
  comments_url: string;
  commits_url: string;
  created_at: string;
  description: string;
  files: { [key: string]: File };
  forks: string[];
  forks_url: string;
  git_pull_url: string;
  git_push_url: string;
  history: History[];
  html_url: string;
  id: string;
  node_id: string;
  owner: User;
  public: boolean;
  truncated: boolean;
  updated_at: string;
  url: string;
  user: User;
}
