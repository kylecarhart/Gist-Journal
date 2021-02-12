import React, { ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GistAPI } from "../../api";
import { Gist } from "../../api/types";
import { forEach } from "lodash";

interface ParamTypes {
  tokenId: string;
  gistId: string;
}

export default function Journal(): ReactElement {
  const { tokenId, gistId } = useParams<ParamTypes>();
  const [gist, setGist] = useState<null | Gist>(null);

  useEffect(() => {
    GistAPI(tokenId)
      .getGist(gistId)
      .then((gistResponse) => {
        setGist(gistResponse);
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {};
  }, [tokenId, gistId]);

  return <div>{gist?.files["02.json"].content}</div>;
}
