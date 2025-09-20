import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'
import { WorkState } from '@/types'

// Define the initial state using that type
const initialState: WorkState = {
    workData: [{
        title: 'Homework 5: Recursion',
        id: 'hw5-recursion',
        integrationId: 'canvas',
        subjectId: 'comp101',
        dueDate: new Date(2025, 11, 11).toISOString(),
        completed: false,
    }, {
        title: 'Speaking Skills Assignment',
        id: 'speaking-skills-assignment',
        integrationId: 'blackboard',
        dueDate: new Date(2025, 8, 18).toISOString(),
        subjectId: 'coms199101',
        completed: false,
    }, 
    {
        title: 'Lab Report',
        id: 'lab-report',
        integrationId: 'google-classroom',
        subjectId: 'eng161',
        completed: false,
    }]
}

export const workSlice = createSlice({
    name: 'work',
    initialState,
    reducers: {
        addWork: (state: WorkState, action: PayloadAction<WorkState["workData"][number]>) => {
            state.workData.push(action.payload);
        },
        // Sets work to !completed
        toggleWork: (state: WorkState, action: PayloadAction<string>) => {
            state.workData = state.workData.map(todo =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        },
    },
})

export const { addWork, toggleWork } = workSlice.actions

export const selectWork = (state: RootState) => state.work.workData

export default workSlice.reducer