

const PlusModel = ({
    isOpen,
    setIsOpen
    
}) => {
  return (
    <div>
        {/* <div className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors">
            <span className="text-6xl">+</span>
        </div> */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-8 rounded-lg w-96">
            <div><button onClick={
            () => setIsOpen(false)
            } className=" ml-72 text-2xl">x</button></div>
            <h2 className="text-2xl font-semibold mb-4">Create Project</h2>
            <input type="text" placeholder="Project Name" className="w-full p-2 border border-gray-300 rounded-lg mb-4" />
            <textarea placeholder="Description" className="w-full p-2 border border-gray-300 rounded-lg mb-4"></textarea>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg p-2">Create</button>
            </div>
    
            {/* <button onClick={
            () => setIsOpen(false)
            } className="fixed inset-0 bg-black bg-opacity-0 z-40 w-full h-full">a</button> */}
    
        </div>
    </div>
  )
}

export default PlusModel