import {Avatar} from "@nextui-org/react";

const Topthree = (props) => {
  return (
  <div className="card w-96 bg-green-800 shadow-xl m-10 flex flex-1">
        <figure className="px-10 pt-10">
        <div>
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-30 h-30 text-large" />
        </div>
        </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title" class="text-black">rank {props.rank} 1</h2>
        <h3 class="text-black">contributions {props.contributions}</h3>
      <div className="card-actions">
        <button className="btn" class="bg-green-700 rounded-lg p-3"><a href="/" class="text-black">Github link</a></button>
      </div>
  </div>
</div>
  )
}

export default Topthree;