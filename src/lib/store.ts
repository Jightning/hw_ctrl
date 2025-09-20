import { configureStore } from '@reduxjs/toolkit'
import integrationsReducer from './features/integrationSlice'
import subjectsReducer from './features/subjectsSlice'
import workReducer from './features/workSlice'

export const makeStore = () => {
	return configureStore({
		reducer: {
			integrations: integrationsReducer,
			subjects: subjectsReducer,
			work: workReducer
		}
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']