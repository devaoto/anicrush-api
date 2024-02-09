const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default waitFor;
