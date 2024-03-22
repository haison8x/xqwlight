//=============================

JACOB_FEN_MAP = [
  'K',
  'A',
  'A',
  'B',
  'B',
  'R',
  'R',
  'C',
  'C',
  'N',
  'N',
  'P',
  'P',
  'P',
  'P',
  'P',
  'k',
  'a',
  'a',
  'b',
  'b',
  'r',
  'r',
  'c',
  'c',
  'n',
  'n',
  'p',
  'p',
  'p',
  'p',
  'p',
]

function jacob_boardToFen() {
  if (!JACOB_BOARD) {
    return ''
  }

  let map = JACOB_FEN_MAP
  let fen = ''

  for (let i = 9; i >= 0; i--) {
    let line = ''
    let space = 0
    for (let j = 0; j < 9; j++) {
      let index = JACOB_BOARD[j][i]
      if (index < 0 || index > 31) {
        space++
      } else {
        if (space > 0) {
          line += space.toString()
        }
        line += map[index]
        space = 0
      }
    }
    if (space > 0) {
      line += space.toString()
    }
    fen += line + '/'
  }

  if (fen.endsWith('/')) {
    fen = fen.substring(0, fen.length - 1)
  }

  return fen
}

$(document).ready(function () {
  insertHintHtml()
  insertFromToHtml()
})

function insertHintHtml(){
  let jacob_control = $('.container-fluid:first')
  let jacob_newHtml = `
  <div style="height:100px">
    <div style="float:left">      
      <span id="jacob_hint" style="cursor:pointer;font-weight: bold; font-size: 24px">Hint</span> 
      <span id="jacob_next_move"></span>
    </div>
    <div id="jacob_fen" style="float:right;min-width=100px"></div>
  </div>
  
  `
  jacob_control.html(jacob_newHtml)

  $('#jacob_hint').on('click', function () {
    jacob_calculate()
    $('#jacob_fen').html(JACOB_FEN + ' w')
  })

  $('#jacob_fen').on('click', function () {
    navigator.clipboard.writeText(fen + ' w')
  })
}
function insertFromToHtml() {
  let fromDivHtml = `<div id="jacob_from" style="width: 20px; height: 20px;background-color: red!important; position: absolute; left: 0px;top: 0px;"></div> `
  let toDivHtml = `<div id="jacob_to" style="width: 20px; height: 20px;background-color: red!important; position: absolute; left: 0px;top: 0px;"></div> `

  $('#Cocos2dGameContainer').append(fromDivHtml)
  $('#Cocos2dGameContainer').append(toDivHtml)
}

// 26215
function showFromTo(mv) {
  let sqSrc = SRC(mv)
  let sqDst = DST(mv)

  let x1 = FILE_X(sqSrc) - FILE_LEFT
  let y1 = RANK_Y(sqSrc) - RANK_TOP 

  let x2 = FILE_X(sqDst) - FILE_LEFT
  let y2 = RANK_Y(sqDst) - RANK_TOP
  $("#jacob_hint").html(`${x1}-${y1}-${x2}-${y2}`)
  
  x1 = 243 + x1 * 57
  y1 = 43 + y1 * 57

  x2 = 241 + x2 * 57
  y2 = 43 + y2 * 57

  let textFrom = CHR(ASC('A') + FILE_X(sqSrc) - FILE_LEFT) + CHR(ASC('9') - RANK_Y(sqSrc) + RANK_TOP)
  let textTo = CHR(ASC('A') + FILE_X(sqDst) - FILE_LEFT) + CHR(ASC('9') - RANK_Y(sqDst) + RANK_TOP)

  $('#jacob_from').html(textFrom)
  $('#jacob_to').html(textTo)
  $('#jacob_from').css('left', `${x1}px`)
  $('#jacob_from').css('top', `${y1}px`)
  $('#jacob_to').css('left', `${x2}px`)
  $('#jacob_to').css('top', `${y2}px`)
}

function jacob_calculate() {
  if (!JACOB_BOARD) {
    return
  }

  let currentFen = jacob_boardToFen()
  if (JACOB_FEN == currentFen) {
    return
  }

  JACOB_FEN = currentFen
  $('#jacob_next_move').text('thinking')
  jacobPos.fromFen(JACOB_FEN + ' w')

  let move = jacobSearch.searchMain(64, 2000)
  let moveText = move2Iccs(move)

  $('#jacob_next_move').text(moveText)
  showFromTo(move)
}

window.JACOB_BOARD = null
window.JACOB_FEN = null
let jacobPos = new Position()
let jacobSearch = new Search(jacobPos, 16)
