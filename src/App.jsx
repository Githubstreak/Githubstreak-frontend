import { Hero, Leaderboard, Topthree, Footer  } from './sections';

import Nav from './components/Nav';

const App = () => (
  <main>
    <Nav />
  <section>
    <Hero />
  </section>
  <section>
    <Topthree 
      Rank={1}
      contributions={23417}
    
    />
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
