import type { GetServerSideProps} from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import { Tweet } from "../typings";
import { fetchTweet } from "../utils/fetchTweets";

interface Props{
tweets:Tweet[]
}
const Home = ({tweets}:Props) => {
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Communeme</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster/>

      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widget />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweet();

  return {
    props: {
      tweets,
    },
  };
};
