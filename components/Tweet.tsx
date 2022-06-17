import { Tweet as Tweets } from "../typings";

interface Props {
  tweet: Tweets;
}

export const Tweet = ({ tweet }: Props) => {
  return (
    <div>
      <div>
        <img src={tweet.profileImg} alt={tweet.profileImg} />
      </div>
      <div>
        <div>
          <p>{tweet.userName}</p>
          {/* <p>@{tweet.userName.replace(/\s+/g, "").toLowerCase()}</p> */}
        </div>
      </div>
    </div>
  );
};
