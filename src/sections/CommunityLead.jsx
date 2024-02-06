import {User} from "@nextui-org/react";

const CommunityLead = () => {
  return (
    <>
    <div  class="grid place-items-center p-10">
      <b>"Consistency Beats Talent"</b>
      <p  class="mb-5">The quick brown fox jumps over the lazy dog</p>
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