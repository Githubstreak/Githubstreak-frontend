import {User} from "@nextui-org/react";

const CommunityLead = () => {
  return (
    <>
    <div  class="flex justify-center items-center">
      <div> 
        <b>"Consistency Beats Talent"</b>
      </div>
        <div><p> a message here</p></div>
        
    
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