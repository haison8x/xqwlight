var pos = new Position()
var search = new Search(pos, 16)
pos.fromFen('4k4/4a4/4P4/9/9/9/9/4B4/9/4K4 w')
var move = search.searchMain(64, 2000)
var moveText = move2Iccs(move)
console.log(moveText)
pos.fromFen('9/9/4Nk3/3c2p2/3r2P2/3p2B2/3p2r2/4KC3/9/9 w')
move = search.searchMain(64, 2000)
moveText = move2Iccs(move)
console.log(moveText)
console.log(fen)

var fen = ''
for (var i = 0; i < 9; i++) {
  var line = ''
  var space = 0
  for (var j = 0; i < 10; j++) {
    if (array[j][i] < 0) {
      space++
    } else {
      if (space > 0) {
        line += space.toString()
      }
      line += 'QuanCo'
      space = 0
    }
  }
  if (space > 0) {
    line += space.toString()
  }
  fen += line + '/'
}
