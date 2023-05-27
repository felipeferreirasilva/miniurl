'use client'

import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

interface RedirectTypes {
  params: {
    id: string
  };
}

export default function Redirect({ params }: RedirectTypes) {
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