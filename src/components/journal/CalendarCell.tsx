import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  day: number;
  month: number;
  isCurrMonth: boolean;
  isSelected?: boolean;
  onDaySelect: (month: number, day: number) => void;
  [key: string]: any;
}

export default function CalendarCell({
  day,
  month,
  isCurrMonth,
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
      >
        {day}
      </InnerCell>
    </Cell>
  );
}

interface CellProps {
  readonly isSelected: boolean;
  readonly isCurrMonth: boolean;
}

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* text-align: center; */
  /* height: 2rem; */
  /* cursor: pointer; */

  /* border-radius: 2px; */
`;

const InnerCell = styled.div<CellProps>`
  text-align: center;
  min-height: 2.3rem;
  min-width: 2.3rem;
  line-height: 2.3rem;
  margin: 0.3rem;
  padding: 1px;

  border-radius: 2px;
  cursor: pointer;

  /* background: ${(props) => (props.isSelected ? "#eee" : "none")}; */
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  color: ${(props) => (props.isCurrMonth ? "#333" : "#aaa")};

  &:hover {
    background-color: #f3f3f3;
  }
`;
