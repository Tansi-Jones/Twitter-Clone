export interface Tweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _fev: string;
  _type: "tweet";
  blockTweet: boolean;
}

export type TweetBody = {
  text: string;
  userName: string;
  profileImg: string;
  image: string;
};
