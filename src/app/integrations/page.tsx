'use client'

import React, { useState } from 'react';
import { useAppSelector } from '@/lib/hooks/hooks';
import { selectIntegrations } from '@/lib/features/integrationSlice';
import { Integration } from '@/types';
import { IntegrationsList } from '@/components/pages/integrations/List';
import { IntegrationDetailsWindow } from '@/components/pages/integrations/DetailsWindow';



export default function Page() {
    const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
	const integrations = useAppSelector(selectIntegrations)

  	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-center">
        	<IntegrationsList selectedIntegration={selectedIntegration} setSelectedIntegration={setSelectedIntegration} />
			{selectedIntegration ? <IntegrationDetailsWindow integration={selectedIntegration} /> : null}
		</div>
		// <div className="max-w-2xl mx-auto">
  	  	//   	<h1 className="text-2xl font-bold mb-6">Integrations</h1>
  	  	//   	<Card>
		// 		{integrations.map((int) => (
		// 			<IntegrationItem name={int.name} connected={true} key={int.id} />
		// 		))}
  	  	//   	</Card>
  	  	// </div>
  	);
};