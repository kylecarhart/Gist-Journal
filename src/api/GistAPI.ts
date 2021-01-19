import { Gist } from "./types";
import GithubAPI from "./GithubAPI";

const GIST_ENDPOINT: string = "/gists";

export default function GistAPI(token: string) {
  const api = GithubAPI(token);

  /**
   * Get authenticated users
   */
  async function getAllGists(params?: {
    per_page?: number;
    page?: number;
  }): Promise<Gist[]> {
    const res = await api.fetch(GIST_ENDPOINT, { params });
    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  }

  /**
   * Retrieve a Gist based on the provided ID.
   * @param gistId - The ID of the Gist.
   */
  async function getGist(gistId: string): Promise<Gist> {
    const res = await api.fetch(`${GIST_ENDPOINT}/${gistId}`);

    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  }

  /**
   * Create a gist.
   * @param gist - Gist request object.
   */
  async function createGist(gist: {
    files: {
      [key: string]: {
        content: string;
        filename?: string;
      };
    };
    public: boolean;
    description?: string;
  }): Promise<Gist> {
    const res = await api.fetch(GIST_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ description: "", ...gist }),
    });

    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  }

  /**
   * Update a gist with the provided ID.
   * @param gistId - The ID of the Gist.
   * @param gist - Gist request object.
   */
  async function updateGist(
    gistId: string,
    gist: {
      description?: string;
      files: {
        [key: string]: {
          content: string;
          filename?: string;
        };
      };
    }
  ): Promise<Gist> {
    const res = await api.fetch(`${GIST_ENDPOINT}/${gistId}`, {
      method: "PATCH",
      body: JSON.stringify({ ...gist }),
    });

    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  }

  /**
   * Deletes a gist based on the provided ID.
   * @param gistId - The ID of the Gist.
   */
  async function deleteGist(gistId: string) {
    const res = await api.fetch(`${GIST_ENDPOINT}/${gistId}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  }

  return { getAllGists, getGist, createGist, updateGist, deleteGist };
}
