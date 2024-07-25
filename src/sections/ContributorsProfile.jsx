import React, { useState, useEffect } from 'react';
import { Avatar, AvatarGroup } from "@nextui-org/react";

const ContributorsProfile = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        // Replace 'owner' and 'repo' with the actual owner and repository name
        const response = await fetch('https://api.github.com/repos/owner/repo/contributors');
        const data = await response.json();
        setContributors(data.slice(0, 9)); // Limit to 9 contributors (or adjust as needed)
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    };

    fetchContributors();
  }, []);

  return (
    <div className="grid place-items-center p-5">
      <b className="mb-5 sm:text-2xl">Open source contributors</b>
      <AvatarGroup isBordered isGrid max={7}>
        {contributors.map((contributor) => (
          <Avatar 
            key={contributor.id} 
            src={contributor.avatar_url} 
            alt={contributor.login}
          />
        ))}
      </AvatarGroup>
    </div>
  );
}

export default ContributorsProfile;