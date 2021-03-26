import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  day: number;
  month: number;
  isCurrMonth: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  onDaySelect: (month: number, day: number) => void;
  [key: string]: any;
}

export default function CalendarCell({
  day,
  month,
  isCurrMonth,
  isToday = false,
  isSelected = false,
  onDaySelect,
}: Props): ReactElement {
  return (
    <Cell>
      <InnerCell
        isSelected={isSelected}
        onClick={() => {
          onDaySelect(month, day);
        }}
        isCurrMonth={isCurrMonth}
        isToday={isToday}
      >
        {day}
      </InnerCell>
    </Cell>
  );
}

interface CellProps {
  readonly isSelected: boolean;
  readonly isCurrMonth: boolean;
  readonly isToday: boolean;
}

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerCell = styled.div<CellProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 2em;
  min-height: 2em;

  border-radius: 0.25em;
  color: #333;

  cursor: pointer;
  user-select: none;

  ${({ isToday }) =>
    isToday &&
    `
    background: #63d2a3;
    color: white;
  `}

  ${({ isSelected }) =>
    isSelected &&
    `
    text-decoration: underline;
    font-weight: bold;
  `}

  ${({ isCurrMonth, isToday }) =>
    !isCurrMonth &&
    !isToday &&
    ` 
    color: #aaa;
  `}
`;
