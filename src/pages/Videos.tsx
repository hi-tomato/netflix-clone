import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import VideoCard from '@components/VideoCard';
import { VideoData } from 'types/type';

const Videos = () => {
  const { keyword } = useParams();
  const { isLoading, isError, data } = useQuery({
    queryKey: ['videos', keyword || 'popular'],
    queryFn: async () => {
      return fetch(`/data/${keyword ? 'search' : 'popular'}.json`)
        .then((res) => res.json())
        .then((items) => items.results);
    }
  });

  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div>
      Videos {keyword ? `${keyword} 🔍` : `🔥`}{' '}
      {data?.map((items: VideoData) => (
        <VideoCard key={items.id} video={items} />
      ))}
    </div>
  );
};

export default Videos;
