import {User} from "@nextui-org/react";

const CommunityLead = () => {
  return (
    <>
    <div  class="p-">
      <div class="flex justify-center"> 
        <b>"Consistency Beats Talent"</b>
      </div>
        <div class="flex justify-center">
          <p> The quick brown fox jumps over the lazy dog</p>
        </div>
    </div>
    <User   
      class="flex justify-center p-5"
      name="Edmond Akwasi"
      description="Githubstreak Community Lead"
      avatarProps={{
        src: ""
      }}
    />
    </>
  );

}

export default CommunityLead;