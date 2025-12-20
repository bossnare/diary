function handleWait(fn: () => void, delay: number = 150) {
  setTimeout(() => {
    fn();
  }, delay);
}

export { handleWait };
