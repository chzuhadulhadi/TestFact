import Home from "./homepage";
import Header from "./header";
import { useState } from "react";
function HomePage() {
  const [loginCheck, setLoginCheck] = useState(false);
  return (
    <div>
      <Header setLoginCheck={setLoginCheck} />
      <Home loginCheck={loginCheck} />
    </div>
  )
}

export default HomePage;