import { useRouter } from 'next/router';

export interface ISearchUrlParams {
  q: string;
  page: number;
}

const useSearchUrl = (): ISearchUrlParams => {
  const router = useRouter();
  const { q } = router.query;
  const p = router.query.page;
  const search = Array.isArray(q) ? q.join(',') : q || '';
  const page = Array.isArray(p) ? Number(p.join(',')) : Number(p) || 1;
  return { q: search, page };
};

export default useSearchUrl;
