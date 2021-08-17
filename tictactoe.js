const Board = () => {
  // 1st player is X ie 1
  // State keeps track of next player and gameState
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);
  let status = `Winner is ${checkForWinner(gameState)}`;

  // Part 1 step 1 code goes here
  // Use conditional logic to set a variable to either 'Player O' or  'Player X'
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
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
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



// const Square = ({ takeTurn, id }) => {
//     const mark = ["O", "X", "+"];
//     // id is the square's number
//     // filled tells us if square has been filled
//     // tik tells us symbol in square (same as player)
//     // We call takeTurn to tell Parent we have filled the square
//     const [filled, setFilled] = React.useState(false);
//     const [tik, setTik] = React.useState(2);
  
//     return (
//       <button
//         onClick={() => {
//           setTik(takeTurn(id));
//           setFilled(true);
//           console.log(`Square: ${id} filled by player : ${tik}`);
//         }}
//       >
//         <h1>{mark[tik]}</h1>
//       </button>
//     );
//   };
  
//   const Board = () => {
//     // 1st player is X ie 1
//     // State keeps track of next player and gameState
//     const [player, setPlayer] = React.useState(1);
//     const [gameState, setGameState] = React.useState([]);
//     // check for winner (see superset.js)
//     function checkForWinner (state) {
        
//       const win = [
//           [0, 1, 2],
//           [3, 4, 5],
//           [6, 7, 8],
//           [0, 3, 6],
//           [1, 4, 7],
//           [2, 5, 8],
//           [0, 4, 8],
//           [2, 4, 6],
  
//       ];
  
//       for (let i = 0; i < win.length; i++) {
//           const [a, b, c] = win[i];
//           if (state[a] == state[b] && state[a] == state[c] && state[a])
//           return state[a] 
//       }
  
//       return null;
//   }
//     let status = `Winner is ${checkForWinner(gameState)}`;
//     console.log(`We hava a winner ${status}`);
  
//     const takeTurn = (id) => {
//       setGameState([...gameState, { id: id, player: player }]);
//       setPlayer((player + 1) % 2); // get next player
//       return player;
//     };
//     function renderSquare(i) {
//       // use properties to pass callback function takeTurn to Child
//       return <Square takeTurn={takeTurn} id={i}></Square>;
//     }
//     return (
//       <div className="game-board">
//         <div className="grid-row">
//           {renderSquare(0)}
//           {renderSquare(1)}
//           {renderSquare(2)}
//         </div>
//         <div className="grid-row">
//           {renderSquare(3)}
//           {renderSquare(4)}
//           {renderSquare(5)}
//         </div>
//         <div className="grid-row">
//           {renderSquare(6)}
//           {renderSquare(7)}
//           {renderSquare(8)}
//         </div>
//         <div id="info">
//           <h1>{status}</h1>
//         </div>
//       </div>
//     );
//   };
  
//   const Game = () => {
//     return (
//       <div className="game">
//         <Board></Board>
//       </div>
//     );
//   };
  
//   // ========================================
  
//   ReactDOM.render(<Game />, document.getElementById("root"));
  




// ============================================================================

// const Square = ({ id, player, newState }) => {
//     const [color, setColor] = React.useState("green");
//     const [status, setStatus] = React.useState(null);
//     const XorO = ["X", "O"]
//     // const palet = ["white"];
//     // const getRandomColor = () => palet[Math.floor(Math.random() * 3)]
    
//     React.useEffect(() => {
//         console.log(`Render ${id}`);
//         return () => console.log(`unmounting Square ${id}`);
//     })
     
//     return(
//         <button 
//             onClick={e => {
//                 // let col = getRandomColor();
//                 // setColor(col);
//                 let nextPlayer = newState(id)
//                 setStatus(nextPlayer)
//                 // e.target.style.background = col
//             }}
//         >
//         <h2>{XorO[status]}</h2></button>
//     )
// }

// const Board = () => {
//     const { useState } = React;
//     const [player, setPlayer] = useState(1);
//     const [mounted, setMounted] = useState(true);
//     const [state, setState] = useState(Array(9).fill(null));
//     let status = `Player ${player}`;
//     let winner = checkWinner(state)
//     if (winner != null) status = `Player ${player} wins!!!`

//     function newState (idOfSquare) {
//       let thePlayer = player;
//       state[idOfSquare] = player;
//       setState(state)
//       let nextPlayer = (player + 1) % 2;
//       setPlayer(nextPlayer);
//       return thePlayer;
//   }

//     function checkWinner (state) {
        
//         const win = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6],
    
//         ];
    
//         for (let i = 0; i < win.length; i++) {
//             const [a, b, c] = win[i];
//             if (state[a] == state[b] && state[a] == state[c] && state[a])
//             return state[a] ;
//         }
    
//         return null;
//     }

    

//     const toggle = () => setMounted(!mounted)
//     status = `Player ${player}`;
//     function renderSquare(i) {

//         return <Square id={i} player={player} newState={newState}></Square>
//     }

//     return(
//         <>
//             <h2>
//                 {`Player ${player}'s turn...`}
//             </h2>

//             <div className="game-board">
//             <div className="grid-row">
//                     {renderSquare(0)}
//                     {renderSquare(1)}
//                     {renderSquare(2)}
//                 </div>
//                 <div className="grid-row">
//                     {renderSquare(3)}
//                     {renderSquare(4)}
//                     {renderSquare(5)}
//                 </div>
//                 <div className="grid-row">
//                     {renderSquare(6)}
//                     {renderSquare(7)}
//                     {renderSquare(8)}
//             </div>
//                 <div id="info">
//                     <button
//                         onClick={toggle}
//                     >Show/Hide Row</button>
//                 </div>

//                 <div>
//                     <h1>{status}</h1>
//                 </div>
//             </div>
//         </>
//     )
// }

// ReactDOM.render(
//     <Board />,
//     document.getElementById('root')
// )