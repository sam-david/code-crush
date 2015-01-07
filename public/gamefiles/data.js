var keyIndex = {
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  'a': 65,
  'b': 66,
  'c': 67,
  'd': 68,
  'e': 69,
  'f': 70,
  'g': 71,
  'h': 72,
  'i': 73,
  'j': 74,
  'k': 75,
  'l': 76,
  'm': 77,
  'n': 78,
  'o': 79,
  'p': 80,
  'q': 81,
  'r': 82,
  's': 83,
  't': 84,
  'u': 85,
  'v': 86,
  'w': 87,
  'x': 88,
  'y': 89,
  'z': 90,
  'A': 65,
  'B': 66,
  'C': 67,
  'D': 68,
  'E': 69,
  'F': 70,
  'G': 71,
  'H': 72,
  'I': 73,
  'J': 74,
  'K': 75,
  'L': 76,
  'M': 77,
  'N': 78,
  'O': 79,
  'P': 80,
  'Q': 81,
  'R': 82,
  'S': 83,
  'T': 84,
  'U': 85,
  'V': 86,
  'W': 87,
  'X': 88,
  'Y': 89,
  'Z': 90,
  ' ': 32,
  ';': 186,
  ':': 186,
  '=': 187,
  ',': 188,
  '<': 188,
  '>': 190,
  '.': 190,
  '/': 191,
  '[': 219,
  ']': 221,
  '{': 219,
  '}': 221,
  "'": 222,
  '"': 222,
  "|": 220,
  "+": 187,
  "-": 189,
  '%': 53,
  '*': 56,
  '$': 52,
  '_': 189,
  '?': 191,
  "(": 57,
  ")": 48,
  "^": 54,
  "!": 49,
  "#": 51,
 '\\': 220
};


// var levelOneLines = [
// "def mission",
// 'print "save the world"',
// "end",
// "puts 'through your code'",
// "def boom",
// 'print "explode"',
// "end"
// "'1234567'.length"
// "p 7+3",
// "m = 8*2",
// "def sqr(x)",
// "return x*x",
// "end",
// "r = 3%5",
// "rand(2).times {",
// "a = rand(300)}",
// "name = gets.chomp",
// 'puts "Hi! #{name}"',
// "line(8)",
// "line(5,'*')",
// "line(11,'+','=')",
// "def so_close",
// "print 'c:\books\net\apps\tools'",
// "end",
// "(5..10).each { |x| print x }"
// ]

var levelOneLines = [
"def mission",
'print "save the world"',
"end"
  // "puts 'through your code'",
  // "def boom",
  // 'print "explode"',
  // "end",
  // "[1,3,4].length",
  // "p 7+3",
  // "m = 8*2",
  // "def sqr(x)",
  // "return x*x",
  // "end",
  // "r = 3%5",
  // "rand(2).times {",
  // "a = rand(300)}",
  // "name = gets.chomp",
  // 'puts "Hi! #{name}"',
  // "line(8)",
  // "line(5,'*')",
  // "line(11,'+','=')",
  // "def so_close",
  // "print 'c:\\books\\net\\apps'",
  // "end",
  // "(5..10).each { |x| print x }"
  ]

  var levelTwoLines = [
  "this",
  "is",
  "awesome"
  ]

  var levelThreeLines = [
  "best",
  "game",
  "ever"
  ]

  var levelFourLines = [
  "this",
  "is",
  "easy"
  ]

  var levelFiveLines = [
  "megamoth",
  "time",
  "boss"
  ]
  var dbcSnippets = [

    //pig latin
    'puts to_roman(55) == "LV"',
    'puts to_roman(68) == "LXVIII"',
    'puts to_roman(468) == "CCCCLXVIII"',
    'puts to_roman(3468) == "MMMCCCCLXVIII"',

    //dictonary
    'def dictionary_sort',
    'dictionary_list = []',
    'puts "Type a word: "',
    'word = gets.chomp',
    'dictionary_list << word.split(" ").sort!',
    'word_sort(dictionary_list)',
    'end',

    //nested array
    'nested_array = [ [1, 2], [3, 4], [5, 6] ]',
    'puts chessboard[7][0] == "W_Rook"',
    'puts table[3][2] == "Shooting Guard"',
    'puts table[1][3] == [14, 32, 7, 0, 23]',

    // orange tree
    'tree = OrangeTree.new',
    'until tree.dead?',
    'basket = []',
    'while tree.any_oranges?',
    'basket << tree.pick_an_orange!',
    'end',
    'puts "Year #{tree.age} Report"',
    'puts "Tree height: #{tree.height} feet"',
    'tree.age!',
    'end',

    //Ruby Racer
    'Class RubyRacer',
    'attr_reader :players, :length',
    'def initialize(players, length = 30)',
    '@players_position = Hash.new',
    '@players = players',
    '@length = length',
    '@track = []',
    'end',

    // Sudoku
    'class Sudoku',
    'attr_reader :all_rows, :all_columns, :all_grids',
    'def initialize(board_string)',
    '@board_string = board_string',
    '@all_rows, @all_columns = []',
    '@all_grids = Array.new(9) { Array.new }',
    'end'
    ]
