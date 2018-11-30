const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/UniversityDB');

// Schemas define the shape of the data for a certain model (includes validation, types and defaults)
const studentSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true, // mongoose's validation, the full name must be inserted in order to save the doc
        minlength: 1, // mongoose's validation, the full name must be more that or equal to 1 char in order to save the doc
        trim: true // Trims the string from white spaces from start and end before getting validated
    },
    age: {
        type: Number,
        required: true // mongoose's validation, the age must be inserted in order to save the doc
    },
    location: {
        type: String
    },
    university: {
        type: String,
        required: true // mongoose's validation, the university must be inserted in order to save the doc
    },
    registered: {
        type: Boolean,
        default: false // mongoose's default property, sets a default value in case there's no value inserted
    }
});

const ProfessorsSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true
    }
});

// Defining the models
const StudentsCollection = mongoose.model('StudentsCollection', studentSchema);
const professorsCollection = mongoose.model('professorsCollection', ProfessorsSchema);

// Instantiating the collection (actually creating a new record on the shape of the collection)
const mohamedAhmed = new StudentsCollection({
    full_name: 'Mohamed Ahmed ElSayed',
    age: 23,
    location: 'Cairo, Egypt',
    university: 'Helwan University'
})

const hawaf = new professorsCollection({
    username: 'dr.hawaf',
    email: 'hawaf@gmail.com',
    password: 'hawafresearchmethods'
})


// Saving the records
mohamedAhmed.save().then(doc => {
    console.log('doc', doc);
}, error => {
    console.log('error', error)}
);

hawaf.save().then(doc => {
    console.log('Professor Document: ', doc);
}, error => {
    console.log('Professor Error: ', error)}
);