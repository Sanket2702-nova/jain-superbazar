import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/150?text=Category',
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Category', categorySchema)
