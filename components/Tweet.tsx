import React, { useEffect, useState } from "react";
import { Comment, Tweet as Tweets } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utils/fetchComments";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

interface Props {
  tweet: Tweets;
}
export const Tweet = ({ tweet }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex- flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3">
        <img
          src={tweet.profileImg}
          alt={tweet.profileImg}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.userName}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.userName.replace(/\s+/g, "_").toLowerCase()} .
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p className="pt-1 text-lg">{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <div
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {/* Comment Box Logic */}
      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3" onSubmit={handleSubmit}>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            type="text"
            placeholder="Write a comment"
            className="outline-none flex-1 rounded-lg bg-gray-100 p-2"
            value={input}
          />
          <button
            disabled={!input}
            type="submit"
            className="text-twitter disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          <div>
            {comments.map((comment) => (
              <div key={comment._id} className="relative flex space-x-2 pb-4">
                <hr className="absolute left-5 top-10 h-8 border-x border-gray-200" />
                <img
                  src={comment.profileImg}
                  className="h-7 w-7 object-cover rounded-full mt-2"
                  alt=""
                />
                <div className="">
                  <div className="flex items-center space-x-1">
                    <p className="mr-1 font-bold">{comment.userName}</p>
                    <p className="hidden text-sm text-gray-500 lg:inline">
                      @{comment.userName.replace(/\s+/g, "_").toLowerCase()} .
                    </p>
                    <TimeAgo
                      className="text-sm text-gray-500"
                      date={comment._createdAt}
                    />
                  </div>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
