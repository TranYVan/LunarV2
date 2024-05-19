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

export const initFaceBookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = 'en_GB';
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.REACT_FB_ID,
      cookie: true,
      xfbml: true,
      version: "v19.0"
    });
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = `https://connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
  

}