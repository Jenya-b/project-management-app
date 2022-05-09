import { NavLink } from 'react-router-dom';
import { navLinkTitle } from '../../constants/constHeader';
import { pathToPage } from '../../constants/constRoutes';
import './index.scss';

export const Header = () => {
  const { homePage, projectPage, loginPage } = navLinkTitle;
  const { homePath, projectPath, loginPath } = pathToPage;

  return (
    <header className="header">
      <NavLink to={homePath}>{homePage}</NavLink>
      <NavLink to={projectPath}>{projectPage}</NavLink>
      <NavLink to={loginPath}>{loginPage}</NavLink>
    </header>
  );
};
