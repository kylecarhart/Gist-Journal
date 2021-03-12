import React, { ReactElement, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useOutsideClick from "../../hooks/useOutsideClick";
import Calendar from "./Calendar";
import Entry from "./Entry";
import { getGistAsJournal, saveJournalEntryAsGist } from "./GistJournalAPI";
import Journal from "./Journal";

interface ParamTypes {
  tokenId: string;
  gistId: string;
}

function addDaysToDate(date: Date, days: number) {
  return new Date(date.setDate(date.getDate() + days));
}

export default function JournalPage(): ReactElement {
  const { tokenId, gistId } = useParams<ParamTypes>();

  const [journal, setJournal] = useState<Journal | null>(null);
  const [date, setDate] = useState(new Date());
  const [entry, setEntry] = useState();
  const [entryText, setEntryText] = useState<string | null>(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null!);

  useOutsideClick(calendarRef, () => {
    setShowCalendar(false);
  });

  useEffect(() => {
    const getJournal = async () => {
      let journal = await getGistAsJournal(tokenId, gistId);

      if (journal) {
        setJournal(journal);
        const entry = journal.getEntry(date.getMonth(), date.getDate());
        if (entry) {
          setEntryText(entry.text);
        }
      }
    };

    getJournal();
    return () => {};
  }, [tokenId, gistId]);

  return (
    <div>
      <button
        onClick={() => {
          setDate(addDaysToDate(date, -1));
          if (journal) {
            const entry = journal.getEntry(date.getMonth(), date.getDate());
            if (entry) {
              setEntryText(entry.text);
            } else {
              setEntryText(null);
            }
          }
        }}
      >
        Decrease day
      </button>
      <button
        onClick={() => {
          setDate(addDaysToDate(date, 1));
          if (journal) {
            const entry = journal.getEntry(date.getMonth(), date.getDate());
            if (entry) {
              setEntryText(entry.text);
            } else {
              setEntryText(null);
            }
          }
        }}
      >
        Increase day
      </button>
      <DateHeader
        onClick={() => {
          setShowCalendar(true);
        }}
      >
        {date.toLocaleString("default", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </DateHeader>
      {showCalendar && (
        <Calendar
          ref={calendarRef}
          initialDate={date}
          onDateSelect={(date) => {
            setDate(date);
            // setEntryText(journal!.getEntry(date.getMonth(), date.getDate()));
          }}
        />
      )}
      <textarea
        value={entryText || ""}
        onChange={(e) => {
          setEntryText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          // console.log("i press da button");
          if (journal && entryText) {
            // journal.setEntry(date.getMonth(), date.getDate(), entryText);
            saveJournalEntryAsGist(
              tokenId,
              gistId,
              journal,
              new Entry(date.getMonth(), date.getDate(), entryText)
            );
          }
        }}
      >
        Save
      </button>
    </div>
  );
}

const DateHeader = styled.h1`
  cursor: pointer;
`;
