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

  async function getAllGists(): Promise<Gist[]> {
    const res = await fetch(`${BASE_URL}`, {
      headers,
    });

    if (res.status === 200) {
      return await res.json();
    } else {
      throw res;
    }
  }

  /**
   * Retrieve a Gist based on the provided ID.
   * @param gistId - The ID of the Gist.
   */
  async function getGist(gistId: string): Promise<Gist> {
    const res = await fetch(`${BASE_URL}/${gistId}`, {
      headers,
    });

    if (res.status === 200) {
      return await res.json();
    } else {
      throw res;
    }
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

    if (res.status === 201) {
      return await res.json();
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
      files: { [key: string]: FileRequest };
    }
  ): Promise<Gist> {
    const res = await fetch(`${BASE_URL}/${gistId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ ...gist }),
    });

    if (res.status === 200) {
      return await res.json();
    } else {
      throw res;
    }
  }

  /**
   * Deletes a gist based on the provided ID.
   * @param gistId - The ID of the Gist.
   */
  async function deleteGist(gistId: string) {
    const res = await fetch(`${BASE_URL}/${gistId}`, {
      method: "DELETE",
      headers,
    });

    if (res.status === 204) {
      return;
    } else {
      throw res;
    }
  }

  return { getAllGists, getGist, createGist, updateGist, deleteGist };
}
