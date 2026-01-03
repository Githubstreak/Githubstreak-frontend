import { Card, CardBody, CardFooter, User } from "@nextui-org/react";

const Topthree = ({ topThree }) => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 py-8">
      <div className="pl-0 md:pl-0 lg:pl-0">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold block mb-8 text-white">
          🏆 Top Contributors This Week
        </h2>
        <div className="gap-5 grid lg:grid-cols-3 grid-cols-1 w-full">
          {topThree.map((user, index) => (
            <Card
              shadow="sm"
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex-row card-hover"
              key={user.username}
            >
              <CardBody className="overflow-visible p-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <User
                      className="text-white justify-start"
                      name={user.username}
                      description={
                        <span className="text-green-400">
                          {`@${user.username}`}
                        </span>
                      }
                      avatarProps={{
                        src: user.avatar,
                        className: "ring-2 ring-green-500",
                      }}
                    />
                  </div>
                </div>
              </CardBody>
              <CardFooter className="text-small text-white flex-col items-start justify-center w-[180px] bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </span>
                  <span className="font-bold text-lg">#{user.rank}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  {user.contributions.toLocaleString()} contributions
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topthree;
