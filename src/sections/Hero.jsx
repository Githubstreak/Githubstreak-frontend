import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/clerk-react';

const Hero = () => {
  return (
    <>
      <div className="hero min-h-[60vh] xl:min-h-screen bg-base-200 mb-5">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-3xl md:text-6xl font-bold xl:text-8xl">
              Welcome to{" "}
              <span className="text-green-700 font-extrabold">Githubstreak</span>
            </h1>
            <p className="py-6 text-xl md:text-3xl xl:text-6xl">
              Level up your coding game, set new records, and revel in the
              camaraderie of GitHub CodeStreak's Leaderboard
            </p>
            <div className="mt-4">
              <SignedOut>
                <SignInButton className="px-4 py-2 text-sm md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-4 lg:text-xl font-bold text-white bg-green-700 rounded-lg hover:bg-green-800 transition duration-300">
                  Get Started
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton className="px-4 py-2 text-sm md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-4 lg:text-xl font-bold text-white bg-green-700 rounded-lg hover:bg-green-800 transition duration-300">
                  Get Started
                </UserButton>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
