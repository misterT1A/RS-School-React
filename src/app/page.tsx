// import Image from 'next/image';

// import styles from './page.module.css';
async function getData() {
  const res = await fetch('https://swapi.dev/api/planets');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Home = async () => {
  const data = await getData();
  return <div>page {data.results.toString()} </div>;
};

export default Home;
