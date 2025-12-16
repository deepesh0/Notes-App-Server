import ratelimit from "../config/upstash.js";  // Correct relative path

const rateLimiter = async (req, res, next) => {
  try {
    // Use the rate limiter with the user's IP (or another unique key)
    const { success } = await ratelimit.limit(req.ip);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later"
      });
    }

    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error);  // Pass any errors to the next error handler
  }
};
export default rateLimiter;

