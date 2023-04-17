import { useContext, useEffect } from "react";
import { PreLoaderContext } from "./PreLoaderContext";

function NotFound() {
  const preLoaderContext = useContext(PreLoaderContext);

  useEffect(() => {
    preLoaderContext.DisablePreLoader();
  })

  return (
    <p>
      No game found
    </p>
  );
}

export default NotFound;
