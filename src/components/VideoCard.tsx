import React from 'react';
import { VideoData } from '../types/type';

interface VideoCardProps {
  video: VideoData;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return <div>{video.title}</div>;
};

export default VideoCard;
