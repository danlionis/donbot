enum TokenType {
  Command,
  Arg,
  Flag,
}

// interface Token {
//   type: TokenType;
//   value: string;
// }

type StringToken = Token<string>;

interface FlagTokenData {
  flag: string;
  value: string;
}

class Token<T> {
  public type: TokenType;
  public value: T;
}

function lex(input: string) {
  let tokens: string[] = [];
}
