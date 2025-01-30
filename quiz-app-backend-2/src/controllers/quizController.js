
import prisma from '../db.js';

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await prisma.quizzes.findMany({
      include: {
        questions: true, // Fetch related questions
        leaderboard: true, // Fetch leaderboard for each quiz
      }
    });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quizzes' });
  }
};

// Create a new quiz
export const createQuiz = async (req, res) => {
  const { title, description, creator_id, settings, status } = req.body;
  try {
    const newQuiz = await prisma.quizzes.create({
      data: {
        title,
        description,
        creator_id,
        settings,
        status,
      },
    });
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Error creating quiz' });
  }
};

// Get a quiz by ID
export const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await prisma.quizzes.findUnique({
      where: { id },
      include: {
        questions: true, // Fetch questions for the quiz
        leaderboard: true, // Fetch leaderboard for the quiz
      }
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quiz' });
  }
};

// Update a quiz by ID
export const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, description, settings, status } = req.body;
  try {
    const updatedQuiz = await prisma.quizzes.update({
      where: { id },
      data: { title, description, settings, status },
    });

    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Error updating quiz' });
  }
};

// Delete a quiz by ID
export const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuiz = await prisma.quizzes.delete({
      where: { id },
    });
    res.json(deletedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting quiz' });
  }
};
