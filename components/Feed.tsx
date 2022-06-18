import { RefreshIcon } from "@heroicons/react/outline";
import { Tweet } from "../typings";
import { TweetBox } from "./TweetBox";
import toast from "react-hot-toast";
import { Tweet as TweetComponent } from "../components/Tweet";
import { fetchTweets } from "../utils/fetchTweets";
import { useState } from "react";
interface Props {
  tweets: Tweet[];
}

export const Feed = ({ tweets: tweetsProp }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);
  console.log(tweets);

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing...");
    const tweets = await fetchTweets();
    setTweets(tweets);
    toast.success("Feed Updated!", {
      id: refreshToast,
    });
  };

  return (
    <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-between">
        <h1 className="p-5 text-xl font-bold pb-0">Home</h1>
        <RefreshIcon
          className="h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
          onClick={handleRefresh}
        />
      </div>

      <div className="">
        <TweetBox setTweets={setTweets} />
      </div>

      {/* Feed */}
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};
