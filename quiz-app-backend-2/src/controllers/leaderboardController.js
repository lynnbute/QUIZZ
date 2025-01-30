import prisma from '../db.js';

// Get leaderboard for a quiz
export const getLeaderboard = async (req, res) => {
  const { quiz_id } = req.query;  // Get quiz_id from query params
  try {
    const leaderboard = await prisma.leaderboard.findMany({
      where: { quiz_id },
      include: {
        users: true, // Include user details
        quizzes: true, // Include quiz details
      }
    });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leaderboard' });
  }
};

// Create a leaderboard entry
export const createLeaderboardEntry = async (req, res) => {
  const { quiz_id, user_id, score, rank } = req.body;
  try {
    const newLeaderboardEntry = await prisma.leaderboard.create({
      data: { quiz_id, user_id, score, rank },
    });
    res.status(201).json(newLeaderboardEntry);
  } catch (error) {
    res.status(500).json({ error: 'Error creating leaderboard entry' });
  }
};

// Update leaderboard entry
export const updateLeaderboardEntry = async (req, res) => {
  const { id } = req.params;
  const { score, rank } = req.body;
  try {
    const updatedLeaderboardEntry = await prisma.leaderboard.update({
      where: { id },
      data: { score, rank },
    });

    res.json(updatedLeaderboardEntry);
  } catch (error) {
    res.status(500).json({ error: 'Error updating leaderboard entry' });
  }
};

// Delete leaderboard entry
export const deleteLeaderboardEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLeaderboardEntry = await prisma.leaderboard.delete({
      where: { id },
    });
    res.json(deletedLeaderboardEntry);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting leaderboard entry' });
  }
};
