import GenerateRandomNum from "../component/GenerateRandomNum";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <GenerateRandomNum />
      <Footer />
    </div>
  );
}
