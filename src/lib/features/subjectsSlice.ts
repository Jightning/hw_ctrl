import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'
import { SubjectsState } from '@/types'

const initialState: SubjectsState = {
    subjectsData: [{
        name: 'ENGR 161',
        id: 'eng161', 
        logoUrl: '/subjects/engr161.png',
        color: '#E04A3F',
    }, {
        name: 'COMS 199101',
        id: 'coms199101',
        logoUrl: '/subjects/coms199101.png',
        color: '#000000',
    }, {
        name: 'COMP SCI 101',
        id: 'comp101',
        logoUrl: '/subjects/comp101.png',
        color: '#4285F4',
    }]
}

export const subjectsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        addSubject: (state: SubjectsState, action: PayloadAction<SubjectsState["subjectsData"][number]>) => {
            state.subjectsData.push(action.payload);
        }
    }
})

export const { addSubject } = subjectsSlice.actions

export const selectSubjects = (state: RootState) => state.subjects.subjectsData

export default subjectsSlice.reducer