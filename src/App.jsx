import { Hero, Leaderboard, Topthree, Footer  } from './sections';

import Nav from './components/Nav';

const App = () => (
  <main>
    <Nav />
  <section>
    <Hero />
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
