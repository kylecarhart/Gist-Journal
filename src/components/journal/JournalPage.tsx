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

  const [date, setDate] = useState(new Date());

  const [journal, setJournal] = useState<Journal | null>(null);
  const [entry, setEntry] = useState<Entry>();
  const [entryText, setEntryText] = useState("");

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null!);
  const dateHeaderRef = useRef<HTMLHeadingElement>(null!);

  useOutsideClick(calendarRef, (e) => {
    if (!dateHeaderRef.current?.contains(e.target as Node) && showCalendar) {
      setShowCalendar(false);
    }
  });

  useEffect(() => {
    const getJournal = async () => {
      let fetchedJournal = await getGistAsJournal(tokenId, gistId);

      if (fetchedJournal) {
        setJournal(fetchedJournal);
        setDate((date) => {
          return new Date(fetchedJournal.year, date.getMonth(), date.getDate());
        });

        const entry = fetchedJournal.getEntry(date.getMonth(), date.getDate());
        setEntry(entry);
        setEntryText(entry?.text || "");
      } else {
        throw new Error("Journal Fetch Error");
      }
    };

    if (!journal) {
      try {
        getJournal();
      } catch (e) {
        console.log(e);
      }
    }

    return () => {};
  }, [tokenId, gistId, date, journal]);

  function changeDate(date: Date) {
    setDate(date);

    if (journal) {
      const entry = journal.getEntry(date.getMonth(), date.getDate());
      if (entry) {
        setEntry(entry);
        setEntryText(entry.text);
      } else {
        setEntry(new Entry(date.getMonth(), date.getDate()));
        setEntryText("");
      }
    }
  }

  function saveEntry() {
    if (journal && entry) {
      entry.text = entryText;
      journal.setEntry(date.getMonth(), date.getDate(), entry);
      saveJournalEntryAsGist(tokenId, gistId, journal, entry);
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          changeDate(addDaysToDate(date, -1));
        }}
      >
        Decrease day
      </button>
      <button
        onClick={() => {
          changeDate(addDaysToDate(date, 1));
        }}
      >
        Increase day
      </button>
      <DateHeader
        ref={dateHeaderRef}
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
            changeDate(date);
          }}
        />
      )}
      <textarea
        value={entryText}
        onChange={(e) => {
          setEntryText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          saveEntry();
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