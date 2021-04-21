export const UTCHoursPlus: (plus: number) => number = (plus: number): number => {
  let hoursUTCPlus = new Date().getUTCHours();

  for (let i = 0; i < plus; i++) {
    if (hoursUTCPlus < 23) hoursUTCPlus += 1;
    else hoursUTCPlus = 0;
  }

  return hoursUTCPlus;
};

export const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
