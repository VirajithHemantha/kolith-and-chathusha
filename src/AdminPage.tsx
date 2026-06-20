import React, { useState } from 'react';
import { Copy, Link as LinkIcon, CheckCircle } from 'lucide-react';

const PREFIXES = [
  'Mr.',
  'Mrs.',
  'Mr. & Mrs.',
  'Ms.',
  'Miss',
  'Dr.',
  'Prof.',
  'Rev.'
];

export function AdminPage() {
  const [prefix, setPrefix] = useState('Mr. & Mrs.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    
    // Get the base URL (e.g., https://achali-manul.vercel.app or localhost:3000)
    const baseUrl = window.location.origin;
    
    // Create the search params
    const params = new URLSearchParams();
    params.set('prefix', prefix);
    params.set('name', guestName.trim());
    
    const link = `${baseUrl}/?${params.toString()}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-neutral-100 py-12 px-4 sm:px-6 lg:px-8 font-serif text-[#000000] flex items-center justify-center">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-pink-100">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif tracking-widest uppercase mb-2">Link Generator</h2>
            <p className="text-gray-500 font-sans text-sm">Create personalized invitation links</p>
          </div>

          <div className="space-y-6 font-sans">
            <div>
              <label htmlFor="prefix" className="block text-sm font-medium text-gray-700 mb-1">
                Prefix
              </label>
              <select
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#000000] focus:border-transparent outline-none transition-all bg-white"
              >
                {PREFIXES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-1">
                Guest Name
              </label>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#000000] focus:border-transparent outline-none transition-all bg-white"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!guestName.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E60000] to-[#B91C1C] text-white font-serif text-lg tracking-widest uppercase shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-4"
            >
              <LinkIcon className="w-5 h-5" />
              Generate Link
            </button>

            {generatedLink && (
              <div className="mt-8 p-4 bg-pink-50/50 rounded-xl border border-pink-100 animate-in fade-in slide-in-from-bottom-2">
                <p className="text-sm text-gray-600 mb-2 font-medium">Generated Link:</p>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="flex-1 w-full px-3 py-2 text-sm bg-white border border-pink-200 rounded-md focus:outline-none text-gray-600"
                  />
                  <button
                    onClick={handleCopy}
                    className="flex-shrink-0 p-2 text-[#000000] hover:bg-pink-100 rounded-md transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
