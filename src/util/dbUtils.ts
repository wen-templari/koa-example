const exclude = <T, Key extends keyof T>(target: T, ...keys: Key[]): Omit<T, Key> => {
  for (const key of keys) {
    delete target[key]
  }
  return target
}

export { exclude }
