import {User} from "@nextui-org/react";

const CommunityLead = () => {
  return (
    <>
    <div  class="grid place-items-center p-10">
      <b class="mb-2 text-4xl">"Consistency Beats Talent"</b>
      <p  class="mb-5 text-xl" >Consistency beats talent
      because it is more sustainable, adaptable, 
      and rewarding. <br /> It helps one improve skills, 
      achieve goals, and overcome challenges.</p>
    <User 
      name="Edmond Akwasi"
      description="Githubstreak Community Lead"
      avatarProps={{
        src: ""
      }}
    />
    </div>
    </>
  );

}

export default CommunityLead;