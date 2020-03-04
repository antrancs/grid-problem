export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateGrid(size: number) {
  const grid: number[][] = [];
  for (let row = 0; row < size; row++) {
    grid[row] = [];
    for (let col = 0; col < size; col++) {
      grid[row][col] = getRandom(0, 1);
    }
  }

  console.log(grid);
  return grid;
}

export function getAllConnectedAreas(grid: number[][]) {
  const rows = grid.length;
  if (rows === 0) {
    throw new Error('Grid must have at least 1 row');
  }

  const cols = grid[0].length;
  let count = 0;

  // Each connected area is saved as a Set
  const sets: Set<number>[] = [];

  const visited: boolean[][] = new Array(rows)
    .fill(false)
    .map(() => new Array(cols).fill(false));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1 && !visited[r][c]) {
        sets[count] = new Set();
        sets[count].add(getIndexInGrid(rows, r, c));
        dfs(grid, r, c, visited, sets[count]);
        count++;
      }
    }
  }

  return sets;
}

function dfs(
  grid: number[][],
  row: number,
  col: number,
  visited: boolean[][],
  set: Set<number>
) {
  const rows = grid.length;
  const cols = grid[0].length;

  const isOutOfBounds = row >= rows || col >= cols || row < 0 || col < 0;

  if (isOutOfBounds || grid[row][col] === 0 || visited[row][col]) {
    return;
  }

  set.add(getIndexInGrid(rows, row, col));
  visited[row][col] = true;

  dfs(grid, row + 1, col, visited, set);
  dfs(grid, row - 1, col, visited, set);
  dfs(grid, row, col + 1, visited, set);
  dfs(grid, row, col - 1, visited, set);
}

/**
 * Get the unique index of a cell in a grid, given its row & col
 */
export function getIndexInGrid(totalRows: number, row: number, col: number) {
  return row * totalRows + col;
}
