import { RefreshIcon } from "@heroicons/react/outline";
import { Tweet } from "../typings";
import { TweetBox } from "./TweetBox";

interface Props {
  tweets: Tweet[];
}

export const Feed = ({ tweets }: Props) => {
  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between">
        <h1 className="p-5 text-xl font-bold pb-0">Home</h1>
        <RefreshIcon className="h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>

      {/* Twitte box */}
      <div className="">
        <TweetBox />
      </div>

      {/* Feed */}
    </div>
  );
};
