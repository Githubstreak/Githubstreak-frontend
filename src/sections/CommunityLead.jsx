import { User, Link } from "@nextui-org/react";

const CommunityLead = () => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 py-12">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 text-center">
        <p className="text-3xl md:text-4xl font-bold text-white mb-4">
          &quot;Consistency Beats Talent&quot;
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          Consistency beats talent because it is more sustainable, adaptable,
          and rewarding. It helps one improve skills, achieve goals, and
          overcome challenges.
        </p>
        <Link href="https://x.com/Kwame_Tech1" size="sm" isExternal>
          <User
            className="text-green-400 justify-center"
            name="Kwame Edmond "
            description="Githubstreak Community Lead"
            avatarProps={{
              src: "https://avatars.githubusercontent.com/u/107095324?v=4",
            }}
          />
        </Link>
      </div>
    </section>
  );
};

export default CommunityLead;
