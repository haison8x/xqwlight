//=============================

JACOB_FEN_MAP = [
  "K",
  "A",
  "A",
  "B",
  "B",
  "R",
  "R",
  "C",
  "C",
  "N",
  "N",
  "P",
  "P",
  "P",
  "P",
  "P",
  "k",
  "a",
  "a",
  "b",
  "b",
  "r",
  "r",
  "c",
  "c",
  "n",
  "n",
  "p",
  "p",
  "p",
  "p",
  "p",
];

function jacob_boardToFen() {
  if (!JACOB_BOARD) {
    return "";
  }

  let map = JACOB_FEN_MAP
  let fen = "";

  for (let i = 9; i >= 0; i--) {
    let line = "";
    let space = 0;
    for (let j = 0; j < 9; j++) {
      let index = JACOB_BOARD[j][i];
      if (index < 0 || index > 31) {
        space++;
      } else {
        if (space > 0) {
          line += space.toString();
        }
        line += map[index];
        space = 0;
      }
    }
    if (space > 0) {
      line += space.toString();
    }
    fen += line + "/";
  }

  if (fen.endsWith("/")) {
    fen = fen.substring(0, fen.length - 1);
  }

  return fen;
}

$(document).ready(function () {
  let jacob_control = $(".container-fluid:first");
  let jacob_newHtml = `
  <div style="height:100px">
    <div style="float:left">      
      <span id="jacob_hint" style="cursor:pointer;font-weight: bold; font-size: 24px">Hint</span> 
      <span id="jacob_next_move"></span>
    </div>
    <div id="jacob_fen" style="float:right;min-width=100px"></div>
  </div>
  
  `;

  jacob_control.html(jacob_newHtml);

  $("#jacob_hint").on("click", function () {
    jacob_calculate();
    $("#jacob_fen").html(JACOB_FEN + " w");
  });

  $("#jacob_fen").on("click", function () {        
    navigator.clipboard.writeText(fen + " w");
  });
});

function jacob_calculate() {
  if (!JACOB_BOARD) {
    return;
  }

  let currentFen = jacob_boardToFen();
  if (JACOB_FEN == currentFen) {
    return;
  }

  JACOB_FEN = currentFen;
  $("#jacob_next_move").text("thinking");
  jacobPos.fromFen(JACOB_FEN + " w");

  let move = jacobSearch.searchMain(64, 2000);
  let moveText = move2Iccs(move);

  $("#jacob_next_move").text(moveText);
}

window.JACOB_BOARD = null;
window.JACOB_FEN = null;
let jacobPos = new Position();
let jacobSearch = new Search(jacobPos, 16);
