import "./App.css";

import { DisplayReview } from "./components/DisplayReview";
import { HeaderSection } from "./components/HeaderSection";

function App() {
  return (
    <div className="App">
      <div class="container center">
        <div class="block">
          <HeaderSection />
          <DisplayReview />
        </div>
      </div>
    </div>
  );
}

export default App;
