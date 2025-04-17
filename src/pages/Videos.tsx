import { useParams } from 'react-router-dom';
import VideoCard from '@components/VideoCard';
import { isSearch, useGetMockData } from '../hook/useFetch';
import { VideoData } from 'types/type';

const Videos = () => {
  const { keyword } = useParams();
  const { isError, isLoading, data } = isSearch(keyword || '');

  if (isError) return <p>Error...</p>;
  if (isLoading) return <p>isLoading...</p>;

  return (
    <div>
      {data?.map((items: VideoData) => (
        <VideoCard key={items.id} video={items} />
      ))}
    </div>
  );
};

export default Videos;
