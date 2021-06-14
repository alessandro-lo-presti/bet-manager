import { useEffect } from "react";
import { ApiServices } from "../../services/ApiServices";

function BetList() {
  useEffect(() => {
    ApiServices.betListApi().then((data) => console.log(data));
  }, []);

  return (
    <div>
      <p>BetList</p>
    </div>
  );
}

export default BetList;
