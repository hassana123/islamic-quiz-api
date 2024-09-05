
async function getFeedback(req, res) {
    const db = req.app.get("db");
    const feedbackCollection = db.collection("feedback");
  
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const feedback = await feedbackCollection.find({}).skip(skip).limit(limit).toArray();
  
      const totalFeedback = await feedbackCollection.countDocuments();
      const totalPages = Math.ceil(totalFeedback / limit);
  
      res.status(200).json({
        feedback,
        page,
        totalPages,
        totalFeedback,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async function postFeedback(req, res) {
    const db = req.app.get("db");
    const feedbackCollection = db.collection("feedback");
  
    try {
      const { userId, message, rating } = req.body;
  
      if (!userId || !message || rating === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const feedback = {
        userId,
        message,
        rating,
        createdAt: new Date(),
      };
  
      const result = await feedbackCollection.insertOne(feedback);
  
      res.status(201).json({
        message: "Feedback submitted successfully",
        feedbackId: result.insertedId,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  module.exports = {
    getFeedback,
    postFeedback
  };
  