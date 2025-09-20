import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Integration } from "@/types";

export const IntegrationDetailsWindow = ({integration}: {integration: Integration}) => {
    
    return (
        <div className={`flex-1 transition-all duration-500 ease-in-out overflow-hidden ${integration ? 'max-w-4xl opacity-100 md:ml-6' : 'max-w-0 opacity-0 ml-0 hidden'}`}>
            {integration && (
                <Card className="p-6 h-fit">
                    {/* Header */}
                    <div className="flex items-center space-x-4 mb-6">
                        <Icon fill={integration.color} className="w-12 h-12 text-slate-700" />
                        <div>
                            <h1 className="text-2xl font-bold mb-1">{integration.name}</h1>
                            <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Connected</span>
                        </div>
                    </div>

                    {/* Subjects list */}
                    <h3 className="font-semibold text-slate-800 mb-2">Synced Subjects</h3>
                    {integration.subjects ? (
                        <div>
                            {integration.subjects.length > 0 ? (
                                <ul className="list-disc list-inside text-slate-600 space-y-1">
                                    {integration.subjects.map(course => <li key={course}>{course}</li>)}
                                </ul>
                            ) : (
                                <p className="text-slate-500">No courses synced for this integration yet.</p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h3 className=" text-red-400 mb-2">No Subjects</h3>
                        </div>
                    )}

                    {/* Sync Status */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-slate-800 mb-2">Sync Status</h3>
                        {integration.lastSync 
                        ? <p className="text-slate-600">Last sync: {integration.lastSync}</p> 
                        : <p className="text-red-400">Unavailable</p>}
                    </div>

                    {/* Disconnect button */}
                    <div className="mt-8 border-t pt-6 flex justify-end">
                        <button className="text-red-600 font-semibold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                            Disconnect
                        </button>
                    </div>
                </Card>
            )}
        </div>
    )
}