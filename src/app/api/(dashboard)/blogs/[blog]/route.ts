import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connect from "LIB/db";
import User from "LIB/modals/users";
import Category from "LIB/modals/categories";
import Blog from "LIB/modals/blog";

export const PATCH = async (request: Request, context: { params: any }) => {
  const blogId = context.params.blog;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    const body = await request.json();
    const { description } = body;

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(
        JSON.stringify({ message: "blogId not valid?" }),
        { status: 400 }
      );
    }

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "userID not valid?" }),
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "categoryId not valid?" }),
        { status: 400 }
      );
    }

    await connect();

    const blogCheck = await Blog.findById(blogId);
    if (!blogCheck) {
      return new NextResponse(
        JSON.stringify({
          message: "blogid is not found ?",
        }),
        { status: 400 }
      );
    }

    const userCheck = await User.findById(userId);
    if (!userCheck) {
      return new NextResponse(
        JSON.stringify({
          message: "UserID is not found ?",
        }),
        { status: 400 }
      );
    }

    const categoryCheck = await Category.findById(categoryId);
    if (!categoryCheck) {
      return new NextResponse(
        JSON.stringify({
          message: "categoryId is not found ?",
        }),
        { status: 400 }
      );
    }

    const updateBlog = await Blog.updateOne(
      { _id: blogId, user: userId, category: categoryId },
      { $set: { description: description } }
    );

    return new NextResponse(
      JSON.stringify({ message: "update successfully", Blog: updateBlog })
    );
  } catch (error: any) {
    return new NextResponse("error at update blogs " + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request, context: { params: any }) => {
  const blogId = context.params.blog;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");


    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(
        JSON.stringify({ message: "blogId not valid?" }),
        { status: 400 }
      );
    }

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "userID not valid?" }),
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "categoryId not valid?" }),
        { status: 400 }
      );
    }

    await connect();

    const blogCheck = await Blog.findById(blogId);
    if (!blogCheck) {
      return new NextResponse(
        JSON.stringify({
          message: "blogid is not found ?",
        }),
        { status: 400 }
      );
    }

    const userCheck = await User.findById(userId);
    if (!userCheck) {
      return new NextResponse(
        JSON.stringify({
          message: "UserID is not found ?",
        }),
        { status: 400 }
      );
    }

    const categoryCheck = await Category.findById(categoryId);
    if (!categoryCheck) {
      return new NextResponse(
        JSON.stringify({
          message: "categoryId is not found ?",
        }),
        { status: 400 }
      );
    }

    await Blog.deleteOne({ _id: blogId });

    return new NextResponse(JSON.stringify("delete successfully"), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("error at delete blogs " + error.message, {
      status: 500,
    });
  }
};
