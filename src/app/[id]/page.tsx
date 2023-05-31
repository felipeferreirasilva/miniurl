'use client'

import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

interface RedirectProps {
  params: {
    id: string
  };
}

export default function Redirect({ params }: RedirectProps) {
  const { push } = useRouter();

  useEffect(() => {
    axios.get(`/api/url?shortenedUrl=${params.id}`)
      .then(({ data }) => {
        push(data.originalUrl);
      })
      .catch(err => {
        console.log(err);
      })
  }, [params.id, push]);
}