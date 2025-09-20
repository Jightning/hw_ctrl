import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { selectIntegrations } from "@/lib/features/integrationSlice";
import { selectSubjects } from "@/lib/features/subjectsSlice";
import { toggleWork } from "@/lib/features/workSlice";
import { humanizeDate } from "@/lib/helpers";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { Work } from "@/types";
import { useState } from "react";

export const TodoItem: React.FC<{ work: Work }> = ({ work }) => {
	const [isHoveredOver, setIsHoveredOver] = useState(false)

	const integrations = useAppSelector(selectIntegrations);
	const subjects = useAppSelector(selectSubjects);
	const dispatch = useAppDispatch();

	const currentSubject = subjects.find(sub => sub.id === work.subjectId)
	const currentIntegration = integrations.find(int => int.id === work.integrationId)
	
	return (
		<Card 
			className={`p-4 flex items-center space-x-4 transition-opacity ${work.completed ? 'opacity-50' : ''}`} 
			onMouseEnter={() => setIsHoveredOver(true)} 
			onMouseLeave={() => setIsHoveredOver(false)}
		>
			<div className="flex-shrink-0 flex justify-center items-center">
				<input
					type="checkbox"
					checked={work.completed}
					onChange={() => dispatch(toggleWork(work.id))}
					className="h-6 w-6 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
				/>
			</div>

			<div className={`w-2 h-10 rounded-full`} style={{backgroundColor: currentIntegration?.color || 'gray'}}></div>
			<div className="flex-grow">
				<p className={`font-semibold text-slate-800 ${work.completed ? 'line-through' : ''}`}>{work.title}</p>
				<div className="flex items-center text-sm space-x-2 text-slate-500 mt-1">
					{currentSubject && 
						<>
							<span className="w-fit">{currentSubject?.name}</span>
							<span className="text-slate-300">&bull;</span>
						</>
					}
					<span className="w-fit">{work.dueDate ? (isHoveredOver ? new Date(work.dueDate).toLocaleDateString() : humanizeDate(work.dueDate)) : 'No Due Date'}</span>
				</div>
			</div>
			<button className=" p-2 h-8 w-8 rounded-md text-slate-500 hover:bg-slate-100 flex items-center justify-center cursor-pointer">
				<Icon name="more" className="fill-slate-500" />
			</button>
		</Card>
	);
};