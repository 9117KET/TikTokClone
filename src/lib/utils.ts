const isDev = process.env.NODE_ENV === "development";

// Define a more specific type for the data parameter
type LogData = string | number | boolean | null | undefined | object;

export const logDebug = (message: string, data?: LogData): void => {
  if (isDev) {
    console.log(message, data || "");
  }
};
