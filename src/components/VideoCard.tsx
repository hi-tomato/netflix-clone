import React from 'react';
import { VideoData } from 'types/type';

interface VideoCardProps {
  video: VideoData;
}

const VideoCard = ({ video }: VideoCardProps) => {
  console.log(video);
  const { title } = video;
  return <div>{title}</div>;
};

export default VideoCard;
