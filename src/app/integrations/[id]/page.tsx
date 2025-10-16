'use client'

import { IntegrationDetailsWindow } from "@/components/pages/integrations/DetailsWindow"
import { selectIntegrations } from "@/lib/features/integrationSlice"
import { useAppSelector } from "@/lib/hooks/hooks"
import { useParams, notFound } from "next/navigation"

interface Params {
    id: string;
    [key: string]: string; 
}

export default function Page() {
    const params = useParams<Params>()
    const { id } = params
    const integrations = useAppSelector(selectIntegrations)

    const selectedIntegration = integrations.find(int => int.id === id) || null;
    
    if (!selectedIntegration) {
        notFound();
    }

    return (
        <IntegrationDetailsWindow integration={selectedIntegration} />
    )
}