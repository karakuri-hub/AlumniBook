import { atom } from "jotai"
import { alumni } from "lib/constant/alumni"

export const alumniAtom = atom<Alumnus[]>(alumni)
export const selectedAlumniAtom = atom<Alumnus[]>([])
