import Journal from "./Journal";
import GistAPI from "../../api/GistAPI";
import Entry from "./Entry";
import { IGistDetail, IGistSummary } from "../../api/gist.types";

const JOUNRAL_META_KEY = "85996D78-8A07-4297-98D1-14EF538F68D2";

function isGistJournal(gist: IGistSummary | IGistDetail) {
  if (gist.files[JOUNRAL_META_KEY]) {
    return true;
  } else {
    return false;
  }
}

async function getAllGistJournals(token: string) {
  const gists = await GistAPI(token).getAllGists();
  const journals = gists.filter((gist) => gist.files[JOUNRAL_META_KEY]);

  return journals;
}

async function getGistAsJournal(token: string, gistId: string) {
  const api = GistAPI(token);
  const gist = await api.getGist(gistId);

  if (!isGistJournal(gist)) {
    throw new Error("Gist is not a Journal");
  }

  const { year } = JSON.parse(gist.files[JOUNRAL_META_KEY].content) as {
    year: number;
  };

  const entries = [];
  for (let [filename, file] of Object.entries(gist.files)) {
    if (filename === JOUNRAL_META_KEY) {
      continue;
    }

    const month = parseInt(filename.split(".json")[0]);

    const monthEntries = JSON.parse(file.content) as {
      [day: string]: string;
    };

    for (let [day, text] of Object.entries(monthEntries)) {
      entries.push(new Entry(month, parseInt(day), text));
    }
  }

  const journal = new Journal(year, entries);

  return journal;
}

function saveJournalEntryAsGist(
  token: string,
  gistId: string,
  journal: Journal,
  entry: Entry
) {
  // Compile journal entries for the month
  const journalObject = journal.entries
    .filter((_entry) => entry.month === _entry.month)
    .reduce((acc, curr) => {
      acc[curr.day] = curr.text;
      return acc;
    }, {} as { [day: string]: string });

  // Add our new journal entry in
  journalObject[entry.day] = entry.text;

  GistAPI(token).updateGist(gistId, {
    files: {
      [`${entry.month}.json`]: { content: JSON.stringify(journalObject) },
    },
  });

  console.log(journalObject);
}

// function saveJournalAsGist(token: string, gistId: string, journal: Journal) {
//   const files: { [key: string]: { content: string } } = {};
//   journal.entries.forEach((entry) => {
//     const content: { [key: string]: string } = {};
//     // month.forEach((entry, day) => {
//     //   content[day] = entry;
//     // });
//     // files[`${monthIdx + 1}.json`] = { content: JSON.stringify(content) };
//   });
//   GistAPI(token).updateGist(gistId, {
//     files,
//   });
// }

export { getGistAsJournal, saveJournalEntryAsGist, getAllGistJournals };
