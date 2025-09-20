export interface Integration {
	name: string,
	id: string,
	logoUrl: string,
	color: string,
	subjects?: Subject["id"][],
	
	lastSync?: string
}

export interface IntegrationState {
	integrationsData: Integration[];
}

export interface Subject {
	name: string,
	id: string,
	logoUrl: string,
	color: string,
}

export interface SubjectsState {
	subjectsData: Subject[];
}

export interface Work {
	id: string;
	title: string;
	// Must be stored as ISO string to avoid serialization issues in Redux
	dueDate?: string;
	subjectId?: Subject["id"];
	integrationId: Integration["id"];
	completed: boolean;
}

export interface WorkState {
	workData: Work[];
}

export interface Filters {
	integrations: {
		[key: string]: boolean;
	};
	subjects: {
		[key: string]: boolean;
	};
	showCompleted: boolean;
}




// export interface Todo {
// 	id: string;
// 	title: string;
// 	dueDate: string;
// 	subjectId?: Subject["id"];
// 	integrationId: Integration["id"];
// 	completed: boolean;
// }

export interface GradeEntry {
	month: string;
	grade: number;
	subject: string;
	integration: string;
}

export interface WorkloadEntry {
	subject: string;
	hours: number;
}

export interface CalendarEvent {
	id: string;
	title: string;
	type: 'Exam' | 'Homework' | 'Meeting';
	dateTime: string;
}

export interface ImprovementSuggestion {
	area: string;
	suggestion: string;
	rationale: string;
}