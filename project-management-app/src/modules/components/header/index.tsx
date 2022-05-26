import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  EDIT_PROFILE,
  DELETE_PROFILE,
  DEL_PROFILE_TEXT,
  LOG_OUT,
  LOG_OUT_TEXT,
  navLinkTitle,
  settingsProfile,
  NEW_PROJECT,
} from '../../constants/constHeader';
import { pathToPage } from '../../constants/constRoutes';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Avatar,
  Box,
  FormLabel,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './index.scss';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { langInterfaceSlice } from '../../../store/reducers/langInterfaceSlice';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialog } from '../confirmationDialog';
import { confirmationDialogSlice } from '../../../store/reducers/confirmationDialogSlice';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { BasicModal } from '../modal';
import { Boards } from '../../../utils/api/boards/boards';
import { fetchProjects } from '../../../store/reducers/projects/projectsThunks';
import { logout } from '../../../store/reducers/login/loginSlice';
import { USER_DATA_KEY, TOKEN_KEY } from '../../constants/constLocalStorage';

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isEnglishLanguage, setIsEnglishLanguage] = useState<boolean>(true);
  const [infoDialog, setInfoDialog] = useState<string>('');
  const [newProjectTitle, setNewProjectTitle] = useState<string>('');
  const dispatch = useAppDispatch();
  const { isModalActive } = useAppSelector((state) => state.confirmationDialog);
  const { setLanguage } = langInterfaceSlice.actions;
  const { setDialogActivity } = confirmationDialogSlice.actions;
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { homePath, editProfilePath } = pathToPage;
  const { token } = useAppSelector((state) => state.loginReducer);

  useEffect(() => {
    dispatch(setLanguage(isEnglishLanguage ? 'en' : 'ru'));
    i18n.changeLanguage(isEnglishLanguage ? 'en' : 'ru');
  }, [dispatch, i18n, isEnglishLanguage, setLanguage]);

  const handleLanguageChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget;
    setIsEnglishLanguage(checked);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleProjectTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewProjectTitle(value);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const closeConfirmationDialog = () => {
    dispatch(setDialogActivity(false));
  };

  const confirmAction = () => {
    switch (infoDialog) {
      case DEL_PROFILE_TEXT:
        deleteProfile();
        break;
      case LOG_OUT_TEXT:
        signOut();
        break;
      case NEW_PROJECT:
        addNewProject();
        break;
    }
    closeConfirmationDialog();
    setTimeout(() => setInfoDialog(''), 500);
  };

  const clickMenuItem = (item: string) => {
    switch (item) {
      case EDIT_PROFILE:
        navigate(editProfilePath);
        break;
      case DELETE_PROFILE:
        setInfoDialog(DEL_PROFILE_TEXT);
        dispatch(setDialogActivity(true));
        break;
      case LOG_OUT:
        setInfoDialog(LOG_OUT_TEXT);
        dispatch(setDialogActivity(true));
        break;
      case NEW_PROJECT:
        setInfoDialog(NEW_PROJECT);
        dispatch(setDialogActivity(true));
        break;
    }
    handleCloseUserMenu();
  };

  const deleteProfile = () => {};

  const signOut = () => {
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(TOKEN_KEY);
    dispatch(logout());
  };

  const getProjects = async () => {
    dispatch(fetchProjects());
  };

  const addNewProject = async () => {
    if (token) {
      await Boards.createBoard({ title: newProjectTitle }, token);
    }
    getProjects();
    navigate(homePath);
  };

  return (
    <>
      <AppBar
        className="header"
        position="sticky"
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: 'unset',
          borderBottom: 'solid 2px rgba(0, 0, 0, .1)',
        }}
      >
        <Toolbar disableGutters sx={{ mx: 4, justifyContent: 'space-between' }}>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ mt: '8px', display: { xs: 'block', md: 'none' } }}
            >
              {navLinkTitle.map((title) => (
                <NavLink key={title} to={pathToPage[`${title.slice(0, -2)}th`]}>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    sx={{ border: 'solid 2px rgba(0, 0, 0, .1)', borderTop: 'none' }}
                  >
                    <Typography textAlign="center">{t(title)}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {navLinkTitle.map((title) => (
              <NavLink
                key={title}
                to={pathToPage[`${title.slice(0, -2)}th`]}
                className="header__link"
                onClick={handleCloseNavMenu}
              >
                {t(title)}
              </NavLink>
            ))}
          </Box>
          <Box sx={{ display: 'flex', columnGap: '1.5rem' }}>
            <Tooltip title={t('createNewBoardHelperText')}>
              <IconButton
                onClick={() => clickMenuItem(NEW_PROJECT)}
                size="large"
                aria-label="create new board"
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: 'solid black 1px',
                borderRadius: '20px',
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={t('search')}
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Box>
            <FormLabel id="language-switcher">
              <input
                type="checkbox"
                className="language-switcher__checkbox"
                checked={isEnglishLanguage}
                onChange={handleLanguageChange}
              />

              <span id="round-slider"></span>
              <span id="select-ru">RU</span>
              <span id="select-en">EN</span>
            </FormLabel>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/2.jpg"
                sx={{
                  overflow: 'visible',
                  '&:before': {
                    content: '"❯"',
                    color: '#ffffff',
                    position: 'absolute',
                    backgroundColor: '#3026b9',
                    borderRadius: '50%',
                    height: '1em',
                    top: '2.6em',
                    left: '0',
                    mt: '-1em',
                    transform: 'rotate(90deg)',
                    width: '1em',
                  },
                }}
              />
            </IconButton>
            <Menu
              sx={{ mt: { xs: '48px', md: '55px' } }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingsProfile.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => clickMenuItem(setting)}
                  sx={{ border: 'solid 2px rgba(0, 0, 0, .1)', borderTop: 'none' }}
                >
                  <Typography textAlign="center">{t(setting)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <BasicModal
        isActive={isModalActive}
        closeWindow={closeConfirmationDialog}
        confirmAction={confirmAction}
      >
        {infoDialog === NEW_PROJECT ? (
          <>
            <Typography variant="h6" component="h2">
              {t('newProjectTypography')}
            </Typography>
            <TextField
              placeholder={t('projectName')}
              sx={{ marginBottom: 4, marginTop: 4 }}
              value={newProjectTitle}
              onChange={handleProjectTitleChange}
            />
          </>
        ) : (
          <ConfirmationDialog title="titleModal" desc={infoDialog} />
        )}
      </BasicModal>
    </>
  );
};
