const axios = require("axios");

const getDestinationImage = async (destination) => {
  try {
    const response = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: destination,
          per_page: 1,
        },
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const result = response.data.results[0];

    if (!result) {
      return null;
    }

    return {
      destination,
      imageUrl: result.urls.regular,
      photographer: result.user.name,
    };
  } catch (error) {
    console.error("Unsplash API Error:", error.message);
    return null;
  }
};

module.exports = getDestinationImage;