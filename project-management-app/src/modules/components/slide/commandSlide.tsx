import { useTranslation } from 'react-i18next';
import { commandSlideData } from '../../constants/constMain';
import './index.scss';

export const CommandSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="command-slide">
      {commandSlideData.map(({ img, developer, address }) => (
        <div key={developer} className="command-slide__wrapper">
          <div
            className="command-slide__img"
            style={{
              backgroundImage: `url("${img}")`,
            }}
          ></div>
          <div className="command-slide__developer">{t(developer)}</div>
          <div className="command-slide__address">{t(address)}</div>
        </div>
      ))}
    </div>
  );
};
