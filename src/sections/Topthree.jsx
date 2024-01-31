const Topthree = (props) => {
  return (
  <div className="card w-96 bg-base-100 shadow-xl m-10 flex flex-1">
        <figure className="px-10 pt-10">
            <img src="/" alt="profile" className="rounded-xl" />
        </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">rank {props.rank} 1</h2>
        <h3>contributions {props.contributions}</h3>
      <div className="card-actions">
        <button className="btn" class="bg-green-700 rounded-lg p-3"><a href="/">Github link</a></button>
      </div>
  </div>
</div>
  )
}

export default Topthree;