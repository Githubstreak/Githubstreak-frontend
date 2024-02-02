import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";

const UserInput = () => {
  return (
    <div className="flex w-70 p-10 flex-wrap md:flex-nowrap gap-4">
      <Input type="email" label="username" placeholder="Enter your Github user name" />
      <Button color="success">
      Add me
    </Button>
    </div>
  );
}

export default UserInput;
