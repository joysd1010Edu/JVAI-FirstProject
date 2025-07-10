import Header from "@/components/HomePage/HeroSection/Header";
import MentalHealthHero from "@/components/HomePage/HeroSection/MentalHealthHero/MentalHealthHero";
import Ratting from "@/components/HomePage/RattingSection/Ratting";


export default function Home() {
  return (
    <div>
      <Header/>
      <MentalHealthHero/>
      <Ratting/>
    </div>
  );
}
