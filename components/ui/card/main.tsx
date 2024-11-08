import * as React from 'react';

import { Card } from '@/components/ui/card';

export const CardMain = ({ children }: React.PropsWithChildren) => (
  <Card className="w-full max-w-2xl mx-auto my-12">{children}</Card>
);
