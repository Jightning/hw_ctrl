/*
 * Input: 
 *      dateInput: current date to humanize
 * Outputs:
 *      Date in a more human like manner (tomorrow, yesterday, etc.)
*/
export function humanizeDate(dateInput: Date | string): string {
	const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
	const now = new Date();

	// Zero out time for comparison
	const dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
	const nowUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
	const diffDays = Math.round((dateUTC - nowUTC) / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return 'Today';
	if (diffDays === -1) return 'Yesterday';
	if (diffDays === 1) return 'Tomorrow';
	if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`;
	if (diffDays === 7) return 'In One Week';
	if (diffDays > 7 && diffDays < 14) return `In ${Math.round(diffDays / 7)} weeks`;
	if (diffDays === -7) return 'A Week Ago';
	if (diffDays < -1 && diffDays > -7) return `${Math.abs(diffDays)} days ago`;
	if (diffDays < -7 && diffDays > -14) return `${Math.round(Math.abs(diffDays) / 7)} weeks ago`;
	return date.toLocaleDateString();
}
