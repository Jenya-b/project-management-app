import './index.scss';
import { linkImageCourse, linksToGithub } from '../../constants/constFooter';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div
          className="footer__img"
          style={{
            backgroundImage: `url(${linkImageCourse})`,
          }}
        ></div>
        <p className="footer__date">©2022</p>
        <ul className="footer__contacts">
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
