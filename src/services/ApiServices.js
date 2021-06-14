import betListData from "./data/betlist.json";
import betListDetails from "./data/betlistdetails.json";

const betListApi = () => {
  return new Promise((resolve, reject) => {
    resolve(betListData);
  });
};

const detailsBetApi = (bet_id) => {
  return new Promise((resolve, reject) => {
    const bet = betListDetails.filter((bet) => bet.idEvento === bet_id);
    if (bet) {
      resolve(bet[0]);
    } else {
      reject();
    }
  });
};

export const ApiServices = {
  betListApi,
  detailsBetApi,
};
