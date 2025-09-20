'use client'

import React from 'react';
import { useState } from 'react';
import { Filters, Work } from '@/types';
import { FilterSidebar } from '@/components/pages/todo/FilterSidebar';
import { TodoItem } from '@/components/pages/todo/TodoItem';
import { selectWork, toggleWork } from '@/lib/features/workSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';

const initialFilters: Filters = {
	integrations: {},
	subjects: {},
	showCompleted: false,
};

export default function Page() {
	const work = useAppSelector(selectWork)
	
	const [filters, setFilters] = useState<Filters>(initialFilters);
	const [isSidebarMinimized, setSidebarMinimized] = useState(false);
	
	return (
		<div className="flex h-full space-x-6">
			<FilterSidebar 
				isMinimized={isSidebarMinimized} 
				onToggle={() => setSidebarMinimized(!isSidebarMinimized)}
				filters={filters}
				setFilters={setFilters}
			/>
			<div className="flex-1">
				<h1 className="text-2xl font-bold mb-6">Todo</h1>
				<div className="space-y-4">
					{work.filter(todo => (
							Object.keys(filters.integrations).length && Object.values(filters.integrations).some(int => int === true)
								? filters.integrations[todo.integrationId] : true))
						.filter(todo => (
							Object.keys(filters.subjects).length && Object.values(filters.subjects).some(sub => sub === true)
								? todo.subjectId ? filters.subjects[todo.subjectId] : true : true))
						.filter(todo => (filters.showCompleted ? true : !todo.completed))
						.sort((a, b) => {
							if (a.dueDate && b.dueDate) {
								return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
							} else if (a.dueDate) {
								return -1; // a comes first
							} else if (b.dueDate) {
								return 1; // b comes first
							} else {
								return 0;
							}
						})
						.map(todo => (
							<TodoItem key={todo.id} work={todo} />
						))}
				</div>
			</div>
		</div>
	);
};
