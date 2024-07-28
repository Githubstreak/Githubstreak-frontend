import React, { useState, useEffect } from 'react';
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { API_URL } from "../utils/constants";

const ContributorsProfile = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(`${API_URL}/v1/projects/contributors`);
        const data = await response.json();
        setContributors(data);
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
            key={contributor.login}
            src={contributor.avatarUrl}
            alt={contributor.login}
          />
        ))}
      </AvatarGroup>
    </div>
  );
}

export default ContributorsProfile;