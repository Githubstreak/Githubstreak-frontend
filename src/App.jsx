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
        <span className="loading loading-spinner loading-md"></span>
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
