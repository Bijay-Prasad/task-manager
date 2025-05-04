const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed'] 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
