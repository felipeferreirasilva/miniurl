'use client'

import React, { useState } from 'react';
import { UrlForm } from '../UrlForm/UrlForm';
import { Timestamp } from 'mongodb';
import { Copy, Check } from 'lucide-react';

interface newUrlProps {
  originalUrl: string;
  shortenedUrl: string;
  date: Timestamp;
  _id: string;
}

export function Main() {
  const [newUrl, setNewUrl] = useState<newUrlProps>();
  const [textCopied, setTextCopied] = useState(false);
  const mainDomain = 'miniurl.click/';
  const urlToShow = `${mainDomain}${newUrl?.shortenedUrl}`;
  const urlToCopy = `https://${mainDomain}${newUrl?.shortenedUrl}`;

  function onCreateNewUrl(shortened: newUrlProps) {
    setNewUrl(shortened);
    setTextCopied(false);
  }

  function handleCopyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setTextCopied(true)
  }

  return (
    <main className="bg-gray-600">
      <UrlForm onCreateNewUrl={onCreateNewUrl}></UrlForm>

      <div className='flex items-center justify-center mt-12'>
        {newUrl && (
          <div>
            <h2 className="text-2xl font-semibold">
              <div className='flex flex-row items-center justify-center gap-4'>
                <span className='underline'>{urlToShow}</span>
                {textCopied ? (
                  <Check className='text-green-500' size={30} />
                ) : (
                  <Copy className='cursor-pointer hover:text-gray-300' size={30} onClick={() => handleCopyUrl(urlToCopy)} />
                )}
              </div>
            </h2>
          </div>
        )}
      </div>
    </main >
  );
}
