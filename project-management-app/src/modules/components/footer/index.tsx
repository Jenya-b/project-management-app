import './index.scss';
import { linksToGithub } from '../../constants/constFooter';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__date">©2022</p>
        <ul className="contacts">
          {linksToGithub.map((link) => (
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
