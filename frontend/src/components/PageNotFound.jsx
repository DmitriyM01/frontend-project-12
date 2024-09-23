import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFoundPage')}</h1>
      <p className="text-muted">
        {`${t('canGoTo')} `}
        <Link to="/signup">{t('linkToMain')}</Link>
      </p>
    </div>
  );
};

export default PageNotFound;
