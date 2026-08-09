import Header from "./components/Header";
import Header2 from "./components/Header2"
import Slider from "./components/Slider"
import MeetAskSection from "./components/MeetAskSection"
import Footer from "./components/Footer"



// or "./components/layout/Header" depending on your folder structure

export default function Home() {
  return (
    <>
     
        <Slider />  
        <MeetAskSection />
      
      {/* Your Home Page Content */}
     

    </>
  );
}