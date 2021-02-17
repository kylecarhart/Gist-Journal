import React, { ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GistAPI } from "../../api";
import { Gist } from "../../api/types";

interface ParamTypes {
  tokenId: string;
  gistId: string;
}

export default function Journal(): ReactElement {
  const { tokenId, gistId } = useParams<ParamTypes>();
  const [gist, setGist] = useState<null | Gist>(null);
  const [date, setDate] = useState(new Date());

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

  return <div></div>;
}
