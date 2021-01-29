import { Gist } from "../../api/types";
import GistAPI from "../../api/GistAPI";

export const JOURNAL_KEY = "DF848745-63E8-4700-8E02-BD8B53393C99";

const defaultJournal = {
  "01.json": { content: "{}" },
  "02.json": { content: "{}" },
  "03.json": { content: "{}" },
  "04.json": { content: "{}" },
  "05.json": { content: "{}" },
  "06.json": { content: "{}" },
  "07.json": { content: "{}" },
  "08.json": { content: "{}" },
  "09.json": { content: "{}" },
  "10.json": { content: "{}" },
  "11.json": { content: "{}" },
  "12.json": { content: "{}" },
};

export function isJournal(gist: Gist): boolean {
  const regex = /^GistJournal[0-9]{4}$/;

  if (regex.test(gist.description)) {
    return true;
  } else {
    return false;
  }
}

export function JournalAPI(token: string) {
  const gistAPI = GistAPI(token);

  function createJournal(description: string) {
    return gistAPI.createGist({
      public: false,
      description,
      files: defaultJournal,
    });
  }

  function saveEntry(gist: Gist, month: string, day: string, text: string) {
    let monthEntries = { ...JSON.parse(gist.files[`${month}.json`].content!) };
    monthEntries[day] = text;

    return gistAPI.updateGist(gist.id, {
      files: {
        [month + ".json"]: {
          content: JSON.stringify(monthEntries),
        },
      },
    });
  }

  return { createJournal, saveEntry };
}
