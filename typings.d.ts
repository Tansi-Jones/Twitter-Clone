export interface Tweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "tweet";
  blockTweet: boolean;
}

export type TweetBody = {
  text: string;
  userName: string;
  profileImg: string;
  image: string;
};

export type CommentBody = {
  comment: string;
  tweetId: string;
  userName: stringprofileImg;
};

export interface Comment extends CommentBody {
  _id: string;
  _rev: string;
  _type: "comment";
  _createdAt: string;
  _updatedAt: string;
  tweet: {
    _ref: string;
    _type: "reference";
  };
}
