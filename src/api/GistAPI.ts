// import Gist from "../components/gist/Gist";
import { IGistDetail, IGistSummary } from "./gist.types";
import GithubAPI from "./GithubAPI";

const GIST_ENDPOINT: string = "/gists";

export default function GistAPI(token: string) {
  const api = GithubAPI(token);

  type IGetAllGistsParams = {
    per_page?: number;
    page?: number;
  };

  /**
   * Get authenticated users
   */
  async function getAllGists(
    params?: IGetAllGistsParams
  ): Promise<IGistSummary[]> {
    const res = await api.fetch(GIST_ENDPOINT, { params });
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
  async function getGist(gistId: string): Promise<IGistDetail> {
    const res = await api.fetch(`${GIST_ENDPOINT}/${gistId}`);

    if (res.status === 200) {
      return await res.json();
    } else {
      throw res;
    }
  }

  interface ICreateGistParams {
    description?: string;
    files: {
      [filename: string]: {
        filename?: string;
        content: string;
      };
    };
    public?: boolean;
  }

  /**
   * Create a gist.
   * @param gist - Gist request object.
   */
  async function createGist(gist: ICreateGistParams): Promise<IGistDetail> {
    const res = await api.fetch(GIST_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(gist),
    });

    if (res.status === 200) {
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
    gist: Exclude<ICreateGistParams, "public">
  ): Promise<IGistDetail> {
    const res = await api.fetch(`${GIST_ENDPOINT}/${gistId}`, {
      method: "PATCH",
      body: JSON.stringify(gist),
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
