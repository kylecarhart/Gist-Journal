import { isEmpty, forEach } from "lodash";

export const BASE_URL: string = "https://api.github.com";

interface Params {
  [key: string]: string | number | undefined;
}

/**
 * Returns query string
 * @param params - key value pair for params
 */
function processParams(params: Params) {
  if (isEmpty(params)) {
    return "";
  }

  const searchParams = new URLSearchParams();

  forEach(params, (value, key) => {
    if (value) {
      searchParams.append(key, value.toString());
    }
  });

  return `?${searchParams.toString()}`;
}

export default function GithubAPI(token: string) {
  const headers = {
    authorization: `token ${token}`,
    accept: "application/vnd.github.v3+json",
  };

  /**
   * Fetch a endpoint from github api
   * @param endpoint - Url string
   * @param - Options for headers or params
   */
  async function fetch(
    endpoint: RequestInfo,
    opts?: {
      body?: BodyInit;
      method?: string;
      params?: Params;
    }
  ) {
    let url = BASE_URL + endpoint;

    // Add search params if specified
    if (opts?.params) {
      url += processParams(opts.params);
    }

    // Make the request
    const res = await window.fetch(url, {
      headers,
      method: opts?.method,
      body: opts?.body,
    });

    if (res.ok) {
      return await res.json();
    } else {
      throw res;
    }
  }

  return { fetch };
}
