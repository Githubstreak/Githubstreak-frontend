import { track } from '@vercel/analytics';
import { XLogo, YoutubeLogo, WhatsappLogo } from "../components/icons";

const Footer = () => {
  return (
  <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded">
  <nav className="grid grid-flow-col gap-4">
    <a href="/" className="link link-hover">About us</a>
    <a className="link link-hover">Contact githubstreak@gmail.com</a>
  </nav> 
  <nav>
    <b className="mb-5">Please follow Githubstreak on all of our socials.</b>
    <div className="grid grid-flow-col gap-4">
      <a href="https://x.com/githubstreak" target="_blank" rel="noreferrer"
       onClick={() => {
        track(<XLogo />)
        }}
      >
        <XLogo />
      </a>
      <a href=" https://youtube.com/@githubstreak01?si=tUr9EsmpuhAzgGad " target="_blank"
       onClick={() => {
        track(<YoutubeLogo />)
        }}
      >
        <YoutubeLogo />
      </a>
      <a href="https://whatsapp.com/channel/0029VajqURrEQIanKQ3Z7z3R" target="_blank" rel="noopener noreferrer"
       onClick={() => {
        track(<WhatsappLogo />)
        }}
      >
        <WhatsappLogo />
      </a>
    </div>
  </nav> 
    <aside>
    <p className="mb-2">Copyright © 2024 - All right reserved #githubstreak &apos;24</p>
  </aside>
</footer>
  )
}

export default Footer;

