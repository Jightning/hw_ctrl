'use client'

import React, { useState } from 'react';
import { Integration } from '@/types';
import { IntegrationsList } from '@/components/pages/integrations/List';
import { IntegrationDetailsWindow } from '@/components/pages/integrations/DetailsWindow';

export default function Page() {
    const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
	const [isAddingNewIntegration, ] = useState(false)

  	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-center">
        	<IntegrationsList selectedIntegration={selectedIntegration} setSelectedIntegration={setSelectedIntegration} />
			{selectedIntegration ? <IntegrationDetailsWindow integration={selectedIntegration} /> : null}
		</div>
  	);
};