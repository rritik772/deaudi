import AddTrack from "./AddTrack";

export default function ProfileInfo() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div className="
        grid grid-cols-1 md:grid-cols-2 gap-5
        robo border-1 p-5 rounded-lg bg-white shadow-sm"
      >

        <span className="text-3xl mb-3 rig uppercase tracking-widest col-spans-2">Profile</span>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" className="input mont" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" className="input mont" />
        </div>

        <div className="flex flex-col gap-2 col-spans-2">
          <label htmlFor="desc">Description</label>
          <textarea id="desc" className="input" />
        </div>

        <div />
        <button className="hover:(border-green-500 shadow-xl) text-sm duration-500 rounded-lg px-4 py-2 border justify-self-end">Confirm Edit</button>
      </div>

      <div className="flex flex-col gap-2 border p-5 rounded-lg">
        <span className="text-3xl rig mb-3">Add Track</span>
        <AddTrack />
      </div>
    </div>
  )
}
