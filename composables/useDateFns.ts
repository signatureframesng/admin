import {format} from "date-fns"

export const useDateFns = (params: Date, pattern: string) => {
  const date = new Date(params)
  return format(date, pattern)
}