import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { selectIntegrations } from "@/lib/features/integrationSlice";
import { selectSubjects } from "@/lib/features/subjectsSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { Filters, Integration } from "@/types";

export const FilterSidebar = (
	{ isMinimized, onToggle, filters, setFilters }:
	{ isMinimized: boolean; onToggle: () => void; filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>>}
) => {
	const integrations = useAppSelector(selectIntegrations)
	const subjects = useAppSelector(selectSubjects)

	if (isMinimized) {
		return (
			<div className="p-2">
				<button onClick={onToggle} className="p-2 rounded-md hover:bg-slate-200 cursor-pointer">
					<Icon name="chevronLeft" className="w-6 h-6 rotate-180" />
				</button>
			</div>
		)
	}

	/*
	Inputs: type - the section being filtered (integrations, subjects, showCompleted, etc.)
			value - the specific value within that section to toggle (e.g., 'Canvas' for integrations)
	Without a value, it's assumed that type is a value without a section.
	*/
	const toggleFilter = (type: keyof Filters, value?: string) => {
		setFilters((prevFilters: Filters) => {
			if (value) {
				const currentValues = prevFilters[type] as { [key: string]: boolean } | boolean;
				if (typeof currentValues === "object") {
					return {
						...prevFilters,
						[type]: {
							...currentValues,
							[value]: !currentValues[value],
						},
					};
				}
			} else {
				return {
					...prevFilters,
					[type]: !prevFilters[type],
				};
			}
			return prevFilters;
		});
	}
	
	return (
		<Card className="flex-shrink-0 w-64 p-4 space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">Filter</h2>
				<button onClick={onToggle} className="p-1 rounded-md hover:bg-slate-200 cursor-pointer">
					<Icon name="chevronLeft" className="w-5 h-5" />
				</button>
			</div>

			<div className="space-y-2">
				<h3 className="text-sm font-semibold text-slate-600 px-1">Integrations</h3>
					<div className="space-y-1">
					{integrations.map((int: Integration) => (
						<CheckBox
							key={int.id}
							label={int.name}
							checked={filters.integrations[int.id] || false}
							onChange={() => toggleFilter("integrations", int.id)}
						/>
					))}
				</div>
			</div>

			<hr className="border-slate-200" />

			<div className="space-y-2">
				<h3 className="text-sm font-semibold text-slate-600 px-1">Subjects</h3>
				<div className="space-y-1">
					{subjects.map(sub => (
						<CheckBox
							key={sub.id}
							label={sub.name}
							checked={filters.subjects[sub.id] || false}
							onChange={() => toggleFilter("subjects", sub.id)}
						/>
					))}
				</div>
			</div>

			<hr className="border-slate-200" />

			<div className="space-y-2">
				<CheckBox label="Show Completed" checked={filters.showCompleted} onChange={() => toggleFilter("showCompleted")} />
			</div>
		</Card>
	);
};

const CheckBox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
	<label className="flex items-center space-x-3 px-2 py-1.5 rounded-md hover:bg-slate-100 cursor-pointer">
		<input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" checked={checked} onChange={onChange} />
		<span className="text-sm text-slate-700">{label}</span>
	</label>
);