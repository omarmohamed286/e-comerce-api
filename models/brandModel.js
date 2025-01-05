const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand name is required"],
      unique: [true, "brand name must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name"],
    },
    slug: { type: String, lowercase: true },
    image: String,
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};

brandSchema.post("init", function (doc) {
  setImageUrl(doc);
});

brandSchema.post("save", function (doc) {
  setImageUrl(doc);
});

module.exports = mongoose.model("Brand", brandSchema);
