import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const FooterLinks = [
  { title: 'Browse', links: [
    { label: 'Trending', path: '/browse' },
    { label: 'Popular', path: '/browse' },
    { label: 'New Releases', path: '/browse' },
    { label: 'Categories', path: '/browse' },
  ]},
  { title: 'Support', links: [
    { label: 'Help Center', path: '#' },
    { label: 'Terms of Service', path: '#' },
    { label: 'Privacy Policy', path: '#' },
    { label: 'Cookie Preferences', path: '#' },
  ]},
  { title: 'Company', links: [
    { label: 'About Us', path: '#' },
    { label: 'Careers', path: '#' },
    { label: 'Press', path: '#' },
    { label: 'Contact', path: '#' },
  ]},
];

const SocialLinks = [
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiYoutube, href: '#', label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-dark-border mt-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-black mb-4 inline-block">
              <span className="text-primary">Stream</span>
              <span className="text-white">Flix</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Premium streaming platform bringing you the best movies and shows from around the world.
              Watch anywhere, anytime.
            </p>
          </div>
          {FooterLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-dark-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            {SocialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-gray-500 hover:text-white transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
          <p className="text-gray-600 text-xs text-center sm:text-right">
            &copy; {new Date().getFullYear()} StreamFlix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
