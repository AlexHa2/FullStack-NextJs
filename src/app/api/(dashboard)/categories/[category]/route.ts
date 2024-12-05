import connect from "LIB/db";
import User from "LIB/modals/users";
import Category from "LIB/modals/categories";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, context: { params: any }) => {
  const categoryId = context.params.category;
  try {
    const body = await request.json();
    const { title } = body;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "loi r loi r userId is not valid" }),
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "loi r loi r categoryId is not valid" }),
        { status: 400 }
      );
    }

    await connect();
    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "loi r loi r, can't not found user id" }),
        { status: 400 }
      );
    }

    const category = await Category.findOne({ _id: categoryId, user: userId });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "loi r loi r, category not found" }),
        { status: 400 }
      );
    }

    const updateCategory = await Category.updateOne(
      { _id: categoryId },
      {
        $set: {
          title: title,
          new: true,
        },
      }
    );

    if (!updateCategory) {
      return new NextResponse(
        JSON.stringify({
          message: "loi r loi r, can't not update category not found",
        }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "update cate successfull",
        cateUpdate: updateCategory,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating categories" + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request, context: { params: any }) => {
  const categoryId = context.params.category; //lay param tu Url dymaic

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "loi r loi r userId is not valid" }),
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "loi r loi r categoryId is not valid" }),
        { status: 400 }
      );
    }

    await connect();
    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "Userid id not exist" }),
        { status: 400 }
      );
    }

    const category = await Category.findOne({ _id: categoryId, user: userId });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "category id not exist" }),
        { status: 400 }
      );
    }

    await Category.deleteOne({_id:categoryId})

    return new NextResponse("delete successfully!")
  } catch (error: any) {
    return new NextResponse("Error in delete category " + error.message, {
      status: 500,
    });
  }
};
