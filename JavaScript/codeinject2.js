// ============== Position
function binarySearch(vlss, vl) {
  var low = 0
  var high = vlss.length - 1
  while (low <= high) {
    var mid = (low + high) >> 1
    if (vlss[mid][0] < vl) {
      low = mid + 1
    } else if (vlss[mid][0] > vl) {
      high = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

var MATE_VALUE = 10000
var BAN_VALUE = MATE_VALUE - 100
var WIN_VALUE = MATE_VALUE - 200
var NULL_SAFE_MARGIN = 400
var NULL_OKAY_MARGIN = 200
var DRAW_VALUE = 20
var ADVANCED_VALUE = 3

var PIECE_KING = 0
var PIECE_ADVISOR = 1
var PIECE_BISHOP = 2
var PIECE_KNIGHT = 3
var PIECE_ROOK = 4
var PIECE_CANNON = 5
var PIECE_PAWN = 6

var RANK_TOP = 3
var RANK_BOTTOM = 12
var FILE_LEFT = 3
var FILE_RIGHT = 11

var ADD_PIECE = false
var DEL_PIECE = true

var IN_BOARD_ = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

var IN_FORT_ = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

var LEGAL_SPAN = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1,
  2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
]

var KNIGHT_PIN_ = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16, 0, -16, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
]

var KING_DELTA = [-16, -1, 1, 16]
var ADVISOR_DELTA = [-17, -15, 15, 17]
var KNIGHT_DELTA = [
  [-33, -31],
  [-18, 14],
  [-14, 18],
  [31, 33],
]
var KNIGHT_CHECK_DELTA = [
  [-33, -18],
  [-31, -14],
  [14, 31],
  [18, 33],
]
var MVV_VALUE = [50, 10, 10, 30, 40, 30, 20, 0]

var PIECE_VALUE = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 11, 13, 11, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 19, 24, 34, 42, 44, 42, 34,
    24, 19, 0, 0, 0, 0, 0, 0, 0, 19, 24, 32, 37, 37, 37, 32, 24, 19, 0, 0, 0, 0, 0, 0, 0, 19, 23, 27, 29, 30, 29, 27,
    23, 19, 0, 0, 0, 0, 0, 0, 0, 14, 18, 20, 27, 29, 27, 20, 18, 14, 0, 0, 0, 0, 0, 0, 0, 7, 0, 13, 0, 16, 0, 13, 0, 7,
    0, 0, 0, 0, 0, 0, 0, 7, 0, 7, 0, 15, 0, 7, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 15, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 20, 23, 20, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 20, 20, 0, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 20, 23, 20, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 20, 20, 0, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90, 90, 90, 96, 90, 96, 90, 90, 90, 0, 0, 0, 0, 0, 0, 0, 90, 96, 103, 97, 94,
    97, 103, 96, 90, 0, 0, 0, 0, 0, 0, 0, 92, 98, 99, 103, 99, 103, 99, 98, 92, 0, 0, 0, 0, 0, 0, 0, 93, 108, 100, 107,
    100, 107, 100, 108, 93, 0, 0, 0, 0, 0, 0, 0, 90, 100, 99, 103, 104, 103, 99, 100, 90, 0, 0, 0, 0, 0, 0, 0, 90, 98,
    101, 102, 103, 102, 101, 98, 90, 0, 0, 0, 0, 0, 0, 0, 92, 94, 98, 95, 98, 95, 98, 94, 92, 0, 0, 0, 0, 0, 0, 0, 93,
    92, 94, 95, 92, 95, 94, 92, 93, 0, 0, 0, 0, 0, 0, 0, 85, 90, 92, 93, 78, 93, 92, 90, 85, 0, 0, 0, 0, 0, 0, 0, 88,
    85, 90, 88, 90, 88, 90, 85, 88, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 206, 208, 207, 213, 214, 213, 207, 208, 206, 0, 0, 0, 0, 0, 0, 0, 206, 212, 209,
    216, 233, 216, 209, 212, 206, 0, 0, 0, 0, 0, 0, 0, 206, 208, 207, 214, 216, 214, 207, 208, 206, 0, 0, 0, 0, 0, 0, 0,
    206, 213, 213, 216, 216, 216, 213, 213, 206, 0, 0, 0, 0, 0, 0, 0, 208, 211, 211, 214, 215, 214, 211, 211, 208, 0, 0,
    0, 0, 0, 0, 0, 208, 212, 212, 214, 215, 214, 212, 212, 208, 0, 0, 0, 0, 0, 0, 0, 204, 209, 204, 212, 214, 212, 204,
    209, 204, 0, 0, 0, 0, 0, 0, 0, 198, 208, 204, 212, 212, 212, 204, 208, 198, 0, 0, 0, 0, 0, 0, 0, 200, 208, 206, 212,
    200, 212, 206, 208, 200, 0, 0, 0, 0, 0, 0, 0, 194, 206, 204, 212, 200, 212, 204, 206, 194, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 96, 91, 90, 91, 96, 100, 100, 0, 0, 0, 0, 0, 0, 0, 98, 98, 96, 92, 89,
    92, 96, 98, 98, 0, 0, 0, 0, 0, 0, 0, 97, 97, 96, 91, 92, 91, 96, 97, 97, 0, 0, 0, 0, 0, 0, 0, 96, 99, 99, 98, 100,
    98, 99, 99, 96, 0, 0, 0, 0, 0, 0, 0, 96, 96, 96, 96, 100, 96, 96, 96, 96, 0, 0, 0, 0, 0, 0, 0, 95, 96, 99, 96, 100,
    96, 99, 96, 95, 0, 0, 0, 0, 0, 0, 0, 96, 96, 96, 96, 96, 96, 96, 96, 96, 0, 0, 0, 0, 0, 0, 0, 97, 96, 100, 99, 101,
    99, 100, 96, 97, 0, 0, 0, 0, 0, 0, 0, 96, 97, 98, 98, 98, 98, 98, 97, 96, 0, 0, 0, 0, 0, 0, 0, 96, 96, 97, 99, 99,
    99, 97, 96, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 11, 13, 11, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 19, 24, 34, 42, 44, 42, 34,
    24, 19, 0, 0, 0, 0, 0, 0, 0, 19, 24, 32, 37, 37, 37, 32, 24, 19, 0, 0, 0, 0, 0, 0, 0, 19, 23, 27, 29, 30, 29, 27,
    23, 19, 0, 0, 0, 0, 0, 0, 0, 14, 18, 20, 27, 29, 27, 20, 18, 14, 0, 0, 0, 0, 0, 0, 0, 7, 0, 13, 0, 16, 0, 13, 0, 7,
    0, 0, 0, 0, 0, 0, 0, 7, 0, 7, 0, 15, 0, 7, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 15, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ],
]

function IN_BOARD(sq) {
  return IN_BOARD_[sq] != 0
}

function IN_FORT(sq) {
  return IN_FORT_[sq] != 0
}

function RANK_Y(sq) {
  return sq >> 4
}

function FILE_X(sq) {
  return sq & 15
}

function COORD_XY(x, y) {
  return x + (y << 4)
}

function SQUARE_FLIP(sq) {
  return 254 - sq
}

function FILE_FLIP(x) {
  return 14 - x
}

function RANK_FLIP(y) {
  return 15 - y
}

function MIRROR_SQUARE(sq) {
  return COORD_XY(FILE_FLIP(FILE_X(sq)), RANK_Y(sq))
}

function SQUARE_FORWARD(sq, sd) {
  return sq - 16 + (sd << 5)
}

function KING_SPAN(sqSrc, sqDst) {
  return LEGAL_SPAN[sqDst - sqSrc + 256] == 1
}

function ADVISOR_SPAN(sqSrc, sqDst) {
  return LEGAL_SPAN[sqDst - sqSrc + 256] == 2
}

function BISHOP_SPAN(sqSrc, sqDst) {
  return LEGAL_SPAN[sqDst - sqSrc + 256] == 3
}

function BISHOP_PIN(sqSrc, sqDst) {
  return (sqSrc + sqDst) >> 1
}

function KNIGHT_PIN(sqSrc, sqDst) {
  return sqSrc + KNIGHT_PIN_[sqDst - sqSrc + 256]
}

function HOME_HALF(sq, sd) {
  return (sq & 0x80) != sd << 7
}

function AWAY_HALF(sq, sd) {
  return (sq & 0x80) == sd << 7
}

function SAME_HALF(sqSrc, sqDst) {
  return ((sqSrc ^ sqDst) & 0x80) == 0
}

function SAME_RANK(sqSrc, sqDst) {
  return ((sqSrc ^ sqDst) & 0xf0) == 0
}

function SAME_FILE(sqSrc, sqDst) {
  return ((sqSrc ^ sqDst) & 0x0f) == 0
}

function SIDE_TAG(sd) {
  return 8 + (sd << 3)
}

function OPP_SIDE_TAG(sd) {
  return 16 - (sd << 3)
}

function SRC(mv) {
  return mv & 255
}

function DST(mv) {
  return mv >> 8
}

function MOVE(sqSrc, sqDst) {
  return sqSrc + (sqDst << 8)
}

function MIRROR_MOVE(mv) {
  return MOVE(MIRROR_SQUARE(SRC(mv)), MIRROR_SQUARE(DST(mv)))
}

function MVV_LVA(pc, lva) {
  return MVV_VALUE[pc & 7] - lva
}

function CHR(n) {
  return String.fromCharCode(n)
}

function ASC(c) {
  return c.charCodeAt(0)
}

var FEN_PIECE = '        KABNRCP kabnrcp '

function CHAR_TO_PIECE(c) {
  switch (c) {
    case 'K':
      return PIECE_KING
    case 'A':
      return PIECE_ADVISOR
    case 'B':
    case 'E':
      return PIECE_BISHOP
    case 'H':
    case 'N':
      return PIECE_KNIGHT
    case 'R':
      return PIECE_ROOK
    case 'C':
      return PIECE_CANNON
    case 'P':
      return PIECE_PAWN
    default:
      return -1
  }
}

function RC4(key) {
  this.x = this.y = 0
  this.state = []
  for (var i = 0; i < 256; i++) {
    this.state.push(i)
  }
  var j = 0
  for (var i = 0; i < 256; i++) {
    j = (j + this.state[i] + key[i % key.length]) & 0xff
    this.swap(i, j)
  }
}

RC4.prototype.swap = function (i, j) {
  var t = this.state[i]
  this.state[i] = this.state[j]
  this.state[j] = t
}

RC4.prototype.nextByte = function () {
  this.x = (this.x + 1) & 0xff
  this.y = (this.y + this.state[this.x]) & 0xff
  this.swap(this.x, this.y)
  var t = (this.state[this.x] + this.state[this.y]) & 0xff
  return this.state[t]
}

RC4.prototype.nextLong = function () {
  var n0 = this.nextByte()
  var n1 = this.nextByte()
  var n2 = this.nextByte()
  var n3 = this.nextByte()
  return n0 + (n1 << 8) + (n2 << 16) + ((n3 << 24) & 0xffffffff)
}

var PreGen_zobristKeyPlayer, PreGen_zobristLockPlayer
var PreGen_zobristKeyTable = [],
  PreGen_zobristLockTable = []

var rc4 = new RC4([0])
PreGen_zobristKeyPlayer = rc4.nextLong()
rc4.nextLong()
PreGen_zobristLockPlayer = rc4.nextLong()
for (var i = 0; i < 14; i++) {
  var keys = []
  var locks = []
  for (var j = 0; j < 256; j++) {
    keys.push(rc4.nextLong())
    rc4.nextLong()
    locks.push(rc4.nextLong())
  }
  PreGen_zobristKeyTable.push(keys)
  PreGen_zobristLockTable.push(locks)
}

function Position() {
  // sdPlayer, zobristKey, zobristLock, vlWhite, vlBlack, distance;
  // squares, mvList, pcList, keyList, chkList;
}

Position.prototype.clearBoard = function () {
  this.sdPlayer = 0
  this.squares = []
  for (var sq = 0; sq < 256; sq++) {
    this.squares.push(0)
  }
  this.zobristKey = this.zobristLock = 0
  this.vlWhite = this.vlBlack = 0
}

Position.prototype.setIrrev = function () {
  this.mvList = [0]
  this.pcList = [0]
  this.keyList = [0]
  this.chkList = [this.checked()]
  this.distance = 0
}

Position.prototype.addPiece = function (sq, pc, bDel) {
  var pcAdjust
  this.squares[sq] = bDel ? 0 : pc
  if (pc < 16) {
    pcAdjust = pc - 8
    this.vlWhite += bDel ? -PIECE_VALUE[pcAdjust][sq] : PIECE_VALUE[pcAdjust][sq]
  } else {
    pcAdjust = pc - 16
    this.vlBlack += bDel ? -PIECE_VALUE[pcAdjust][SQUARE_FLIP(sq)] : PIECE_VALUE[pcAdjust][SQUARE_FLIP(sq)]
    pcAdjust += 7
  }
  this.zobristKey ^= PreGen_zobristKeyTable[pcAdjust][sq]
  this.zobristLock ^= PreGen_zobristLockTable[pcAdjust][sq]
}

Position.prototype.movePiece = function (mv) {
  var sqSrc = SRC(mv)
  var sqDst = DST(mv)
  var pc = this.squares[sqDst]
  this.pcList.push(pc)
  if (pc > 0) {
    this.addPiece(sqDst, pc, DEL_PIECE)
  }
  pc = this.squares[sqSrc]
  this.addPiece(sqSrc, pc, DEL_PIECE)
  this.addPiece(sqDst, pc, ADD_PIECE)
  this.mvList.push(mv)
}

Position.prototype.undoMovePiece = function () {
  var mv = this.mvList.pop()
  var sqSrc = SRC(mv)
  var sqDst = DST(mv)
  var pc = this.squares[sqDst]
  this.addPiece(sqDst, pc, DEL_PIECE)
  this.addPiece(sqSrc, pc, ADD_PIECE)
  pc = this.pcList.pop()
  if (pc > 0) {
    this.addPiece(sqDst, pc, ADD_PIECE)
  }
}

Position.prototype.changeSide = function () {
  this.sdPlayer = 1 - this.sdPlayer
  this.zobristKey ^= PreGen_zobristKeyPlayer
  this.zobristLock ^= PreGen_zobristLockPlayer
}

Position.prototype.makeMove = function (mv) {
  var zobristKey = this.zobristKey
  this.movePiece(mv)
  if (this.checked()) {
    this.undoMovePiece(mv)
    return false
  }
  this.keyList.push(zobristKey)
  this.changeSide()
  this.chkList.push(this.checked())
  this.distance++
  return true
}

Position.prototype.undoMakeMove = function () {
  this.distance--
  this.chkList.pop()
  this.changeSide()
  this.keyList.pop()
  this.undoMovePiece()
}

Position.prototype.nullMove = function () {
  this.mvList.push(0)
  this.pcList.push(0)
  this.keyList.push(this.zobristKey)
  this.changeSide()
  this.chkList.push(false)
  this.distance++
}

Position.prototype.undoNullMove = function () {
  this.distance--
  this.chkList.pop()
  this.changeSide()
  this.keyList.pop()
  this.pcList.pop()
  this.mvList.pop()
}

Position.prototype.fromFen = function (fen) {
  this.clearBoard()
  var y = RANK_TOP
  var x = FILE_LEFT
  var index = 0
  if (index == fen.length) {
    this.setIrrev()
    return
  }
  var c = fen.charAt(index)
  while (c != ' ') {
    if (c == '/') {
      x = FILE_LEFT
      y++
      if (y > RANK_BOTTOM) {
        break
      }
    } else if (c >= '1' && c <= '9') {
      x += ASC(c) - ASC('0')
    } else if (c >= 'A' && c <= 'Z') {
      if (x <= FILE_RIGHT) {
        var pt = CHAR_TO_PIECE(c)
        if (pt >= 0) {
          this.addPiece(COORD_XY(x, y), pt + 8)
        }
        x++
      }
    } else if (c >= 'a' && c <= 'z') {
      if (x <= FILE_RIGHT) {
        var pt = CHAR_TO_PIECE(CHR(ASC(c) + ASC('A') - ASC('a')))
        if (pt >= 0) {
          this.addPiece(COORD_XY(x, y), pt + 16)
        }
        x++
      }
    }
    index++
    if (index == fen.length) {
      this.setIrrev()
      return
    }
    c = fen.charAt(index)
  }
  index++
  if (index == fen.length) {
    this.setIrrev()
    return
  }
  if (this.sdPlayer == (fen.charAt(index) == 'b' ? 0 : 1)) {
    this.changeSide()
  }
  this.setIrrev()
}

Position.prototype.toFen = function () {
  var fen = ''
  for (var y = RANK_TOP; y <= RANK_BOTTOM; y++) {
    var k = 0
    for (var x = FILE_LEFT; x <= FILE_RIGHT; x++) {
      var pc = this.squares[COORD_XY(x, y)]
      if (pc > 0) {
        if (k > 0) {
          fen += CHR(ASC('0') + k)
          k = 0
        }
        fen += FEN_PIECE.charAt(pc)
      } else {
        k++
      }
    }
    if (k > 0) {
      fen += CHR(ASC('0') + k)
    }
    fen += '/'
  }
  return fen.substring(0, fen.length - 1) + (this.sdPlayer == 0 ? ' w' : ' b')
}

Position.prototype.generateMoves = function (vls) {
  var mvs = []
  var pcSelfSide = SIDE_TAG(this.sdPlayer)
  var pcOppSide = OPP_SIDE_TAG(this.sdPlayer)
  for (var sqSrc = 0; sqSrc < 256; sqSrc++) {
    var pcSrc = this.squares[sqSrc]
    if ((pcSrc & pcSelfSide) == 0) {
      continue
    }
    switch (pcSrc - pcSelfSide) {
      case PIECE_KING:
        for (var i = 0; i < 4; i++) {
          var sqDst = sqSrc + KING_DELTA[i]
          if (!IN_FORT(sqDst)) {
            continue
          }
          var pcDst = this.squares[sqDst]
          if (vls == null) {
            if ((pcDst & pcSelfSide) == 0) {
              mvs.push(MOVE(sqSrc, sqDst))
            }
          } else if ((pcDst & pcOppSide) != 0) {
            mvs.push(MOVE(sqSrc, sqDst))
            vls.push(MVV_LVA(pcDst, 5))
          }
        }
        break
      case PIECE_ADVISOR:
        for (var i = 0; i < 4; i++) {
          var sqDst = sqSrc + ADVISOR_DELTA[i]
          if (!IN_FORT(sqDst)) {
            continue
          }
          var pcDst = this.squares[sqDst]
          if (vls == null) {
            if ((pcDst & pcSelfSide) == 0) {
              mvs.push(MOVE(sqSrc, sqDst))
            }
          } else if ((pcDst & pcOppSide) != 0) {
            mvs.push(MOVE(sqSrc, sqDst))
            vls.push(MVV_LVA(pcDst, 1))
          }
        }
        break
      case PIECE_BISHOP:
        for (var i = 0; i < 4; i++) {
          var sqDst = sqSrc + ADVISOR_DELTA[i]
          if (!(IN_BOARD(sqDst) && HOME_HALF(sqDst, this.sdPlayer) && this.squares[sqDst] == 0)) {
            continue
          }
          sqDst += ADVISOR_DELTA[i]
          var pcDst = this.squares[sqDst]
          if (vls == null) {
            if ((pcDst & pcSelfSide) == 0) {
              mvs.push(MOVE(sqSrc, sqDst))
            }
          } else if ((pcDst & pcOppSide) != 0) {
            mvs.push(MOVE(sqSrc, sqDst))
            vls.push(MVV_LVA(pcDst, 1))
          }
        }
        break
      case PIECE_KNIGHT:
        for (var i = 0; i < 4; i++) {
          var sqDst = sqSrc + KING_DELTA[i]
          if (this.squares[sqDst] > 0) {
            continue
          }
          for (var j = 0; j < 2; j++) {
            sqDst = sqSrc + KNIGHT_DELTA[i][j]
            if (!IN_BOARD(sqDst)) {
              continue
            }
            var pcDst = this.squares[sqDst]
            if (vls == null) {
              if ((pcDst & pcSelfSide) == 0) {
                mvs.push(MOVE(sqSrc, sqDst))
              }
            } else if ((pcDst & pcOppSide) != 0) {
              mvs.push(MOVE(sqSrc, sqDst))
              vls.push(MVV_LVA(pcDst, 1))
            }
          }
        }
        break
      case PIECE_ROOK:
        for (var i = 0; i < 4; i++) {
          var delta = KING_DELTA[i]
          var sqDst = sqSrc + delta
          while (IN_BOARD(sqDst)) {
            var pcDst = this.squares[sqDst]
            if (pcDst == 0) {
              if (vls == null) {
                mvs.push(MOVE(sqSrc, sqDst))
              }
            } else {
              if ((pcDst & pcOppSide) != 0) {
                mvs.push(MOVE(sqSrc, sqDst))
                if (vls != null) {
                  vls.push(MVV_LVA(pcDst, 4))
                }
              }
              break
            }
            sqDst += delta
          }
        }
        break
      case PIECE_CANNON:
        for (var i = 0; i < 4; i++) {
          var delta = KING_DELTA[i]
          var sqDst = sqSrc + delta
          while (IN_BOARD(sqDst)) {
            var pcDst = this.squares[sqDst]
            if (pcDst == 0) {
              if (vls == null) {
                mvs.push(MOVE(sqSrc, sqDst))
              }
            } else {
              break
            }
            sqDst += delta
          }
          sqDst += delta
          while (IN_BOARD(sqDst)) {
            var pcDst = this.squares[sqDst]
            if (pcDst > 0) {
              if ((pcDst & pcOppSide) != 0) {
                mvs.push(MOVE(sqSrc, sqDst))
                if (vls != null) {
                  vls.push(MVV_LVA(pcDst, 4))
                }
              }
              break
            }
            sqDst += delta
          }
        }
        break
      case PIECE_PAWN:
        var sqDst = SQUARE_FORWARD(sqSrc, this.sdPlayer)
        if (IN_BOARD(sqDst)) {
          var pcDst = this.squares[sqDst]
          if (vls == null) {
            if ((pcDst & pcSelfSide) == 0) {
              mvs.push(MOVE(sqSrc, sqDst))
            }
          } else if ((pcDst & pcOppSide) != 0) {
            mvs.push(MOVE(sqSrc, sqDst))
            vls.push(MVV_LVA(pcDst, 2))
          }
        }
        if (AWAY_HALF(sqSrc, this.sdPlayer)) {
          for (var delta = -1; delta <= 1; delta += 2) {
            sqDst = sqSrc + delta
            if (IN_BOARD(sqDst)) {
              var pcDst = this.squares[sqDst]
              if (vls == null) {
                if ((pcDst & pcSelfSide) == 0) {
                  mvs.push(MOVE(sqSrc, sqDst))
                }
              } else if ((pcDst & pcOppSide) != 0) {
                mvs.push(MOVE(sqSrc, sqDst))
                vls.push(MVV_LVA(pcDst, 2))
              }
            }
          }
        }
        break
    }
  }
  return mvs
}

Position.prototype.legalMove = function (mv) {
  var sqSrc = SRC(mv)
  var pcSrc = this.squares[sqSrc]
  var pcSelfSide = SIDE_TAG(this.sdPlayer)
  if ((pcSrc & pcSelfSide) == 0) {
    return false
  }

  var sqDst = DST(mv)
  var pcDst = this.squares[sqDst]
  if ((pcDst & pcSelfSide) != 0) {
    return false
  }

  switch (pcSrc - pcSelfSide) {
    case PIECE_KING:
      return IN_FORT(sqDst) && KING_SPAN(sqSrc, sqDst)
    case PIECE_ADVISOR:
      return IN_FORT(sqDst) && ADVISOR_SPAN(sqSrc, sqDst)
    case PIECE_BISHOP:
      return SAME_HALF(sqSrc, sqDst) && BISHOP_SPAN(sqSrc, sqDst) && this.squares[BISHOP_PIN(sqSrc, sqDst)] == 0
    case PIECE_KNIGHT:
      var sqPin = KNIGHT_PIN(sqSrc, sqDst)
      return sqPin != sqSrc && this.squares[sqPin] == 0
    case PIECE_ROOK:
    case PIECE_CANNON:
      var delta
      if (SAME_RANK(sqSrc, sqDst)) {
        delta = sqDst < sqSrc ? -1 : 1
      } else if (SAME_FILE(sqSrc, sqDst)) {
        delta = sqDst < sqSrc ? -16 : 16
      } else {
        return false
      }
      var sqPin = sqSrc + delta
      while (sqPin != sqDst && this.squares[sqPin] == 0) {
        sqPin += delta
      }
      if (sqPin == sqDst) {
        return pcDst == 0 || pcSrc - pcSelfSide == PIECE_ROOK
      }
      if (pcDst == 0 || pcSrc - pcSelfSide != PIECE_CANNON) {
        return false
      }
      sqPin += delta
      while (sqPin != sqDst && this.squares[sqPin] == 0) {
        sqPin += delta
      }
      return sqPin == sqDst
    case PIECE_PAWN:
      if (AWAY_HALF(sqDst, this.sdPlayer) && (sqDst == sqSrc - 1 || sqDst == sqSrc + 1)) {
        return true
      }
      return sqDst == SQUARE_FORWARD(sqSrc, this.sdPlayer)
    default:
      return false
  }
}

Position.prototype.checked = function () {
  var pcSelfSide = SIDE_TAG(this.sdPlayer)
  var pcOppSide = OPP_SIDE_TAG(this.sdPlayer)
  for (var sqSrc = 0; sqSrc < 256; sqSrc++) {
    if (this.squares[sqSrc] != pcSelfSide + PIECE_KING) {
      continue
    }
    if (this.squares[SQUARE_FORWARD(sqSrc, this.sdPlayer)] == pcOppSide + PIECE_PAWN) {
      return true
    }
    for (var delta = -1; delta <= 1; delta += 2) {
      if (this.squares[sqSrc + delta] == pcOppSide + PIECE_PAWN) {
        return true
      }
    }
    for (var i = 0; i < 4; i++) {
      if (this.squares[sqSrc + ADVISOR_DELTA[i]] != 0) {
        continue
      }
      for (var j = 0; j < 2; j++) {
        var pcDst = this.squares[sqSrc + KNIGHT_CHECK_DELTA[i][j]]
        if (pcDst == pcOppSide + PIECE_KNIGHT) {
          return true
        }
      }
    }
    for (var i = 0; i < 4; i++) {
      var delta = KING_DELTA[i]
      var sqDst = sqSrc + delta
      while (IN_BOARD(sqDst)) {
        var pcDst = this.squares[sqDst]
        if (pcDst > 0) {
          if (pcDst == pcOppSide + PIECE_ROOK || pcDst == pcOppSide + PIECE_KING) {
            return true
          }
          break
        }
        sqDst += delta
      }
      sqDst += delta
      while (IN_BOARD(sqDst)) {
        var pcDst = this.squares[sqDst]
        if (pcDst > 0) {
          if (pcDst == pcOppSide + PIECE_CANNON) {
            return true
          }
          break
        }
        sqDst += delta
      }
    }
    return false
  }
  return false
}

Position.prototype.isMate = function () {
  var mvs = this.generateMoves(null)
  for (var i = 0; i < mvs.length; i++) {
    if (this.makeMove(mvs[i])) {
      this.undoMakeMove()
      return false
    }
  }
  return true
}

Position.prototype.mateValue = function () {
  return this.distance - MATE_VALUE
}

Position.prototype.banValue = function () {
  return this.distance - BAN_VALUE
}

Position.prototype.drawValue = function () {
  return (this.distance & 1) == 0 ? -DRAW_VALUE : DRAW_VALUE
}

Position.prototype.evaluate = function () {
  var vl = (this.sdPlayer == 0 ? this.vlWhite - this.vlBlack : this.vlBlack - this.vlWhite) + ADVANCED_VALUE
  return vl == this.drawValue() ? vl - 1 : vl
}

Position.prototype.nullOkay = function () {
  return (this.sdPlayer == 0 ? this.vlWhite : this.vlBlack) > NULL_OKAY_MARGIN
}

Position.prototype.nullSafe = function () {
  return (this.sdPlayer == 0 ? this.vlWhite : this.vlBlack) > NULL_SAFE_MARGIN
}

Position.prototype.inCheck = function () {
  return this.chkList[this.chkList.length - 1]
}

Position.prototype.captured = function () {
  return this.pcList[this.pcList.length - 1] > 0
}

Position.prototype.repValue = function (vlRep) {
  var vlReturn = ((vlRep & 2) == 0 ? 0 : this.banValue()) + ((vlRep & 4) == 0 ? 0 : -this.banValue())
  return vlReturn == 0 ? this.drawValue() : vlReturn
}

Position.prototype.repStatus = function (recur_) {
  var recur = recur_
  var selfSide = false
  var perpCheck = true
  var oppPerpCheck = true
  var index = this.mvList.length - 1
  while (this.mvList[index] > 0 && this.pcList[index] == 0) {
    if (selfSide) {
      perpCheck = perpCheck && this.chkList[index]
      if (this.keyList[index] == this.zobristKey) {
        recur--
        if (recur == 0) {
          return 1 + (perpCheck ? 2 : 0) + (oppPerpCheck ? 4 : 0)
        }
      }
    } else {
      oppPerpCheck = oppPerpCheck && this.chkList[index]
    }
    selfSide = !selfSide
    index--
  }
  return 0
}

Position.prototype.mirror = function () {
  var pos = new Position()
  pos.clearBoard()
  for (var sq = 0; sq < 256; sq++) {
    var pc = this.squares[sq]
    if (pc > 0) {
      pos.addPiece(MIRROR_SQUARE(sq), pc)
    }
  }
  if (this.sdPlayer == 1) {
    pos.changeSide()
  }
  return pos
}

Position.prototype.bookMove = function () {
  if (typeof BOOK_DAT != 'object' || BOOK_DAT.length == 0) {
    return 0
  }
  var mirror = false
  var lock = this.zobristLock >>> 1 // Convert into Unsigned
  var index = binarySearch(BOOK_DAT, lock)
  if (index < 0) {
    mirror = true
    lock = this.mirror().zobristLock >>> 1 // Convert into Unsigned
    index = binarySearch(BOOK_DAT, lock)
  }
  if (index < 0) {
    return 0
  }
  index--
  while (index >= 0 && BOOK_DAT[index][0] == lock) {
    index--
  }
  var mvs = [],
    vls = []
  var value = 0
  index++
  while (index < BOOK_DAT.length && BOOK_DAT[index][0] == lock) {
    var mv = BOOK_DAT[index][1]
    mv = mirror ? MIRROR_MOVE(mv) : mv
    if (this.legalMove(mv)) {
      mvs.push(mv)
      var vl = BOOK_DAT[index][2]
      vls.push(vl)
      value += vl
    }
    index++
  }
  if (value == 0) {
    return 0
  }
  value = Math.floor(Math.random() * value)
  for (index = 0; index < mvs.length; index++) {
    value -= vls[index]
    if (value < 0) {
      break
    }
  }
  return mvs[index]
}

Position.prototype.historyIndex = function (mv) {
  return ((this.squares[SRC(mv)] - 8) << 8) + DST(mv)
}
//================= Search ==========

var SHELL_STEP = [0, 1, 4, 13, 40, 121, 364, 1093]

function shellSort(mvs, vls) {
  var stepLevel = 1
  while (SHELL_STEP[stepLevel] < mvs.length) {
    stepLevel++
  }
  stepLevel--
  while (stepLevel > 0) {
    var step = SHELL_STEP[stepLevel]
    for (var i = step; i < mvs.length; i++) {
      var mvBest = mvs[i]
      var vlBest = vls[i]
      var j = i - step
      while (j >= 0 && vlBest > vls[j]) {
        mvs[j + step] = mvs[j]
        vls[j + step] = vls[j]
        j -= step
      }
      mvs[j + step] = mvBest
      vls[j + step] = vlBest
    }
    stepLevel--
  }
}

var PHASE_HASH = 0
var PHASE_KILLER_1 = 1
var PHASE_KILLER_2 = 2
var PHASE_GEN_MOVES = 3
var PHASE_REST = 4

function MoveSort(mvHash, pos, killerTable, historyTable) {
  this.mvs = []
  this.vls = []
  this.mvHash = this.mvKiller1 = this.mvKiller2 = 0
  this.pos = pos
  this.historyTable = historyTable
  this.phase = PHASE_HASH
  this.index = 0
  this.singleReply = false

  if (pos.inCheck()) {
    this.phase = PHASE_REST
    var mvsAll = pos.generateMoves(null)
    for (var i = 0; i < mvsAll.length; i++) {
      var mv = mvsAll[i]
      if (!pos.makeMove(mv)) {
        continue
      }
      pos.undoMakeMove()
      this.mvs.push(mv)
      this.vls.push(mv == mvHash ? 0x7fffffff : historyTable[pos.historyIndex(mv)])
    }
    shellSort(this.mvs, this.vls)
    this.singleReply = this.mvs.length == 1
  } else {
    this.mvHash = mvHash
    this.mvKiller1 = killerTable[pos.distance][0]
    this.mvKiller2 = killerTable[pos.distance][1]
  }
}

MoveSort.prototype.next = function () {
  switch (this.phase) {
    case PHASE_HASH:
      this.phase = PHASE_KILLER_1
      if (this.mvHash > 0) {
        return this.mvHash
      }
    // No Break
    case PHASE_KILLER_1:
      this.phase = PHASE_KILLER_2
      if (this.mvKiller1 != this.mvHash && this.mvKiller1 > 0 && this.pos.legalMove(this.mvKiller1)) {
        return this.mvKiller1
      }
    // No Break
    case PHASE_KILLER_2:
      this.phase = PHASE_GEN_MOVES
      if (this.mvKiller2 != this.mvHash && this.mvKiller2 > 0 && this.pos.legalMove(this.mvKiller2)) {
        return this.mvKiller2
      }
    // No Break
    case PHASE_GEN_MOVES:
      this.phase = PHASE_REST
      this.mvs = this.pos.generateMoves(null)
      this.vls = []
      for (var i = 0; i < this.mvs.length; i++) {
        this.vls.push(this.historyTable[this.pos.historyIndex(this.mvs[i])])
      }
      shellSort(this.mvs, this.vls)
      this.index = 0
    // No Break
    default:
      while (this.index < this.mvs.length) {
        var mv = this.mvs[this.index]
        this.index++
        if (mv != this.mvHash && mv != this.mvKiller1 && mv != this.mvKiller2) {
          return mv
        }
      }
  }
  return 0
}

var LIMIT_DEPTH = 64
var NULL_DEPTH = 2
var RANDOMNESS = 8

var HASH_ALPHA = 1
var HASH_BETA = 2
var HASH_PV = 3

function Search(pos, hashLevel) {
  this.hashMask = (1 << hashLevel) - 1
  this.pos = pos
}

Search.prototype.getHashItem = function () {
  return this.hashTable[this.pos.zobristKey & this.hashMask]
}

Search.prototype.probeHash = function (vlAlpha, vlBeta, depth, mv) {
  var hash = this.getHashItem()
  if (hash.zobristLock != this.pos.zobristLock) {
    mv[0] = 0
    return -MATE_VALUE
  }
  mv[0] = hash.mv
  var mate = false
  if (hash.vl > WIN_VALUE) {
    if (hash.vl <= BAN_VALUE) {
      return -MATE_VALUE
    }
    hash.vl -= this.pos.distance
    mate = true
  } else if (hash.vl < -WIN_VALUE) {
    if (hash.vl >= -BAN_VALUE) {
      return -MATE_VALUE
    }
    hash.vl += this.pos.distance
    mate = true
  } else if (hash.vl == this.pos.drawValue()) {
    return -MATE_VALUE
  }
  if (hash.depth < depth && !mate) {
    return -MATE_VALUE
  }
  if (hash.flag == HASH_BETA) {
    return hash.vl >= vlBeta ? hash.vl : -MATE_VALUE
  }
  if (hash.flag == HASH_ALPHA) {
    return hash.vl <= vlAlpha ? hash.vl : -MATE_VALUE
  }
  return hash.vl
}

Search.prototype.recordHash = function (flag, vl, depth, mv) {
  var hash = this.getHashItem()
  if (hash.depth > depth) {
    return
  }
  hash.flag = flag
  hash.depth = depth
  if (vl > WIN_VALUE) {
    if (mv == 0 && vl <= BAN_VALUE) {
      return
    }
    hash.vl = vl + this.pos.distance
  } else if (vl < -WIN_VALUE) {
    if (mv == 0 && vl >= -BAN_VALUE) {
      return
    }
    hash.vl = vl - this.pos.distance
  } else if (vl == this.pos.drawValue() && mv == 0) {
    return
  } else {
    hash.vl = vl
  }
  hash.mv = mv
  hash.zobristLock = this.pos.zobristLock
}

Search.prototype.setBestMove = function (mv, depth) {
  this.historyTable[this.pos.historyIndex(mv)] += depth * depth
  var mvsKiller = this.killerTable[this.pos.distance]
  if (mvsKiller[0] != mv) {
    mvsKiller[1] = mvsKiller[0]
    mvsKiller[0] = mv
  }
}

Search.prototype.searchQuiesc = function (vlAlpha_, vlBeta) {
  var vlAlpha = vlAlpha_
  this.allNodes++
  var vl = this.pos.mateValue()
  if (vl >= vlBeta) {
    return vl
  }
  var vlRep = this.pos.repStatus(1)
  if (vlRep > 0) {
    return this.pos.repValue(vlRep)
  }
  if (this.pos.distance == LIMIT_DEPTH) {
    return this.pos.evaluate()
  }
  var vlBest = -MATE_VALUE
  var mvs = [],
    vls = []
  if (this.pos.inCheck()) {
    mvs = this.pos.generateMoves(null)
    for (var i = 0; i < mvs.length; i++) {
      vls.push(this.historyTable[this.pos.historyIndex(mvs[i])])
    }
    shellSort(mvs, vls)
  } else {
    vl = this.pos.evaluate()
    if (vl > vlBest) {
      if (vl >= vlBeta) {
        return vl
      }
      vlBest = vl
      vlAlpha = Math.max(vl, vlAlpha)
    }
    mvs = this.pos.generateMoves(vls)
    shellSort(mvs, vls)
    for (var i = 0; i < mvs.length; i++) {
      if (vls[i] < 10 || (vls[i] < 20 && HOME_HALF(DST(mvs[i]), this.pos.sdPlayer))) {
        mvs.length = i
        break
      }
    }
  }
  for (var i = 0; i < mvs.length; i++) {
    if (!this.pos.makeMove(mvs[i])) {
      continue
    }
    vl = -this.searchQuiesc(-vlBeta, -vlAlpha)
    this.pos.undoMakeMove()
    if (vl > vlBest) {
      if (vl >= vlBeta) {
        return vl
      }
      vlBest = vl
      vlAlpha = Math.max(vl, vlAlpha)
    }
  }
  return vlBest == -MATE_VALUE ? this.pos.mateValue() : vlBest
}

Search.prototype.searchFull = function (vlAlpha_, vlBeta, depth, noNull) {
  var vlAlpha = vlAlpha_
  if (depth <= 0) {
    return this.searchQuiesc(vlAlpha, vlBeta)
  }
  this.allNodes++
  var vl = this.pos.mateValue()
  if (vl >= vlBeta) {
    return vl
  }
  var vlRep = this.pos.repStatus(1)
  if (vlRep > 0) {
    return this.pos.repValue(vlRep)
  }
  var mvHash = [0]
  vl = this.probeHash(vlAlpha, vlBeta, depth, mvHash)
  if (vl > -MATE_VALUE) {
    return vl
  }
  if (this.pos.distance == LIMIT_DEPTH) {
    return this.pos.evaluate()
  }
  if (!noNull && !this.pos.inCheck() && this.pos.nullOkay()) {
    this.pos.nullMove()
    vl = -this.searchFull(-vlBeta, 1 - vlBeta, depth - NULL_DEPTH - 1, true)
    this.pos.undoNullMove()
    if (vl >= vlBeta && (this.pos.nullSafe() || this.searchFull(vlAlpha, vlBeta, depth - NULL_DEPTH, true) >= vlBeta)) {
      return vl
    }
  }
  var hashFlag = HASH_ALPHA
  var vlBest = -MATE_VALUE
  var mvBest = 0
  var sort = new MoveSort(mvHash[0], this.pos, this.killerTable, this.historyTable)
  var mv
  while ((mv = sort.next()) > 0) {
    if (!this.pos.makeMove(mv)) {
      continue
    }
    var newDepth = this.pos.inCheck() || sort.singleReply ? depth : depth - 1
    if (vlBest == -MATE_VALUE) {
      vl = -this.searchFull(-vlBeta, -vlAlpha, newDepth, false)
    } else {
      vl = -this.searchFull(-vlAlpha - 1, -vlAlpha, newDepth, false)
      if (vl > vlAlpha && vl < vlBeta) {
        vl = -this.searchFull(-vlBeta, -vlAlpha, newDepth, false)
      }
    }
    this.pos.undoMakeMove()
    if (vl > vlBest) {
      vlBest = vl
      if (vl >= vlBeta) {
        hashFlag = HASH_BETA
        mvBest = mv
        break
      }
      if (vl > vlAlpha) {
        vlAlpha = vl
        hashFlag = HASH_PV
        mvBest = mv
      }
    }
  }
  if (vlBest == -MATE_VALUE) {
    return this.pos.mateValue()
  }
  this.recordHash(hashFlag, vlBest, depth, mvBest)
  if (mvBest > 0) {
    this.setBestMove(mvBest, depth)
  }
  return vlBest
}

Search.prototype.searchRoot = function (depth) {
  var vlBest = -MATE_VALUE
  var sort = new MoveSort(this.mvResult, this.pos, this.killerTable, this.historyTable)
  var mv
  while ((mv = sort.next()) > 0) {
    if (!this.pos.makeMove(mv)) {
      continue
    }
    var newDepth = this.pos.inCheck() ? depth : depth - 1
    var vl
    if (vlBest == -MATE_VALUE) {
      vl = -this.searchFull(-MATE_VALUE, MATE_VALUE, newDepth, true)
    } else {
      vl = -this.searchFull(-vlBest - 1, -vlBest, newDepth, false)
      if (vl > vlBest) {
        vl = -this.searchFull(-MATE_VALUE, -vlBest, newDepth, true)
      }
    }
    this.pos.undoMakeMove()
    if (vl > vlBest) {
      vlBest = vl
      this.mvResult = mv
      if (vlBest > -WIN_VALUE && vlBest < WIN_VALUE) {
        vlBest += Math.floor(Math.random() * RANDOMNESS) - Math.floor(Math.random() * RANDOMNESS)
        vlBest = vlBest == this.pos.drawValue() ? vlBest - 1 : vlBest
      }
    }
  }
  this.setBestMove(this.mvResult, depth)
  return vlBest
}

Search.prototype.searchUnique = function (vlBeta, depth) {
  var sort = new MoveSort(this.mvResult, this.pos, this.killerTable, this.historyTable)
  sort.next()
  var mv
  while ((mv = sort.next()) > 0) {
    if (!this.pos.makeMove(mv)) {
      continue
    }
    var vl = -this.searchFull(-vlBeta, 1 - vlBeta, this.pos.inCheck() ? depth : depth - 1, false)
    this.pos.undoMakeMove()
    if (vl >= vlBeta) {
      return false
    }
  }
  return true
}

Search.prototype.searchMain = function (depth, millis) {
  this.mvResult = this.pos.bookMove()
  if (this.mvResult > 0) {
    this.pos.makeMove(this.mvResult)
    if (this.pos.repStatus(3) == 0) {
      this.pos.undoMakeMove()
      return this.mvResult
    }
    this.pos.undoMakeMove()
  }
  this.hashTable = []
  for (var i = 0; i <= this.hashMask; i++) {
    this.hashTable.push({ depth: 0, flag: 0, vl: 0, mv: 0, zobristLock: 0 })
  }
  this.killerTable = []
  for (var i = 0; i < LIMIT_DEPTH; i++) {
    this.killerTable.push([0, 0])
  }
  this.historyTable = []
  for (var i = 0; i < 4096; i++) {
    this.historyTable.push(0)
  }
  this.mvResult = 0
  this.allNodes = 0
  this.pos.distance = 0
  var t = new Date().getTime()
  for (var i = 1; i <= depth; i++) {
    var vl = this.searchRoot(i)
    this.allMillis = new Date().getTime() - t
    if (this.allMillis > millis) {
      break
    }
    if (vl > WIN_VALUE || vl < -WIN_VALUE) {
      break
    }
    if (this.searchUnique(1 - WIN_VALUE, i)) {
      break
    }
  }
  return this.mvResult
}

Search.prototype.getKNPS = function () {
  return this.allNodes / this.allMillis
}

// ================= cchess
function CHR(n) {
  return String.fromCharCode(n)
}

function ASC(c) {
  return c.charCodeAt(0)
}

function move2Iccs(mv) {
  var sqSrc = SRC(mv)
  var sqDst = DST(mv)
  return (
    CHR(ASC('A') + FILE_X(sqSrc) - FILE_LEFT) +
    CHR(ASC('9') - RANK_Y(sqSrc) + RANK_TOP) +
    '-' +
    CHR(ASC('A') + FILE_X(sqDst) - FILE_LEFT) +
    CHR(ASC('9') - RANK_Y(sqDst) + RANK_TOP)
  )
}

//============================= Code ============
console.log = function (message, board) {
  if (message === 'onMove - board: ') {
    window.JACOB_BOARD = board
  }
}

window.JACOB_FEN_MAP = [
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
  if (!window.JACOB_BOARD) {
    return ''
  }

  let map = window.JACOB_FEN_MAP
  let fen = ''

  for (let i = 9; i >= 0; i--) {
    let line = ''
    let space = 0
    for (let j = 0; j < 9; j++) {
      let index = window.JACOB_BOARD[j][i]
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
  if (!window.JACOB_BOARD) {
    return
  }

  let currentFen = jacob_boardToFen()
  if (window.JACOB_FEN == currentFen) {
    return
  }

  window.JACOB_FEN = currentFen
  $('#jacob_next_move').text('thinking')
  jacobPos.fromFen(window.JACOB_FEN + ' w')
  let millis = window.JACOB_TIME ? window.JACOB_TIME : 1000
  let move = jacobSearch.searchMain(64, millis)
  let moveText = move2Iccs(move)

  $('#jacob_next_move').text(moveText)
  showFromTo(move)
}

window.JACOB_TIME = 1000
window.JACOB_BOARD = null
window.JACOB_FEN = null
let jacobPos = new Position()
let jacobSearch = new Search(jacobPos, 16)
