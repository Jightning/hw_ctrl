import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'
import { IntegrationState } from '@/types'

// Define the initial state using that type
const initialState: IntegrationState = {
    integrationsData: [{
        name: 'Canvas',
        id: 'canvas', 
        logoUrl: '/integrations/canvas.png',
        color: '#E04A3F',
    }, {
        name: 'Blackboard',
        id: 'blackboard',
        logoUrl: '/integrations/blackboard.png',
        color: '#000000',
    }, {
        name: 'Google Classroom',
        id: 'google-classroom',
        logoUrl: '/integrations/google-classroom.png',
        color: '#4285F4',
    }]
}

export const integrationsSlice = createSlice({
    name: 'integrations',
    initialState,
    reducers: {
        addIntegration: (state: IntegrationState, action: PayloadAction<IntegrationState["integrationsData"][number]>) => {
            state.integrationsData.push(action.payload);
        }
    }
})

export const { addIntegration } = integrationsSlice.actions

export const selectIntegrations = (state: RootState) => state.integrations.integrationsData

export default integrationsSlice.reducer