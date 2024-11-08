import { TPage } from '@/types/pages';
import {
  Music2,
  Brain,
  Rocket,
  Bike,
  Heart,
  Spade,
  Users,
  MessageSquareHeart,
  Handshake,
  PartyPopper
} from 'lucide-react';

export const PAGES: TPage[] = [
  {
    id: 'foundersocial',
    title: 'Foundersocial',
    icon: <Rocket className="h-8 w-8" />,
    categories: ['realWorld'],
    href: '/foundersocial'
  },
  {
    id: 'irlsocialclub',
    title: 'IRL Social Club',
    icon: <PartyPopper className="h-8 w-8" />,
    categories: ['realWorld'],
    href: '/irlsocialclub'
  },
  {
    id: 'truth-or-lai',
    title: 'Truth or l-AI',
    icon: <Brain className="h-8 w-8" />,
    categories: ['fun', 'videoChat'],
    href: '/comingsoon'
  },
  {
    id: 'fusion-tunes',
    title: 'Fusion Tunes',
    icon: <Music2 className="h-8 w-8" />,
    categories: ['fun', 'videoChat'],
    href: '/comingsoon'
  },
  {
    id: 'startup-roulette',
    title: 'Startup Roulette',
    icon: <Handshake className="h-8 w-8" />,
    categories: ['videoChat'],
    href: '/comingsoon'
  },
  {
    id: 'poker-face',
    title: 'Poker Face',
    icon: <Spade className="h-8 w-8" />,
    categories: ['fun', 'videoChat'],
    href: 'https://suave-poker-frontend.vercel.app/'
  },
  {
    id: 'strava-pvp',
    title: 'Strava PVP',
    icon: <Bike className="h-8 w-8" />,
    categories: ['fun'],
    href: '/comingsoon'
  },
  {
    id: 'love-actually',
    title: 'Love, Actually',
    icon: <MessageSquareHeart className="h-8 w-8" />,
    categories: ['dating'],
    href: '/comingsoon'
  },
  {
    id: 'sociairl',
    title: 'SociaIRL',
    icon: <Heart className="h-8 w-8" />,
    categories: ['dating', 'realWorld'],
    href: '/comingsoon'
  },
  {
    id: 'cofounder-match',
    title: 'Cofounder Match',
    icon: <Users className="h-8 w-8" />,
    categories: ['realWorld', ' networking'],
    href: '/comingsoon'
  }
  // { id: 'love-actuallyf', title: 'Love, ActuallyF', icon: <MessageSquareHeart className="h-8 w-8" />, categories: ['dating'], href: '/comingsoon' },
  // { id: 'sociairlf', title: 'SociaIRLF', icon: <Heart className="h-8 w-8" />, categories: ['dating', 'realWorld'], href: '/comingsoon' },
];
