const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const StudentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [
      {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: '{VALUE} is not a valid email address!'
      }]
  },
  password: {
    type: String,
    // required: true,
    trim: true,
    minlength: 6,
    validate: [
      {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v)
        },
        message: '{VALUE} is not a valid password!'
      }
    ]
  },
  companyname: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100,
    minlength: 3,
    validate(val) {
      if (val.includes('@') || val.includes('.') || val.includes('/' || val.includes('\\'))) {
        throw new Error('Name cannot contain an @')
      }
    }
  },
  branch: {
    type: String,
    required: true
  },
  aadharnumber: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 12,
    minlength: 12,
    validate: [
      {
        validator: function (v) {
          return /^\d{12}$/.test(v)
        },
        message: '{VALUE} is not a valid aadhar number!'
      }
    ]
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution'
  },
  ishighereducationopted:{
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  passingyear: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100,
    minlength: 3,
    validate(val) {
      if (val.includes('@') || val.includes('.') || val.includes('/' || val.includes('\\'))) {
        throw new Error('Name cannot contain an @')
      }
    }
  },
  cgpa: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

StudentSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Student', StudentSchema)