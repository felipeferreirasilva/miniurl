'use client'

import React, { useState } from 'react';
import { UrlForm } from '../UrlForm/UrlForm';
import { Timestamp } from 'mongodb';
import { Copy, Check } from 'lucide-react';

interface newUrlType {
  originalUrl: string;
  shortenedUrl: string;
  date: Timestamp;
  _id: string;
}

export function Main() {
  const [newUrl, setNewUrl] = useState<newUrlType>()
  const [textCopied, setTextCopied] = useState(false)

  function onCreateNewUrl(shortened: newUrlType) {
    setNewUrl(shortened);
    setTextCopied(false);
  }

  function handleCopyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setTextCopied(true)
  }

  const domain = 'miniurl.click/'

  return (
    <main className="bg-gray-600">
      <UrlForm onCreateNewUrl={onCreateNewUrl}></UrlForm>

      <div className='flex items-center justify-center mt-12'>
        {newUrl && (
          <div>
            <h2 className="text-2xl font-semibold">
              <div className='flex flex-row items-center justify-center gap-4'>
                <span className='underline'>{`${domain}${newUrl?.shortenedUrl}`}</span>
                {textCopied ? (
                  <Check size={30} color='var(--green-500)' />
                ) : (
                  <Copy className='cursor-pointer hover:text-gray-300' size={30} onClick={() => handleCopyUrl(`https://${domain}${newUrl?.shortenedUrl}`)} />
                )}
              </div>
            </h2>
          </div>
        )}
      </div>
    </main >
  );
}
