import React, { ReactElement, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useOutsideClick from "../../hooks/useOutsideClick";
import Calendar from "./Calendar";
import Entry from "./Entry";
import { getGistAsJournal, saveJournalEntryAsGist } from "./GistJournalAPI";
import Journal from "./Journal";
import { addDays } from "date-fns";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

interface ParamTypes {
  tokenId: string;
  gistId: string;
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
      try {
        entry.text = entryText;
        journal.setEntry(date.getMonth(), date.getDate(), entry);
        saveJournalEntryAsGist(tokenId, gistId, journal, entry);
        alert("Journal saved");
      } catch (e) {}
    }
  }

  return (
    <PageWrapper>
      <DateHeaderWrapper>
        <ModifyDayButton
          onClick={() => {
            changeDate(addDays(date, -1));
          }}
        >
          <BsChevronCompactLeft size={42} />
        </ModifyDayButton>
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
        <ModifyDayButton>
          <BsChevronCompactRight
            size={42}
            onClick={() => {
              changeDate(addDays(date, 1));
            }}
          />
        </ModifyDayButton>
      </DateHeaderWrapper>

      {showCalendar && (
        <StyledCalendar
          ref={calendarRef}
          initialDate={date}
          onDateSelect={(date) => {
            changeDate(date);
          }}
        />
      )}
      <TextArea
        value={entryText}
        onChange={(e) => {
          setEntryText(e.target.value);
        }}
      />
      {/* <button
        onClick={() => {
          saveEntry();
        }}
      >
        Save
      </button> */}
    </PageWrapper>
  );
}

const DateHeader = styled.h1`
  cursor: pointer;
  margin: 0;
  min-width: 30rem;
  text-align: center;
`;

const DateHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModifyDayButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    /* color: #333; */
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 2rem;
`;

const TextArea = styled.textarea`
  flex-grow: 1;
`;

const StyledCalendar = styled(Calendar)`
  position: absolute;
`;
