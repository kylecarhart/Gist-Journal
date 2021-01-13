import { GistResponse } from "../types/gists";

const BASE_URL: string = "https://api.github.com/gists/";

export function useGistAPI(token: string) {
  const headers = {
    authorization: `token ${token}`,
    accept: "application/vnd.github.v3+json",
  };

  async function get(gistID: string): Promise<GistResponse> {
    const res = await fetch(`${BASE_URL}${gistID}`, {
      headers,
    });
    return await res.json();
  }

  return { get };
}
