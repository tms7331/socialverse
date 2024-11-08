'use client';;
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardMain } from '@/components/ui/card/main';
import { ShellHeader } from '@/shell/header';
// import { Facebook, Twitter, Instagram, Github } from 'lucide-react'

export default function ComingSoon() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <>
      <ShellHeader />
      <CardMain>
        <div className="flex flex-col gap-4 text-left p-8">
          <h1 className="text-5xl font-bold">Coming Soon</h1>
          <p className="text-xl">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
          <div className="h-2" />
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white placeholder-gray-500"
              required
            />
            <Button type="submit">Notify Me</Button>
          </form>
        </div>
      </CardMain>
    </>
  );
}
