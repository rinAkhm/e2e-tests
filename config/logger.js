import { createLogger, format, transports } from 'winston';
import path from 'path'; 

const { combine, timestamp, colorize, label, printf } = format;



export const prepareName = (filed) => {
  const { name } = path.parse(filed);
  return name
};


const myFormat = printf(({ level, message, timestamp }) => {
    const editMessage  = message.split('-')
    return `${timestamp} [${editMessage[0]}] ${level}: ${editMessage[1]}`;
  });

export const logger = createLogger({
    level: "info",
    format: combine(timestamp(), myFormat),
    colorize: true,
    transports: [ new transports.Console() ]
})
