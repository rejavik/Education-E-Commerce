import HomeComponent from "../containers/home/Home";
import BookstoreBanner from "../containers/home/HomeBanner";

const Home = () => {
  return (
    <div>
      <BookstoreBanner />
      <HomeComponent />
    </div>
  );
};

export default Home;
