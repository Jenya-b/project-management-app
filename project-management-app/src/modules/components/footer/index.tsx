import './index.scss';

const links = [
  'https://github.com/Jenya-b',
  'https://github.com/Ckolobov',
  'https://github.com/MilanaKard',
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__date">©2022</p>
        <ul className="contacts">
          {links.map((link) => (
            <li key={link}>
              <a className="contacts__link" href={link}>
                {link.slice(link.lastIndexOf('/') + 1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
