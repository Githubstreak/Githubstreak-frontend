import {
  Hero,
  Leaderboard,
  Topthree,
 
  CommunityLead,
} from "../sections";
import useGetLeaderboard from "../hooks/useGetLeaderboard";
import { Fragment } from "react";

const Home = () => {
  const { leaderboard, topThree, isLoading } = useGetLeaderboard();

  return (
    <main>
      <section>
        <Hero />
      </section>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="text-center loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <Fragment>
          <section>
            <Topthree topThree={topThree} />
          </section>
          <section>
            <Leaderboard leaderboard={leaderboard} />
          </section>
        </Fragment>
      )}
      
      <section>
        <CommunityLead />
      </section>
    </main>
  );
};

export default Home;
