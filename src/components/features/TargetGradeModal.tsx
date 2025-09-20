import React, { useState, useEffect } from 'react';
import { getTargetGradeSuggestion } from '../../services/geminiService';
import { GradeEntry } from '../../types';
import Card from '../ui/Card';
import Icon from '../ui/Icon';

interface TargetGradeModalProps {
  onClose: () => void;
  subjects: string[];
  allGrades: GradeEntry[];
}

const TargetGradeModal: React.FC<TargetGradeModalProps> = ({ onClose, subjects, allGrades }) => {
  const [subject, setSubject] = useState(subjects[0] || '');
  const [currentGrade, setCurrentGrade] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [examWeight, setExamWeight] = useState('');
  const [result, setResult] = useState<{ requiredScore: number | null; explanation: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (subject && allGrades.length > 0) {
      // Find the last grade entry for the selected subject, assuming the data is chronological
      const latestGrade = [...allGrades].reverse().find(g => g.subject === subject);
      if (latestGrade) {
        setCurrentGrade(latestGrade.grade.toString());
      } else {
        setCurrentGrade(''); // Reset if no grade is found for the subject
      }
    }
  }, [subject, allGrades]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const res = await getTargetGradeSuggestion(
      subject,
      parseFloat(currentGrade),
      parseFloat(desiredGrade),
      parseFloat(examWeight)
    );
    setResult(res);
    setIsLoading(false);
  };
  
  const inputStyles = "mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-slate-50";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100">
          <Icon name="close" className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-4">Calculate Target Grade</h2>
        
        {!result && (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700">Subject</label>
                    <select id="subject" value={subject} onChange={e => setSubject(e.target.value)} required className={inputStyles}>
                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="currentGrade" className="block text-sm font-medium text-slate-700">Current Grade (%)</label>
                    <input type="number" id="currentGrade" value={currentGrade} onChange={e => setCurrentGrade(e.target.value)} required placeholder="e.g., 85" className={inputStyles} />
                </div>
                <div>
                    <label htmlFor="desiredGrade" className="block text-sm font-medium text-slate-700">Desired Final Grade (%)</label>
                    <input type="number" id="desiredGrade" value={desiredGrade} onChange={e => setDesiredGrade(e.target.value)} required placeholder="e.g., 90" className={inputStyles} />
                </div>
                <div>
                    <label htmlFor="examWeight" className="block text-sm font-medium text-slate-700">Final Exam Weight (%)</label>
                    <input type="number" id="examWeight" value={examWeight} onChange={e => setExamWeight(e.target.value)} required placeholder="e.g., 25" className={inputStyles} />
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed">
                    {isLoading ? 'Calculating...' : 'Calculate'}
                </button>
            </form>
        )}

        {result && (
            <div className="text-center space-y-4">
                {result.requiredScore !== null ? (
                    <>
                        <p className="text-slate-600">You need to score at least:</p>
                        <p className={`text-5xl font-bold ${result.requiredScore > 100 ? 'text-red-500' : 'text-indigo-600'}`}>{result.requiredScore.toFixed(2)}%</p>
                    </>
                ) : (
                    <p className="text-2xl font-bold text-red-500">Calculation Error</p>
                )}
                <div className="bg-indigo-50 text-indigo-900 border border-indigo-200 p-4 rounded-lg text-left">
                    <p className="text-sm">{result.explanation}</p>
                </div>
                <button onClick={() => setResult(null)} className="w-full bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-semibold hover:bg-slate-300 transition-colors">
                    Calculate Another
                </button>
            </div>
        )}
      </Card>
    </div>
  );
};

export default TargetGradeModal;