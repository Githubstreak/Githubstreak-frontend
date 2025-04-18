import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { User, Link } from "@nextui-org/react";

const Topthree = ({ topThree }) => {
  return (
    <>
      <b className="p-20">Top 1% Contributors: Last 7 days</b>
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
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
    </>
  );
};

export default Topthree;
