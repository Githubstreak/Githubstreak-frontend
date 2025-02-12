
import Card from '../components/Card';
const Project = () => {
  const cards = Array(6).fill({
    title: 'Githubstreak',
    description: 'GitHubstreak is a haven for developers, a community fueled by the spirit of learning, building, collaboration, and inspiration.',
    author: {
      name: 'Josh',
      role: 'Frontend dev',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    },
    points: 10,
    progress: 35,
  });

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto  mt-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project