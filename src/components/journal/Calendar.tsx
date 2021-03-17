import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  initialDate?: Date;
  onDateSelect: (date: Date) => void;
}

type Ref = HTMLDivElement;

const months = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function addMonthsToDate(date: Date, months: number) {
  return new Date(date.setMonth(date.getMonth() + months));
}

const Calendar = React.forwardRef<Ref, Props>(
  ({ initialDate, onDateSelect }, ref) => {
    const [selectedDate, setSelectedDate] = useState(
      new Date(initialDate || new Date())
    );
    const [viewDate, setViewDate] = useState(new Date(selectedDate));

    const handleOnDateSelect = (date: Date) => {
      setSelectedDate(date);
      onDateSelect(date);
    };

    const renderCells = () => {
      const numDaysPrevMonth = getDaysInMonth(
        viewDate.getFullYear(),
        viewDate.getMonth() - 1
      );

      const numDaysCurrMonth = getDaysInMonth(
        viewDate.getFullYear(),
        viewDate.getMonth()
      );

      const numDaysNextMonth = getDaysInMonth(
        viewDate.getFullYear(),
        viewDate.getMonth() + 1
      );

      const offset = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        1
      ).getDay();

      const cells = [];

      // Fill the array with blanks to offset the calendar display
      for (let i = numDaysPrevMonth - offset + 1; i <= numDaysPrevMonth; i++) {
        // console.log(i);
        cells.push(undefined);
      }

      // Fill the calendar cells with the day numbers
      for (let i = 1; i <= numDaysCurrMonth; i++) {
        cells.push(i);
      }

      return cells.map((day, idx) => {
        if (day) {
          return (
            <Cell
              key={idx}
              selected={
                day === selectedDate.getDate() &&
                selectedDate.getMonth() === viewDate.getMonth()
              }
              onClick={() => {
                handleOnDateSelect(
                  new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
                );
              }}
            >
              {day}
            </Cell>
          );
        } else {
          return <div key={idx}></div>; // Padding
        }
      });
    };

    return (
      <div ref={ref}>
        <div>
          {viewDate.toLocaleString("default", {
            month: "long",
          })}
        </div>
        <button
          onClick={() => {
            setViewDate(addMonthsToDate(viewDate, -1));
          }}
        >
          Decrease month
        </button>
        <button
          onClick={() => {
            setViewDate(addMonthsToDate(viewDate, 1));
          }}
        >
          Increase month
        </button>

        <Header>
          {months.map((month) => (
            <div key={month}>{month}</div>
          ))}
        </Header>
        <CellContainer>{renderCells()}</CellContainer>
      </div>
    );
  }
);

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const CellContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;

interface CellProps {
  selected: boolean;
}

const Cell = styled.div<CellProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 2rem;
  cursor: pointer;
  background: ${(props) => (props.selected ? "lightblue" : "none")};
`;

export default Calendar;
