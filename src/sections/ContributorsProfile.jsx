import {Avatar, AvatarGroup} from "@nextui-org/react";

const ContributorsProfile =  () => {
  return (
    <div className="grid place-items-center p-5 ">
      <b className="mb-5 sm: text-2xl">Open source contributors</b>
      <AvatarGroup isBordered isGrid max={7}>
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar src="https://i.pravatar.cc/300?u=a042581f4f29026707d" />
      <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026710d" />
      <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026712d" />
    </AvatarGroup>

    </div>
    
  );
}

export default ContributorsProfile;