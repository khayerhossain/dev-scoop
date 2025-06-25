import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `DevScoop - ${title}`;
  }, [title]);
};

export default usePageTitle;