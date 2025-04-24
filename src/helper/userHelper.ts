// src/utils/crudHelper.ts
import { Response } from 'express';
import { Model } from 'mongoose';

export const findAll = async (Model: Model<any>, res: Response) => {
  try {
    const items = await Model.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

export const findOne = async (Model: Model<any>, id: string, res: Response) => {
  try {
    const item = await Model.findById(id);
    // if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

export const createOne = async (Model: Model<any>, data: any, res: Response) => {
  try {
    const newItem = new Model(data);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: 'Error creating item', error: err });
  }
};

export const updateOne = async (Model: Model<any>, id: string, data: any, res: Response) => {
  try {
    const updatedItem = await Model.findByIdAndUpdate(id, data, { new: true });
    // if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: 'Error updating item', error: err });
  }
};

export const deleteOne = async (Model: Model<any>, id: string, res: Response) => {
  try {
    const deletedItem = await Model.findByIdAndDelete(id);
    // if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting item', error: err });
  }
};
