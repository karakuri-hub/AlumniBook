import { atom } from "jotai"
import { alumni } from "lib/constant/alumni"

export const alumniAtom = atom<Alumnus[]>(alumni)
export const selectedAlumniAtom = atom<Alumnus[]>([])
export const selectedAlumnusAtom = atom<Alumnus>()
export const alumnusFilterAtom = atom<{
  name: string
  countryNames: string[]
  completionYears: number[]
  hasPosition: boolean
}>({
  name: "",
  countryNames: [],
  completionYears: [2023, 2022, 2021, 2020, 2019, 2018],
  hasPosition: true,
})

export const settingsAtom = atom<{
  isHighlightedCountried?: boolean
}>({})
