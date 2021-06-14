import betListData from "./data/betlist.json";

const betListApi = () => {
  return new Promise((resolve, reject) => {
    resolve(betListData);
  });
};

export const ApiServices = {
  betListApi,
};
