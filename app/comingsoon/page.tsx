'use client';
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
        <div className="flex flex-col gap-8 text-left py-8">
          <h1 className="text-5xl font-bold px-8">Coming Soon</h1>
          <hr className="w-full border-b-px border-black opacity-50" />
          <p className="text-xl px-8">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
          
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 px-8 pt-1"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white placeholder:text-gray"
              required
            />
            <Button type="submit" size="lg">
              Notify Me
            </Button>
          </form>
        </div>
      </CardMain>
    </>
  );
}
