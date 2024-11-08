import { TCategory } from '@/types/categories';

export const CATEGORIES: TCategory[] = [
  { id: 'fun', label: 'Fun' },
  { id: 'dating', label: 'Dating' },
  { id: 'networking', label: 'Networking' },
  { id: 'realWorld', label: 'Real World' },
  { id: 'videoChat', label: 'Video Chat' }
] as const;
