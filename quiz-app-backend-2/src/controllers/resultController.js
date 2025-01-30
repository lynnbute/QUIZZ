import prisma from '../db.js';

// Get all results
export const getAllResults = async (req, res) => {
  try {
    const results = await prisma.results.findMany();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching results' });
  }
};

// Create a new result
export const createResult = async (req, res) => {
  const { user_id, quiz_id, score, answers, time_taken } = req.body;
  try {
    const newResult = await prisma.results.create({
      data: {
        user_id,
        quiz_id,
        score,
        answers,
        time_taken,
      },
    });
    res.status(201).json(newResult);
  } catch (error) {
    res.status(500).json({ error: 'Error creating result' });
  }
};

// Get a result by ID
export const getResultById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.results.findUnique({
      where: { id },
    });

    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching result' });
  }
};

// Update a result by ID
export const updateResult = async (req, res) => {
  const { id } = req.params;
  const { score, answers, time_taken } = req.body;
  try {
    const updatedResult = await prisma.results.update({
      where: { id },
      data: { score, answers, time_taken },
    });

    res.json(updatedResult);
  } catch (error) {
    res.status(500).json({ error: 'Error updating result' });
  }
};

// Delete a result by ID
export const deleteResult = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedResult = await prisma.results.delete({
      where: { id },
    });
    res.json(deletedResult);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting result' });
  }
};
