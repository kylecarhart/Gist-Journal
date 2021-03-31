import React, { useState } from "react";
import styled from "styled-components";
import { getDaysInMonth, addMonths, isToday } from "date-fns";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import CalendarCell from "./CalendarCell";

interface Props {
  initialDate?: Date;
  onDateSelect: (date: Date) => void;
  className?: string;
}

type Ref = HTMLDivElement;

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = React.forwardRef<Ref, Props>(
  ({ initialDate, onDateSelect, className }, ref) => {
    const [selectedDate, setSelectedDate] = useState(
      new Date(initialDate || new Date())
    );
    const [viewDate, setViewDate] = useState(new Date(selectedDate));

    const viewDateYear = viewDate.getFullYear();
    const viewDateMonth = viewDate.getMonth();

    const handleOnDateSelect = (date: Date) => {
      setSelectedDate(new Date(date));
      setViewDate(new Date(date));
      onDateSelect(new Date(date));
    };

    const renderCells = () => {
      const numDaysPrevMonth = getDaysInMonth(addMonths(viewDate, -1));
      const numDaysCurrMonth = getDaysInMonth(viewDate);

      const offset = new Date(viewDateYear, viewDateMonth, 1).getDay();

      const cells = [];

      // Fill in the days preceding the current month
      for (let i = numDaysPrevMonth - offset + 1; i <= numDaysPrevMonth; i++) {
        cells.push(
          <CalendarCell
            key={`${viewDateMonth - 1}-${i}`}
            isCurrMonth={false}
            onDaySelect={(month, day) => {
              handleOnDateSelect(new Date(viewDateYear, month, day));
            }}
            day={i}
            month={viewDateMonth - 1}
          />
        );
      }

      // Fill the calendar with the current month day numbers
      for (let i = 1; i <= numDaysCurrMonth; i++) {
        cells.push(
          <CalendarCell
            key={`${viewDateMonth}-${i}`}
            isCurrMonth={true}
            isToday={isToday(new Date(viewDateYear, viewDateMonth, i))}
            isSelected={
              i === selectedDate.getDate() &&
              selectedDate.getMonth() === viewDate.getMonth()
            }
            onDaySelect={(month, day) => {
              handleOnDateSelect(new Date(viewDateYear, month, day));
            }}
            day={i}
            month={viewDateMonth}
          />
        );
      }

      // Fill in the rest of the calendar
      for (let i = cells.length; i < 42; i++) {
        cells.push(
          <CalendarCell
            key={`${viewDateMonth + 1}-${i - numDaysCurrMonth - offset + 1}`}
            isCurrMonth={false}
            onDaySelect={(month, day) => {
              handleOnDateSelect(new Date(viewDateYear, month, day));
            }}
            day={i - numDaysCurrMonth - offset + 1}
            month={viewDateMonth + 1}
          />
        );
      }

      return cells;
    };

    return (
      <CalendarWrapper ref={ref} className={className}>
        <CalendarHeader>
          <MonthButton
            onClick={() => {
              setViewDate(addMonths(viewDate, -1));
            }}
          >
            <BiChevronLeft />
          </MonthButton>
          <CalendarHeaderMonth>
            {viewDate.toLocaleString("default", {
              month: "long",
            })}
          </CalendarHeaderMonth>
          <MonthButton
            onClick={() => {
              setViewDate(addMonths(viewDate, 1));
            }}
          >
            <BiChevronRight />
          </MonthButton>
        </CalendarHeader>

        <DaysOfWeek>
          {daysOfWeek.map((month) => (
            <div key={month}>{month}</div>
          ))}
        </DaysOfWeek>
        <CellContainer>{renderCells()}</CellContainer>
      </CalendarWrapper>
    );
  }
);

const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 1rem;
`;

const CellContainer = styled.div`
  font-size: 14px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 0.5em;
`;

const CalendarWrapper = styled.div`
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: 40rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  background: #fff;
  width: 50%;
  left: 50%;
  transform: translate(-50%);
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1.5rem;
`;

const MonthButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const CalendarHeaderMonth = styled.span`
  font-size: 1rem;
  min-width: 9em;
  text-align: center;
`;

export default Calendar;
