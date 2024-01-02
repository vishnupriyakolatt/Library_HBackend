const mongoose = require('mongoose');

const bookOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  dueDate: {
    type: Date,
    default: function () {
   
      const currentDate = new Date();
      return new Date(currentDate.setDate(currentDate.getDate() + 10));
    },
  },
  transactionType: {
    type: String,
    enum: ['borrowed', 'returned'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const BookOrder = mongoose.model('BookOrder', bookOrderSchema);

module.exports = BookOrder;