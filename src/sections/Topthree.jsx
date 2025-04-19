import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { User, Link } from "@nextui-org/react";

const Topthree = ({ topThree }) => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16">
      <div className="pl-0 md:pl-0 lg:pl-0">
        <b className="text-lg md:text-xl lg:text-2xl font-bold block mb-8">
          Top 1% Contributors days
        </b>
        <div className="gap-5 grid lg:grid-cols-3 grid-cols-1 w-full">
          {topThree.map((user) => (
            <Card shadow="sm" className="bg-green-900 flex-row" key={user.username}>
              <CardBody className="overflow-visible p-5">
                <User
                  className="text-white justify-start"
                  name={user.username}
                  description={
                    <Link
                      href={`https://analytics.ggithubstreak.com/devs/${user.username}`}
                      className="text-white"
                      size="sm"
                      isExternal
                    >
                      {`@${user.username}`}
                    </Link>
                  }
                  avatarProps={{
                    src: user.avatar + "&s=48",
                  }}
                />
              </CardBody>
              <CardFooter className="text-small text-white flex-col items-start justify-center w-[250px]">
                <b>Rank {user.rank}</b>
                <p>Contributions {user.contributions}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topthree;
