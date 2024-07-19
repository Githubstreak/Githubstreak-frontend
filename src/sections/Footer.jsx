import { FaArrowUp } from 'react-icons/fa'; // Import the arrow-up icon from react-icons

const Footer = () => {
  return (
    <footer role="contentinfo" aria-label="Footer" className="relative footer footer-center p-10 bg-base-300 text-base-content rounded md:flex md:justify-between">
      <nav className="grid grid-flow-col gap-4">
        <a href="Githubstreak-pdf" className="link link-hover" aria-label="About us">About us</a>
        <a href="/contact" className="link link-hover" aria-label="Contact">Contact</a>
        <a href="https://twitter.com/yourhandle" className="link link-hover" aria-label="Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M22.46 6c-.77.35-1.6.59-2.47.69.89-.53 1.57-1.37 1.89-2.37-.83.49-1.76.85-2.74 1.04a4.76 4.76 0 0 0-8.12 4.34C8.55 9.56 5.71 7.74 3.68 4.62a4.75 4.75 0 0 0-.64 2.38c0 1.64.84 3.09 2.1 3.93-.77-.03-1.5-.24-2.14-.6v.06c0 2.28 1.62 4.18 3.77 4.61-.4.11-.82.17-1.24.17-.3 0-.59-.03-.88-.08.59 1.84 2.31 3.18 4.36 3.22a9.53 9.53 0 0 1-5.89 2.03c-.38 0-.75-.02-1.12-.06a13.41 13.41 0 0 0 7.25 2.13c8.7 0 13.45-7.21 13.45-13.46 0-.2-.01-.39-.02-.58.92-.66 1.71-1.48 2.34-2.42z"></path>
          </svg>
        </a>
        {/* Add more social media links as needed */}
      </nav>
      <aside className="text-center md:text-left">
        <p className="mb-2">Copyright © 2024 - All right reserved #githubstreak '24</p>
        <form className="mt-4 flex items-center">
          <label htmlFor="newsletter" className="sr-only">Subscribe to our newsletter</label>
          <input
            type="email"
            id="newsletter"
            placeholder="Your email"
            className="input input-bordered mr-2" // Added margin-right for spacing
          />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
      </aside>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="text-xl absolute bottom-4 right-4 md:hidden"
        aria-label="Back to Top"
      >
        <FaArrowUp />
      </button>
    </footer>
  )
}

export default Footer;
