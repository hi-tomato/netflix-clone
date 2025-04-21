import { getPostImageUrl } from '../hook/useFetch';
import { VideoData } from 'types/type';

interface VideoCardProps {
  video: VideoData;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const { title, vote_average, overview, release_date } = video;
  const imageURL = getPostImageUrl(video.poster_path);

  // Format release date if available - show only year
  const formattedDate = release_date
    ? new Date(release_date).getFullYear() + '년'
    : '미정';

  return (
    <div className="w-full cursor-pointer hover:scale-105 transition-transform duration-200 mb-6">
      {/* Main Card Container */}
      <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden shadow-lg bg-red-800 border border-gray-800 h-auto sm:h-32">
        {/* Thumbnail Section */}
        <div className="sm:w-48 md:w-56 lg:w-64 flex-shrink-0 relative">
          {imageURL ? (
            <img
              src={imageURL}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-48 sm:h-full flex items-center justify-center bg-gray-800 text-white p-4">
              <p className="text-gray-400">이미지를 불러오지 못하였습니다...</p>
            </div>
          )}

          {/* Vote Average Badge */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            {vote_average ? vote_average.toFixed(1) : 'N/A'}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            {/* Title - limited to 1 line */}
            <h2 className="text-base font-bold text-white mb-1 line-clamp-1">
              {title}
            </h2>

            {/* Rating */}
            <div className="flex items-center mb-2">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-900 text-yellow-300 mr-2">
                ★ {vote_average ? vote_average.toFixed(1) : 'N/A'}
              </span>
              {/* Release date next to rating */}
              <div className="flex items-center text-gray-400 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formattedDate}
              </div>
            </div>

            {/* Overview - only show if it exists, limited to 1 line */}
            {overview ? (
              <p className="text-gray-400 text-xs mb-1 line-clamp-1">
                {overview}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
