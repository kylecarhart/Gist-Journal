import { Gist } from "./gist.types";

const BASE_URL: string = "https://api.github.com/gists";

interface FileRequest {
  content: string;
  filename?: string;
}

export function GistAPI(token: string) {
  const headers = {
    authorization: `token ${token}`,
    accept: "application/vnd.github.v3+json",
  };

  /**
   * Retrieve a Gist based on the provided ID.
   * @param gistId - The ID of the Gist.
   */
  async function getGist(gistId: string): Promise<Gist> {
    const res = await fetch(`${BASE_URL}/${gistId}`, {
      headers,
    });

    return await res.json();
  }

  /**
   * Create a gist.
   * @param gist - Gist request object.
   */
  async function createGist(gist: {
    files: { [key: string]: FileRequest };
    public: boolean;
    description?: string;
  }): Promise<Gist> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ description: "", ...gist }),
    });

    return await res.json();
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
      files: { [key: string]: FileRequest };
    }
  ): Promise<Gist> {
    const res = await fetch(`${BASE_URL}/${gistId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ ...gist }),
    });

    return await res.json();
  }

  /**
   * Deletes a gist based on the provided ID.
   * @param gistId - The ID of the Gist.
   */
  async function deleteGist(gistId: string) {
    await fetch(`${BASE_URL}/${gistId}`, {
      method: "DELETE",
      headers,
    });
  }

  return { getGist, createGist, updateGist, deleteGist };
}
