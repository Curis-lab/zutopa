interface IColor {
  message: string;
  color?: "BG_BLUE" | "BG_GREEN" | "BG_RED";
}

const RESET = "\x1b[0m";

const bg_colors = {
  BG_RED: "\x1b[41m",
  BG_GREEN: "\x1b[42m",
  BG_BLUE: "\x1b[44m",
};

export const highlight = ({ message, color = "BG_GREEN" }: IColor): void => {
  console.log(bg_colors[color] + "\x1b[37m" + message + RESET);
};
