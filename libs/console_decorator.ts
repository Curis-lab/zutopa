
export const fontColor = {
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  MAGENTA: "\x1b[35m",
  CYAN: "\x1b[36m",
  WHITE: "\x1b[37m",
};

const RESET = '\x1b[0m';
const BG_RED = '\x1b[41m';
const BG_GREEN = '\x1b[42m';
const BG_BLUE = '\x1b[44m';

export const display_alert = (message:any):void=>{
    console.log(fontColor.RED+message)
}

export const display_background = (message: any)=>{
    console.log(BG_RED+message+RESET);
}