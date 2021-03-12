export interface IFile {
  filename: string;
  language: string;
  raw_url: string;
  size: number;
  type: string;
}

export interface IFileWithContent extends IFile {
  content: string;
  truncated: boolean;
}

export interface IUser {
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

export interface IHistory {
  change_status: {
    total: number;
    additions: number;
    deletions: number;
  };
  committed_at: string;
  url: string;
  user: IUser;
  version: string;
}

export interface IGist {
  comments: number;
  comments_url: string;
  commits_url: string;
  created_at: string;
  description: string;
  forks_url: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  id: string;
  node_id: string;
  owner: IUser;
  public: boolean;
  truncated: boolean;
  updated_at: string;
  url: string;
  user: IUser;
}

export interface IGistDetail extends IGist {
  files: { [key: string]: IFileWithContent };
  forks: string[];
  history: IHistory[];
}

export interface IGistSummary extends IGist {
  files: { [key: string]: IFile };
}
