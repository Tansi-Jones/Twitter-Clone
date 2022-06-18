import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { TweetBody, Tweet } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

export const TweetBox = ({ setTweets }: Props) => {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<Boolean>(false);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlBoxIsOpen(false);
  };

  const postTweet = async () => {
    const tweetBody: TweetBody = {
      text: input,
      userName: session?.user?.name || "Unkwown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
      image: image,
    };
    console.log(image);

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetBody),
      method: "POST",
    });

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast("Tweet Posted", {
      icon: "🚀",
    });
    return json;
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    postTweet();

    setImage("");
    setInput("");
    setImageUrlBoxIsOpen(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        src={session?.user?.image || "https://links.papareact.com/gll"}
        alt=""
        className="h-14 w-14 rounded-full object-cover mt-4"
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="What's Happening?"
            className=" h-24 w-full text-xl placeholder:text-xl outline-none"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="bg-twitter text-white px-5 py-2 font-bold rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {imageUrlBoxIsOpen && (
            <div className="mt-5 flex rounded-lf py-2 px-4 bg-twitter/80">
              <input
                ref={imageInputRef}
                type="text"
                placeholder="Enter Image Url"
                className="flex-1 bg-transparent p-2 outline-none text-white placeholder:text-white"
              />
              <button
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </div>
          )}
          {image && (
            <img
              src={image}
              className="mt-10 h-40 rounded-xl w-full object-contain shadow"
            />
          )}
        </form>
      </div>
    </div>
  );
};
