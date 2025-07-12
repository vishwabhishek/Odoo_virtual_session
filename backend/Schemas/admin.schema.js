import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    adminname:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    }
})

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'update', 'maintenance'],
    default: 'info'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Announcement = mongoose.model('Announcement', announcementSchema);
export const Admin = mongoose.model("Admin", adminSchema);
