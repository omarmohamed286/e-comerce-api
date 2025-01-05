const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      minLength: [3, "Too short product title"],
      maxLength: [100, "Too long product title"],
    },
    slug: { type: String, lowercase: true },

    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [20, "Too short description"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      trim: true,
    },
    priceAfterDiscount: {
      type: Number,
      trim: true,
    },
    colors: {
      type: [String],
    },
    imageCover: {
      type: String,
      required: [true, "ImageCover is required"],
    },
    images: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "product must belong to category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Subcategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal to 1"],
      max: [5, "Rating must be below or equal to 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.pre(/^find/, function (next) {
  this.populate({ path: "category", select: "name" });
  next();
});

const setImageUrl = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((img) => {
      const imageUrl = `${process.env.BASE_URL}/products/${img}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};

productSchema.post("init", function (doc) {
  setImageUrl(doc);
});

productSchema.post("save", function (doc) {
  setImageUrl(doc);
});

module.exports = mongoose.model("Product", productSchema);
