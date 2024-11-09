import { Card } from '@/components/ui/card';
import { ComponentsColumn, TComponentsColumnProps } from '@/components/column';
import { cx } from 'class-variance-authority';

export const CardMain = ({ children, classValue,...props }: TComponentsColumnProps) => (
  <ComponentsColumn>
    <Card className={cx("w-full max-w-2xl mx-auto",classValue)} {...props}>{children}</Card>
  </ComponentsColumn>
);
