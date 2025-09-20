const NewIntegrationsForm = () => {
    return (
        <>
            <div className="p-6 space-y-4">
                <div>
                    <label htmlFor="integration-select" className="block text-sm font-medium text-slate-700">Platform</label>
                    <select
                        id="integration-select"
                        value={selection}
                        onChange={(e) => { setSelection(e.target.value); setApiKey(''); setCustomName(''); }}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white text-slate-900 border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="" disabled>Select a platform...</option>
                        {availableIntegrations.map(integration => <option key={integration.name} value={integration.name}>{integration.name}</option>)}
                        <option value="custom">Custom Integration</option>
                    </select>
                </div>
                {selection === 'custom' && (
                    <div className="animate-fadeIn">
                        <label htmlFor="custom-integration-name" className="block text-sm font-medium text-slate-700">Custom Platform Name</label>
                        <input type="text" id="custom-integration-name" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="e.g., Notion, Todoist" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                )}
                {selection && selectedIntegrationDetails && (
                    <div className="animate-fadeIn mt-6 space-y-4">
                        <div>
                            <label htmlFor="api-key" className="block text-sm font-medium text-slate-700">API Key</label>
                            <input type="password" id="api-key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Paste your API key here" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="pt-2">
                            <button onClick={() => setIsModalOpen(true)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline">View Instructions</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 bg-slate-50/75 border-t border-slate-200 flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={!canProceed || step === 'verifying'}
                    className="w-32 flex items-center justify-center space-x-2 py-2.5 px-6 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {step === 'verifying' ? <><Icon name="loading" className="w-5 h-5 animate-spin"/><span>Verifying...</span></> : <span>Next</span>}
                </button>
            </div>
        </>
    )
}