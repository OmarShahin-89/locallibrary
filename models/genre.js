var mongoose=require('mongoose');

//Creating mongoose.Schema constructor
var Schema= mongoose.Schema;

//New Genre Schema module

var GenreSchema=new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 100}
});

//Virtual for Genre's url
GenreSchema.virtual('url').get(function(){
    return '/catalog/genre/'+this._id;
});

module.exports=mongoose.model('Genre', GenreSchema);