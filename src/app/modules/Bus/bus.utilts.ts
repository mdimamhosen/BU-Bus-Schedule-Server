import { Bus } from './bus.model';

const findLastBusFromDB = async () => {
  try {
    const findLastBus = await Bus.findOne({}, { id: 1 }).sort({
      createdAt: -1,
    });
    return findLastBus;
  } catch (error) {
    console.error('Error finding the last bus from DB:', error);
    throw new Error('Failed to retrieve the last bus from the database');
  }
};

export const generateBusId = async () => {
  try {
    const lastBus = await findLastBusFromDB();
    let newId = 0;

    if (lastBus && lastBus.id) {
      const lastId = parseInt(lastBus.id.split('-')[1], 10);
      if (!isNaN(lastId)) {
        newId = lastId + 1;
      } else {
        throw new Error('Invalid bus ID format in the database');
      }
    } else {
      newId = 1;
    }

    // Pad the new ID with leading zeros (e.g., BUS-001, BUS-002)
    const paddedId = newId.toString().padStart(4, '0');
    return `BUS-${paddedId}`;
  } catch (error) {
    console.error('Error generating bus ID:', error);
    throw new Error('Failed to generate a new bus ID');
  }
};
