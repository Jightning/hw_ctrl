'use client'

import { IntegrationsList } from '@/components/pages/integrations/List';
import { selectIntegrations } from '@/lib/features/integrationSlice';
import { useAppSelector } from '@/lib/hooks/hooks';
import { Integration } from '@/types';
import { useParams, useRouter } from 'next/navigation';

function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { id } = useParams<{ id?: string }>();

    const integrations = useAppSelector(selectIntegrations)
    const selectedIntegration = integrations.find(int => int.id === id) || null;

    const handleSelect = (integration: Integration | null) => {
        if (!integration) {
            router.push('/integrations');
            return;
        }

        router.push(`/integrations/${integration.id}`);
    };
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-center">
            <IntegrationsList selectedIntegration={selectedIntegration} setSelectedIntegration={handleSelect} />
            {children}
        </div>
    );
}

export default Layout;