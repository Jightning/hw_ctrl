'use client'

import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { selectIntegrations } from '@/lib/features/integrationSlice';
import { useAppSelector } from '@/lib/hooks/hooks';
import { IntegrationTutorial } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';

type stages = 'form' | 'verifying' | 'overview'
interface FormInformation {
    integrationSelection: string | null
    apiKey: string,
    customName?: string
}

const schema: z.ZodSchema<FormInformation> = z.object({
    integrationSelection: z.string().min(1, 'Platform Required'),
    apiKey: z.string().min(1, 'API Key Required'),
    customName: z.string().optional()
}).superRefine((val, ctx) => {
    if (val.integrationSelection === 'custom') {
        if (!val.customName || !val.customName.trim()) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['customName'], message: 'Custom Name Required for Custom Platform' });
        }
    }
});

const initialFormInformation: FormInformation = {
    integrationSelection: "custom",
    apiKey: ""
}

export default function Page() {
    const [stage, setStage] = useState<stages>('form')
    const [formInformation, setFormInformation] = useState<FormInformation>(initialFormInformation)
    const [integrationInstructions, setIntegrationInstructions] = useState<IntegrationTutorial[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const integrations = useAppSelector(selectIntegrations)

    const canProceed = formInformation.integrationSelection && formInformation.apiKey.trim() !== '' && (formInformation.integrationSelection !== 'custom' || formInformation.customName?.trim() !== '');

    // Get instructions on the non custom integrations, including the respective tutorials for the modal
    useEffect(() => {
        fetch('/integrationInstructions.json')
            .then(res => res.json())
            .then((json: IntegrationTutorial[]) => {
                setIntegrationInstructions(json);
            })
            .catch(err => {
                console.error('Failed to load integration instructions', err);
            });
    }, []);


    // Instead of using setFormIntegration, use this ( ex. editForm({ apiKey: "sample_key" })) )
    const editForm = ({ integrationSelection, apiKey, customName }: Partial<FormInformation>) => {
        setFormInformation((prev) => ({
            ...prev,
            integrationSelection: integrationSelection ?? prev.integrationSelection,
            apiKey: apiKey ?? prev.apiKey,
            customName: customName ?? prev.customName
        }))
    }

    const handleNext = () => {
        // if (!canProceed) return;
        setStage('verifying');
    };

    const availableIntegrations = integrationInstructions.filter((int) => !integrations.some(usedInt => int.integrationId === usedInt.id))
    const currentIntegrationInstructions = integrationInstructions.find(d => (d.integrationId || d.name) === formInformation.integrationSelection) || null;
    
    return (
        <div className="flex-1 flex justify-center">
            <div className="px-6 h-fit w-full ">
                <Card>
                    {/* Header */}
                    <div className="p-4 sm:p-6 flex items-center border-b border-slate-200">
                        {stage === 'overview' ?
                            <button 
                                onClick={() => { setStage('form'); setFormInformation(initialFormInformation); }} 
                                className="flex items-center space-x-2 font-medium text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors mr-4"
                            >
                                <Icon name="arrowLeft" className="w-5 h-5"/>
                            </button>
                            :
                            <Link 
                                href="/integrations"
                                className="flex items-center space-x-2 font-medium text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors mr-4"
                            >
                                <Icon name="arrowLeft" className="w-5 h-5"/>
                            </Link>
                        }

                        <h2 className="text-lg font-semibold">{stage === 'overview' ? 'Connection Overview' : 'Add New Platform'}</h2>
                    </div>
                    
                    {/* For the form section (first section) */}
                    {stage !== 'overview' && (
                        <>
                            {/* Form */}
                            <div className="p-6 space-y-4">
                                {/* Selecting Integration Platform */}
                                <div>
                                    <label htmlFor="integration-select" className="block text-sm font-medium text-slate-700">Platform</label>
                                    <select
                                        id="integration-select"
                                        value={formInformation.integrationSelection ?? undefined}
                                        onChange={(e) => { editForm({integrationSelection: e.target.value, apiKey: '', customName: undefined }) }}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white text-slate-900 border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="" disabled>Select a platform...</option>
                                        {availableIntegrations.map(integration => (
                                            <option key={integration.name} value={integration.integrationId}>
                                                {integration.name}
                                            </option>                                           
                                        ))}
                                        <option value="custom">Custom Integration</option>
                                    </select>
                                </div>

                                {/* Form if integration is custom */}
                                {formInformation.integrationSelection === 'custom' && (
                                    <div>
                                        <label htmlFor="custom-integration-name" className="block text-sm font-medium text-slate-700">Custom Platform Name</label>
                                        <input 
                                            type="text" 
                                            id="custom-integration-name" 
                                            value={formInformation.customName} 
                                            onChange={(e) => editForm({customName: e.target.value})} placeholder="e.g., Notion, Todoist" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                )}

                                {/* Form if integration setup is already established */}
                                {formInformation.integrationSelection && currentIntegrationInstructions && (
                                    <div className="mt-6 space-y-4">
                                        {/* Api key */}
                                        <div>
                                            <label htmlFor="api-key" className="block text-sm font-medium text-slate-700">API Key</label>
                                            <input type="password" id="api-key" value={formInformation.apiKey} onChange={(e) => editForm({apiKey: e.target.value})} placeholder="Paste your API key here" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        {/* Tutorial Modal Toggle */}
                                        <div className="pt-2">
                                            <button onClick={() => setIsModalOpen(true)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline">View Instructions</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Next Button */}
                            <div className="p-4 bg-slate-50/75 border-t border-slate-200 flex justify-end">
                                <button
                                    onClick={handleNext}
                                    disabled={!canProceed || stage === 'verifying'}
                                    className="w-32 flex items-center justify-center space-x-2 py-2.5 px-6 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm disabled:bg-indigo-400 disabled:cursor-not-allowed"
                                >
                                    {stage === 'verifying' ? <><Icon name="loading" className="w-5 h-5 animate-spin"/><span>Verifying...</span></> : <span>Next</span>}
                                </button>
                            </div>
                        </>
                    )}
                
                </Card>
            </div>


            {/* Modal for integration tutorial */}
            {isModalOpen &&
                <Modal setIsOpen={setIsModalOpen} title="World" >
                    <ol className="list-decimal list-inside space-y-2 text-slate-600">
                        {currentIntegrationInstructions?.tutorial?.steps.map((step, index) => {
                            if (step.type === "text") {
                                return (
                                    <li key={index}>
                                        {step.content}
                                    </li>
                                )
                            } else if (step.type === "image") {
                                // TODO ensure this works with images
                                return (
                                    <Image key={index} src={step.content} alt="Demo Image" />
                                )
                            }
                        })}
                    </ol>
                </Modal>
            }
        </div>
    )
};