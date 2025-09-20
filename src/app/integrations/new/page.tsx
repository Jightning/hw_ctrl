'use client'

import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { IntegrationTutorial } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { sep } from 'path';
import React, { useEffect, useState } from 'react';

type stages = 'form' | 'verifying' | 'overview'
interface FormInformation {
    apiKey: string
}

const initialFormInformation: FormInformation = {
    apiKey: ""
}

export default function Page() {
    const [stage, setStage] = useState<stages>('form')
    const [formInformation, setFormInformation] = useState<FormInformation | null>(initialFormInformation)
    const [integrationInstructions, setIntegrationInstructions] = useState<IntegrationTutorial[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetch('/integrationInstructions.json')
            .then(res => res.json())
            .then((json: IntegrationTutorial[]) => {
                setIntegrationInstructions(json);
                if (json.length) setSelected(json[0].integrationId || json[0].name);
            })
            .catch(err => {
                console.error('Failed to load integration instructions', err);
            });
    }, []);

    const currentIntegrationInstructions = integrationInstructions.find(d => (d.integrationId || d.name) === selected) || null;

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-3xl">
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