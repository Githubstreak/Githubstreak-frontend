import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {Avatar} from "@nextui-org/react";

const Topthree = () => {
  const list = [
    {
      rank: "1",
      img: "",
      contributions: "6968",
    },
    {
      rank: "2",
      img: "",
      contributions: "6869",
    },
    {
      rank: "3",
      img: "",
      contributions: "576",
    },
  ];

  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 p-10">
      {list.map((item, index) => (
        <Card shadow="sm" className=" bg-green-800"key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large align-middle" />
          </CardBody>
          <CardFooter className="text-small">
            <b className="mr-8">rank {item.rank}</b>
            <p className="text-default-500">contributions {item.contributions}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Topthree;
