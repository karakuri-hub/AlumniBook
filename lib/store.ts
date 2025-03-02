import { atom } from "jotai"
import { alumni } from "lib/constant"

export const alumniAtom = atom<Alumnus[]>(alumni)
