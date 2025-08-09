export async function delay<T>(fn: () => Promise<T>, delayMS = 0): Promise<T> {
  const [result] = await Promise.all([
    fn(),
    new Promise<void>((resolve) => setTimeout(resolve, delayMS)),
  ]);
  return result;
}
