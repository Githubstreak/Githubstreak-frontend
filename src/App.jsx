import { Hero, Leaderboard, UserInput, Topthree, Footer  } from './sections';

import Nav from './components/Nav';

const App = () => (
  <main>
    <Nav />
  <section>
    <Hero />
  </section>
  <section>
    <UserInput />
  </section>
  <section>
    <Topthree />
  </section>
  <section>
    <Leaderboard />
  </section>
  <section>
    <Footer />
  </section>
  </main>
)

export default App;
