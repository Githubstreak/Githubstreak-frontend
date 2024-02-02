import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {User, Link} from "@nextui-org/react";

const Topthree = () => {
  const list = [
    {
      rank: "1",
      img: "",
      contributions: "69k",
    },
    {
      rank: "2",
      img: "",
      contributions: "30k",
    },
    {
      rank: "3",
      img: "",
      contributions: "13k",
    },
  ];

  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 p-10">
      {list.map((item, index) => (
        <Card shadow="sm" className=" bg-green-800"key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-5">
          <User   
      name="Edmond Akwasi"
      description={(
        <Link href="https://twitter.com/Techenvy6" className="text-default-500" size="sm" isExternal>
          @Edmondakwasi
        </Link>
      )}
      avatarProps={{
        src: "/"
      }}
    />
          </CardBody>
          <CardFooter className="text-small text-default-500">
            <b className="mr-8 ml-14">rank {item.rank}</b>
            <p>contributions {item.contributions}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Topthree;
