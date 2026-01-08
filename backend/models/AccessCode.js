import mongoose from "mongoose"

const accessCodeSchema = new mongoose.Schema({
  codeHash: {
    type: String,
    required: true,
  },
})

export default mongoose.model("AccessCode", accessCodeSchema)
