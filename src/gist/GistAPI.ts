import { Gist } from "./gist.types";
import GithubAPI from "../github/GithubAPI";

const GIST_ENDPOINT: string = "/gists";

export function GistAPI(token: string) {
  const api = GithubAPI(token);

  /**
   * Get authenticated users
   */
  function getAllGists(params?: {
    per_page?: number;
    page?: number;
  }): Promise<Gist[]> {
    return api.fetch(GIST_ENDPOINT, { params });
  }

  /**
   * Retrieve a Gist based on the provided ID.
   * @param gistId - The ID of the Gist.
   */
  async function getGist(gistId: string): Promise<Gist> {
    return api.fetch(`${GIST_ENDPOINT}/${gistId}`);
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
    return api.fetch(GIST_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ description: "", ...gist }),
    });
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
    return api.fetch(`${GIST_ENDPOINT}/${gistId}`, {
      method: "PATCH",
      body: JSON.stringify({ ...gist }),
    });
  }

  /**
   * Deletes a gist based on the provided ID.
   * @param gistId - The ID of the Gist.
   */
  async function deleteGist(gistId: string) {
    return api.fetch(`${GIST_ENDPOINT}/${gistId}`, {
      method: "DELETE",
    });
  }

  return { getAllGists, getGist, createGist, updateGist, deleteGist };
}
