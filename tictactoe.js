const Board = () => {
  // 1st player is X ie 1
  // State keeps track of next player and gameState
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);
  const [start, setStart] = React.useState();

  let status = `Winner is ${checkForWinner(gameState)}`;

  // Part 1 step 1 code goes here
  // Use conditional logic to set a variable to either 'Player O' or  'Player X'

  const toggleStart = () => {
    setStart(1)
  }

  const toggleEnd = () => {
    setStart('');
    setPlayer(1);
    setGameState([]);
    
  }

  let playerTurn = `Next Player: ${player == '0' ? 'Player O' : 'Player X'}`;

  console.log(`We hav a winner ${status}`);

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2); // get next player
    return player;
  };
  function renderSquare(i) {
    // use properties to pass callback function takeTurn to Child
    return <Square takeTurn={takeTurn} id={i}></Square>;
  }

  // const reset = () => {
    
  //   return document.getElementById("myForm").reset();
  // }

  return (
    <>
    
        <h1 className='header'>React Tik Tak Toe</h1>    
        <h3 className="turn">{playerTurn}</h3>
        <h3 className="winner">{status}</h3>
    
    
    <div className="game-board">
      
      <div className="grid-row">
        {start && renderSquare(0)}
        {start && renderSquare(1)}
        {start && renderSquare(2)}
      </div>
      <div className="grid-row">
        {start && renderSquare(3)}
        {start && renderSquare(4)}
        {start && renderSquare(5)}
      </div>
      <div className="grid-row">
        {start && renderSquare(6)}
        {start && renderSquare(7)}
        {start && renderSquare(8)}
      </div>
    
      <button
        className="startButton"
        onClick={toggleStart}
      >Start Game</button>
      <button
        className="endButton"
        onClick={toggleEnd}
      >End Game</button>
    
    </div>

    
    
  </>
  );
};

const Square = ({ takeTurn, id, player }) => {
  const mark = ['O', 'X', '⭐'];
  // id is the square's number
  // filled tells you if square has been filled
  // tik tells you symbol in square (same as player)
  // You call takeTurn to tell Parent that the square has been filled
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);

  return (
    <>
    <button
      // Part 2: update the return statement below to add css classes
      
      
      className= "button"

      onClick={(e) => {
        takeTurn(player) == 1 ? e.target.style.background= 'rgb(65,182,230)' : e.target.style.background='palevioletred';
        setTik(takeTurn(id));
        setFilled(true);
        console.log(`Square: ${id} filled by player : ${takeTurn(id)}`);
      }}
    >
      <h1>{mark[tik]}</h1>
    </button>
    </>
  );
};
//       onClick={(e) => {
//         takeTurn(player) == 1 ? e.target.style.background= 'rgb(65,182,230)' : e.target.style.background='palevioletred'
//         setTik(takeTurn(id));
//         console.log(tik)
//         setFilled(true);
//         console.log(`Square: ${id} filled by player : ${takeTurn(player)}`);
//       }}
//     >
//      <>{mark[tik]}</> 
//     </button>
//   );
// };

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

// Checking for Winner takes a bit of work
// Use JavaScript Sets to check players choices
// against winning combinations
// Online there is more compact version but I prefer this one

const win = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

const checkPlayerTurn = (gameState) => {
  return gameState.player;
};

const checkForWinner = (gameState) => {
  // get array of box id's
  // can't be a winner in less than 5 turns
  if (gameState.length < 5) return 'No Winner Yet';
  let p0 = gameState.filter((item) => {
    if (item.player == 0) return item;
  });
  p0 = p0.map((item) => item.id);
  let px = gameState.filter((item) => {
    if (item.player == 1) return item;
  });
  px = px.map((item) => item.id);
  if (p0 != null && px != null) {
    var win0 = win.filter((item) => {
      return isSuperset(new Set(p0), new Set(item));
    });
    var winX = win.filter((item) => {
      return isSuperset(new Set(px), new Set(item));
    });
  }
  if (win0.length > 0) return 'Player O ';
  else if (winX.length > 0) return 'Player X ';
  return 'No Winner Yet';
};
// check if subset is in the set
function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
