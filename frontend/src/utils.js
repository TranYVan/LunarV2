export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false;
    }
    return true;
}

export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString();
    return `${result} $`;
  } catch (error) {
    return null;
  }
}