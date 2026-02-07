import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from 'react95';

const BoardWrapper = styled.div`
  background: #c0c0c0;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  user-select: none;
`;

const StatusPanel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #c0c0c0;
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  padding: 5px;
  margin-bottom: 5px;
`;

const Counter = styled.div`
  background: #000;
  color: #ff0000;
  font-family: 'Courier New', monospace;
  font-size: 20px;
  font-weight: bold;
  padding: 0 4px;
  border: 1px solid #808080;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 20px);
  grid-template-rows: repeat(16, 20px);
  border: 3px solid;
  border-color: #808080 #fff #fff #808080;
`;

// FIXED: Using Transient Prop $isCovered
const Cell = styled.div`
  width: 20px;
  height: 20px;
  background: #c0c0c0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  font-family: 'Tahoma', sans-serif;
  cursor: default;

  border: ${props => props.$isCovered ? '2px solid' : '1px solid #808080'};
  border-color: ${props => props.$isCovered ? '#fff #808080 #808080 #fff' : 'transparent'}; 
  
  color: ${props => {
    switch(props.value) {
      case 1: return 'blue';
      case 2: return 'green';
      case 3: return 'red';
      case 4: return 'darkblue';
      case 5: return 'brown';
      case 6: return 'teal';
      case 7: return 'black';
      case 8: return 'gray';
      default: return 'black';
    }
  }};

  &:active {
    border: ${props => props.$isCovered ? '1px solid #808080' : ''};
  }
`;

// ... [Keep constants N_ROWS, etc. same as before] ...
const N_ROWS = 16;
const N_COLS = 16;
const N_MINES = 40;
const COVER_FOR_CELL = 10;
const MARK_FOR_CELL = 10;
const EMPTY_CELL = 0;
const MINE_CELL = 9;
const COVERED_MINE_CELL = MINE_CELL + COVER_FOR_CELL;
const MARKED_MINE_CELL = COVERED_MINE_CELL + MARK_FOR_CELL;

const Minesweeper = () => {
  const [field, setField] = useState([]);
  const [inGame, setInGame] = useState(false);
  const [minesLeft, setMinesLeft] = useState(N_MINES);
  const [statusText, setStatusText] = useState("PLAY");

  const startNewGame = useCallback(() => {
    const allCells = N_ROWS * N_COLS;
    let newField = new Array(allCells).fill(COVER_FOR_CELL);
    let placedMines = 0;

    while (placedMines < N_MINES) {
      let position = Math.floor(Math.random() * allCells);
      if (newField[position] !== COVERED_MINE_CELL) {
        newField[position] = COVERED_MINE_CELL;
        placedMines++;
        
        // Update neighbors logic (Simplified for brevity, keep your original logic here)
        // ... (Your original neighbor calculation code goes here) ...
         const current_col = position % N_COLS;
        const cellLimits = (pos) => pos >= 0 && pos < allCells;

        if (current_col > 0 && cellLimits(position - 1 - N_COLS) && newField[position - 1 - N_COLS] !== COVERED_MINE_CELL) newField[position - 1 - N_COLS] += 1;
        if (cellLimits(position - N_COLS) && newField[position - N_COLS] !== COVERED_MINE_CELL) newField[position - N_COLS] += 1;
        if (current_col < N_COLS - 1 && cellLimits(position + 1 - N_COLS) && newField[position + 1 - N_COLS] !== COVERED_MINE_CELL) newField[position + 1 - N_COLS] += 1;
        if (current_col > 0 && cellLimits(position - 1) && newField[position - 1] !== COVERED_MINE_CELL) newField[position - 1] += 1;
        if (current_col < N_COLS - 1 && cellLimits(position + 1) && newField[position + 1] !== COVERED_MINE_CELL) newField[position + 1] += 1;
        if (current_col > 0 && cellLimits(position - 1 + N_COLS) && newField[position - 1 + N_COLS] !== COVERED_MINE_CELL) newField[position - 1 + N_COLS] += 1;
        if (cellLimits(position + N_COLS) && newField[position + N_COLS] !== COVERED_MINE_CELL) newField[position + N_COLS] += 1;
        if (current_col < N_COLS - 1 && cellLimits(position + 1 + N_COLS) && newField[position + 1 + N_COLS] !== COVERED_MINE_CELL) newField[position + 1 + N_COLS] += 1;
      }
    }
    setField(newField);
    setInGame(true);
    setMinesLeft(N_MINES);
    setStatusText("🙂");
  }, []);

  useEffect(() => { startNewGame(); }, [startNewGame]);

  // Keep findEmptyCells logic same as before...
  const findEmptyCells = (index, currentField) => {
    const current_col = index % N_COLS;
    let neighbors = [];
    if (current_col > 0) neighbors.push(index - N_COLS - 1, index - 1, index + N_COLS - 1);
    neighbors.push(index - N_COLS, index + N_COLS);
    if (current_col < N_COLS - 1) neighbors.push(index - N_COLS + 1, index + 1, index + N_COLS + 1);

    neighbors.forEach(cell => {
      if (cell >= 0 && cell < N_ROWS * N_COLS) {
        if (currentField[cell] > MINE_CELL) {
          currentField[cell] -= COVER_FOR_CELL;
          if (currentField[cell] === EMPTY_CELL) findEmptyCells(cell, currentField);
        }
      }
    });
  };

  const handleMouseUp = (e, index) => {
    if (!inGame) return;
    let newField = [...field];
    
    if (e.button === 2) { // Right Click
      if (newField[index] > MINE_CELL) {
        if (newField[index] <= COVERED_MINE_CELL + MARK_FOR_CELL) {
          if (minesLeft > 0) { newField[index] += MARK_FOR_CELL; setMinesLeft(l => l - 1); }
        } else { newField[index] -= MARK_FOR_CELL; setMinesLeft(l => l + 1); }
      }
    } else if (e.button === 0) { // Left Click
      if (newField[index] > COVERED_MINE_CELL + MARK_FOR_CELL) return;
      newField[index] -= COVER_FOR_CELL;
      if (newField[index] === MINE_CELL) { setInGame(false); setStatusText("😵"); } 
      else if (newField[index] === EMPTY_CELL) findEmptyCells(index, newField);
    }
    setField(newField);
  };

  const getCellContent = (val) => {
    if (inGame) {
      if (val > COVERED_MINE_CELL + MARK_FOR_CELL) return "🚩";
      if (val > COVERED_MINE_CELL) return "🚩";
      if (val > MINE_CELL) return null;
    } else {
      if (val === MINE_CELL) return "💣";
      if (val > COVERED_MINE_CELL + MARK_FOR_CELL) return "🚩";
      if (val > COVERED_MINE_CELL) return "💣";
      if (val > MINE_CELL) return null;
    }
    return val === 0 ? null : val;
  };

  const isCovered = (val) => val > MINE_CELL;

  return (
    <BoardWrapper onContextMenu={(e) => e.preventDefault()}>
      <StatusPanel>
        <Counter>{minesLeft.toString().padStart(3, '0')}</Counter>
        <Button onClick={startNewGame} style={{ fontSize: '20px', padding: '0 5px' }}>{statusText}</Button>
        <Counter>000</Counter>
      </StatusPanel>

      <GameGrid>
        {field.map((val, i) => (
          <Cell 
            key={i} 
            $isCovered={isCovered(val)} /* <--- FIXED HERE with $ */
            value={!isCovered(val) ? val : 0}
            onMouseDown={(e) => handleMouseUp(e, i)}
          >
            {getCellContent(val)}
          </Cell>
        ))}
      </GameGrid>
    </BoardWrapper>
  );
};

export default Minesweeper;