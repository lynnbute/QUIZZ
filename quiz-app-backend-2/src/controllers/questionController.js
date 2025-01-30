import prisma from '../db.js';

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.questions.findMany();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching questions' });
  }
};

// Create a new question
export const createQuestion = async (req, res) => {
  const { quiz_id, text, options, correct_answer, media_url } = req.body;
  try {
    const newQuestion = await prisma.questions.create({
      data: {
        quiz_id,
        text,
        options,
        correct_answer,
        media_url,
      },
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Error creating question' });
  }
};

// Get a question by ID
export const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await prisma.questions.findUnique({
      where: { id },
    });

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching question' });
  }
};

// Update a question by ID
export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { text, options, correct_answer, media_url } = req.body;
  try {
    const updatedQuestion = await prisma.questions.update({
      where: { id },
      data: { text, options, correct_answer, media_url },
    });

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Error updating question' });
  }
};

// Delete a question by ID
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await prisma.questions.delete({
      where: { id },
    });
    res.json(deletedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting question' });
  }
};
