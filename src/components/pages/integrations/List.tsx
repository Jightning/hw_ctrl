import Card from "@/components/ui/Card"
import Icon from "@/components/ui/Icon"
import { selectIntegrations } from "@/lib/features/integrationSlice"
import { useAppSelector } from "@/lib/hooks/hooks"
import { Integration } from "@/types"
import Link from "next/link"

interface IntegrationListProps {
    selectedIntegration: Integration | null,
    setSelectedIntegration: React.Dispatch<React.SetStateAction<Integration | null>>
}

export const IntegrationsList = ({ selectedIntegration, setSelectedIntegration }: IntegrationListProps) => {
    const integrations = useAppSelector(selectIntegrations)

    const handleSelect = (integration: Integration) => {
        setSelectedIntegration(integration);
    };

    return (
        // transition-all duration-500 ease-in-out
        <div className={` justify-self-left ${selectedIntegration ? 'w-full md:w-80 flex-shrink-0' : 'w-full max-w-3xl '}`}>
            <Card className="h-full flex flex-col">
                {/* Header */}
                <div className="p-4 sm:p-6 flex justify-between items-center border-b border-slate-200 flex-shrink-0">
                    <div>	
		 			    <h1 className="text-lg font-semibold">Integrations</h1>
		 			    <p className="text-sm text-slate-500 mt-1">Click on an integration to see more details or manage its settings.</p>
				    </div>
                    <button className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer" aria-label="Help">
                        <Icon name="question" className="w-5 h-5"/>
                    </button>
                </div>
                
                {/* Integrations list */}
                <div className="overflow-y-auto flex-grow">
                    <ul className="divide-y divide-slate-200">
                        {integrations.map(integration => (
                            <li key={integration.name}>
                                <button
                                    onClick={() => handleSelect(integration)}
                                    className={`w-full flex items-center justify-between text-left p-4 cursor-pointer ${selectedIntegration?.name === integration.name ? 'bg-indigo-100' : 'hover:bg-slate-50'} ${selectedIntegration && "transition-colors"}`}
                                    aria-label={`View details for ${integration.name}`}
                                    aria-current={selectedIntegration?.name === integration.name}
                                >
                                    <div className="flex items-center space-x-4">
                                        <Icon fill={integration.color} className="text-slate-700 w-8 h-8"/>
                                        <div>
                                            <p className={`font-semibold ${selectedIntegration?.name === integration.name ? 'text-indigo-800' : 'text-slate-800'}`}>{integration.name}</p>
                                        </div>
                                    </div>
                                    
                                    <ConnectionIcon connected={integration.connected} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Add new integration/back button */}
                <div className="border-t border-slate-200 flex-shrink-0">
                    {!selectedIntegration ? (
                        <div className="p-4 bg-slate-50/75">
                            <Link
                                href="/integrations/new"
                                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700  shadow-sm cursor-pointer"
                            >
                                <Icon name="plus" fill={"#FFF"} className="w-5 h-5"/>
                                <span>Add New Integration</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="p-2">
                            <button onClick={() => setSelectedIntegration(null)} className="w-full flex items-center space-x-2 font-medium text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                                <Icon name="chevronLeft" className="w-5 h-5"/>
                                <span className="text-base">All Integrations</span>
                            </button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}


const ConnectionIcon = ({connected}: {connected: boolean}) => {
    return (
        <div className="flex items-center space-x-3 ml-4 flex-shrink-0">
            {connected ? 
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full ring-1 ring-inset ring-green-200">
                    Connected
                </span>
                :
                <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-full ring-1 ring-inset ring-red-200">
                    Disconnected
                </span>
            }
        </div>
    )
}