'use client'

import axios from 'axios';
import { Timestamp } from 'mongodb';
import React, { ChangeEvent, useState, FormEvent } from 'react';
import { Loader } from 'lucide-react';

interface UrlFormProps {
  onCreateNewUrl: (url: newUrlType) => void;
}

interface newUrlType {
  originalUrl: string;
  shortenedUrl: string;
  date: Timestamp;
  _id: string;
}

export function UrlForm({ onCreateNewUrl }: UrlFormProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const isSubmitBtnDisabled = url.length > 0 ? false : true;

  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsloading(true);

    axios.post('/api/url', {
      "originalUrl": url
    }).then(({ data }) => {
      onCreateNewUrl(data);
      setUrl('');
      setIsloading(false);
    }).catch(err => {
      console.log(err);
      setIsloading(false);
    })
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setUrl(event.target.value);
  }

  return (
    <form onSubmit={handleSubmitForm} className="-mt-6 flex flex-col gap-4 sm:flex-row items-center justify-center px-8">
      <input
        className="w-full max-w-[30rem] h-[3rem] p-4 rounded-sm text-gray-500 border-2 border-gray-600 outline-2 outline-gray-700"
        name="url"
        placeholder="Type the URL to be shortened"
        value={url}
        onChange={handleInputChange}
      />

      <button
        disabled={isSubmitBtnDisabled || isLoading}
        className="bg-blue-700 p-3 rounded-sm w-full max-w-[10rem] hover:bg-blue-800 disabled:opacity-70 disabled:pointer-events-none flex justify-center"
        type="submit"
      >
        {isLoading ? <Loader className='animate-spin' /> : <span>Create</span>}
      </button>
    </form >
  )
}