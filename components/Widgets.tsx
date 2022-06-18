import { SearchIcon } from "@heroicons/react/outline";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

export const Widgets = () => {
  return (
    <div className="hidden lg:inline px-2 mt-2 col-span-2">
      {/* Search box */}
      <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          name=""
          id=""
          placeholder="Search Twitter"
          className="bg-transparent outline-none flex-1"
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="tansi_jones"
        options={{ height: 1000 }}
      />
    </div>
  );
};
