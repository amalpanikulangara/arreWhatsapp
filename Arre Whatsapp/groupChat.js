/**
 * This code defines three Mongoose schemas for a WhatsApp group chat application: userSchema, groupSchema, and messageSchema.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * The userSchema defines the fields for a user, such as their unique userId, userName, mobileNumber, and password.
 * It also includes fields for the user's adminAccess, lastSeen, isActive, profilePicture, and statusMessage.
 */

const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: [true, 'User ID is required'],
  },
  adminAccess: {
    type: Boolean,
    default: false
  },
  lastSeen: Date,
  userName: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'Username is required']
  },
  mobileNumber: {
    type: String,
    unique: true,
    required: [true, 'Mobile number is required'],
    validate: {
      validator(v) {
        return /^\d{10}$/.test(v);
      },
      message: '{VALUE} is not a valid mobile number!',
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
  },
  statusMessage: {
    type: String,
  },
  lastSeenTimestamp: {
    type: Date,
  }
});

/**
 * The groupSchema defines the fields for a group, such as the groupName, participants, admins, groupDescription, createdBy, 
 * messages, createdAt, media, docs and links. It also includes a field disappearingMessages that determines if the 
 * messages in the group should disappear after certain time.
 */

const groupSchema = new Schema({
  groupName: {
    type: String,
    unique: true,
  },
  participants: [Object],
  admins: [Object],
  groupDescription: String,
  createdBy: Object,
  messages: [Object],
  createdAt: Date,
  media: [Object],
  docs: [Object],
  links: [Object],
  disappearingMessages: Boolean,
});

/**
 * The messageSchema defines the fields for a message, such as the group it belongs to, the user who sent it, the messageBody, 
 * and the createdAt timestamp. It also includes fields for the viewedBy and reactions and replyTo on the message.
 */

const messageSchema = new Schema({
  group: Object,
  user: Object,
  userId: String,
  messageBody: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  viewedBy: [Object],
  reactions: [Object],
  replyTo: [Object],
});

/**
 * Finally, the code exports the three Mongoose models: User, Group, and Message, which correspond to the userSchema, 
 * groupSchema, and messageSchema respectively.
 */

const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);
const Message = mongoose.model('Message', messageSchema);

module.exports = User;
module.exports = Group;
module.exports = Message;