import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Settings,
  Heart
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Component() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/settings"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Settings className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-center">Love, Actually</h1>
          <Link
            href="/matches"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Heart className="w-6 h-6" />
          </Link>
        </div>
      </header>
      <div className="flex flex-col lg:flex-row flex-grow p-4 gap-4 overflow-auto">
        <div className="flex-grow flex items-start justify-center">
          <div className="relative w-full max-w-md">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/man01.png?height=600&width=450"
                  alt="Profile picture"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-white text-xl font-semibold">
                    John Doe, 28
                  </h2>
                  <p className="text-gray-200 text-base">5 miles away</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-white border-b">
                <button className="rounded-full bg-gray-100 p-3 shadow-lg hover:bg-gray-200 transition-colors">
                  <ChevronLeft className="w-8 h-8 text-gray-600" />
                </button>
                <div className="flex gap-4">
                  <button className="rounded-full bg-red-500 p-3 shadow-lg hover:bg-red-600 transition-colors">
                    <Minus className="w-8 h-8 text-white" />
                  </button>
                  <button className="rounded-full bg-green-500 p-3 shadow-lg hover:bg-green-600 transition-colors">
                    <Plus className="w-8 h-8 text-white" />
                  </button>
                </div>
                <button className="rounded-full bg-gray-100 p-3 shadow-lg hover:bg-gray-200 transition-colors">
                  <ChevronRight className="w-8 h-8 text-gray-600" />
                </button>
              </div>
              <div className="p-6 bg-white">
                <p className="text-gray-700 text-base">
                  Software Developer | Dog Lover | Hiking Enthusiast I'm a
                  passionate coder by day and an adventurous spirit by night.
                  When I'm not crafting elegant solutions to complex problems,
                  you can find me exploring hiking trails with my loyal
                  four-legged companion, Max. I believe in the perfect balance
                  of technology and nature, and I'm always up for a good
                  challenge, whether it's debugging a tricky piece of code or
                  conquering a new mountain peak. My ideal match is someone who
                  shares my love for the outdoors and can appreciate a good tech
                  joke. Bonus points if you can keep up with me on a trail and
                  don't mind my occasional dad jokes. Let's grab a coffee (or
                  better yet, hit a trail) and see if we click! Interests:
                  Coding, Hiking, Photography, Craft Beer, Sci-Fi Movies
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-80 bg-white rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Match Info</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-gray-700">Music</span>
                <span className="text-base font-medium text-gray-700">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: '80%' }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-gray-700">
                  Sports
                </span>
                <span className="text-base font-medium text-gray-700">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: '70%' }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-gray-700">
                  Compatibility
                </span>
                <span className="text-base font-medium text-gray-700">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-600 h-2.5 rounded-full"
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
