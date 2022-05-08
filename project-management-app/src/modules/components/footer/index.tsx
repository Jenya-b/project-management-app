import './index.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__date">©2022</p>
        <ul className="contacts">
          <li>
            <a className="contacts__link" href="https://github.com/Jenya-b">
              Jenya-b
            </a>
          </li>
          <li>
            <a className="contacts__link" href="https://github.com/ckolobov">
              ckolobov
            </a>
          </li>
          <li>
            <a className="contacts__link" href="https://github.com/MilanaKard">
              MilanaKard
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
