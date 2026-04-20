import fs from "fs/promises";

export const logResult = async (data) => {
  const line = JSON.stringify(data) + "\n";
  await fs.appendFile("logs.txt", line);
};