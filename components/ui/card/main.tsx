import { Card } from '@/components/ui/card';
import { ComponentsColumn, TComponentsColumnProps } from '@/components/column';

export const CardMain = ({ children }: TComponentsColumnProps) => (
  <ComponentsColumn>
    <Card className="w-full max-w-2xl mx-auto">{children}</Card>
  </ComponentsColumn>
);
