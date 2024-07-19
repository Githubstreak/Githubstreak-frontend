import {
  Hero,
  Leaderboard,
  Topthree,
  ContributorsProfile,
  CommunityLead,
  Footer,
} from "./sections";
import useGetLeaderboard from "./hooks/useGetLeaderboard";
import Nav from "./components/Nav";
import { Fragment } from "react";

const App = () => {
  const { leaderboard, topThree, isLoading } = useGetLeaderboard();

  return (
    <main>
      <Nav />
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
        <ContributorsProfile />
      </section>
      <section>
        <CommunityLead />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default App;
