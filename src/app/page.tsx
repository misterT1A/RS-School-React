// import Root from './(root)/Root';
import RootWithLoader from '../components/root/RootWithLoader';

const Home = ({ searchParams }: { searchParams: { [key: string]: string } }) => (
  <RootWithLoader searchParams={searchParams} />
  // <Root searchParams={searchParams} />
);

export default Home;
