import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { User, Link } from "@nextui-org/react";
import useGetLeaderboard from "../hooks/useGetLeaderboard";

const Topthree = () => {
  const { topThree, isLoading } = useGetLeaderboard();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="gap-5 m-auto grid lg:grid-cols-3 grid-cols-1 w-full p-10">
      {topThree.map((user) => (
        <Card shadow="sm" className="bg-green-900" key={user.username}>
          <CardBody className="overflow-visible p-5">
            <User
              className="text-white"
              name={user.username}
              description={
                <Link
                  href={`https://github.com/${user.username}`}
                  className="text-white"
                  size="sm"
                  isExternal
                >
                  {`@${user.username}`}
                </Link>
              }
              avatarProps={{
                src: user.avatar,
              }}
            />
          </CardBody>
          <CardFooter className="text-small text-white">
            <b className="mr-8 ml-14">rank {user.rank}</b>
            <p>contributions {user.contributions}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Topthree;
