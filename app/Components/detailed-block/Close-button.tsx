import type { ReactElement } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import btnStyles from '../../UI/button/_button.module.scss';

const CloseButton = (): ReactElement => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <button
      className={btnStyles.button}
      name="close"
      type="button"
      onClick={() => {
        const query = searchParams.get('query')?.toString() || '';
        const page = searchParams.get('page')?.toString() || '1';

        navigate(`/?query=${query}&page=${page}`);
      }}
    >
      Close
    </button>
  );
};

export default CloseButton;
