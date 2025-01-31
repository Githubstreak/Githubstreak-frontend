import {
  Hero,
  Leaderboard,
  Topthree,
 
  CommunityLead,
} from "../sections";
import useGetLeaderboard from "../hooks/useGetLeaderboard";
import { Fragment } from "react";
import CompareButton from "../components/CompareButton";

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
      <div className="fixed z-41 bottom-0 right-0 left-0 md:w-1/2 flex align-center px-10 mb-5">
        <CompareButton />
      </div>
    </main>
  );
};

export default Home;
