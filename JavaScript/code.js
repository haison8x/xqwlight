
function insertFromToHtml() {
  let fromDivHtml = `<div id="jacob_from" style="width: 10px; height: 10px; background-color: red!important; position: absolute; left: 0px;top: 0px;"></div> `
  let toDivHtml = `<div id="jacob_to" style="width: 10px; height: 10px; background-color: blue!important; position: absolute; left: 0px;top: 0px;"></div> `

  $('#Cocos2dGameContainer').append(fromDivHtml)
  $('#Cocos2dGameContainer').append(toDivHtml)
}

function showFromTo(mv) {
  let sqSrc = SRC(mv)
  let sqDst = DST(mv)

  let x1 = FILE_X(sqSrc) - FILE_LEFT
  let y1 = RANK_Y(sqSrc) - RANK_TOP 

  let x2 = FILE_X(sqDst) - FILE_LEFT
  let y2 = RANK_Y(sqDst) - RANK_TOP
    
  x1 = 248 + x1 * 57
  y1 = 35 + y1 * 57

  x2 = 248 + x2 * 57
  y2 = 35 + y2 * 57

  let textFrom = CHR(ASC('A') + FILE_X(sqSrc) - FILE_LEFT) + CHR(ASC('9') - RANK_Y(sqSrc) + RANK_TOP)
  let textTo = CHR(ASC('A') + FILE_X(sqDst) - FILE_LEFT) + CHR(ASC('9') - RANK_Y(sqDst) + RANK_TOP)

  $('#jacob_from').html(textFrom)
  $('#jacob_to').html(textTo)
  $('#jacob_from').css('left', `${x1}px`)
  $('#jacob_from').css('top', `${y1}px`)
  $('#jacob_to').css('left', `${x2}px`)
  $('#jacob_to').css('top', `${y2}px`)
}