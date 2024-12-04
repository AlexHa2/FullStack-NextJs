import { Schema, model, models } from "mongoose";

const Categories = new Schema(
  {
    title: { type: "string", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//lenh tren de check category co nam trong global models hay chua, neu chua thi tao mot model moi co ten va Schema duoc dinh nghia tu truoc
const Category = models.Category || model("Category", Categories);

export default Category;
