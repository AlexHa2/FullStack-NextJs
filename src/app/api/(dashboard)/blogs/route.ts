import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connect from "LIB/db";
import User from "LIB/modals/users";
import Category from "LIB/modals/categories";
import Blog from "LIB/modals/blog";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

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
          message: "categoryCheck is not found ?",
        }),
        { status: 400 }
      );
    }

    //TODO

    const checkBlogWithCateIdAndUserId = await Blog.find({
      user: new Types.ObjectId(userId),
      category: new Types.ObjectId(categoryId),
    });

    if (!checkBlogWithCateIdAndUserId) {
      return new NextResponse(
        JSON.stringify({
          message: "cannot find any blog with these id",
        }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "list Blog",
        blogs: checkBlogWithCateIdAndUserId,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error at get blog " + error.message,{status:500});
  }
};

export const POST = async (request: Request) => {
  type Body = {
    title: string ;
    description: string;
  };
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    const body:Body = await request.json(); //parse ve kieu json
    const { title, description } = body;

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
          message: "categoryCheck is not found ?",
        }),
        { status: 400 }
      );
    }

    const newBlog = new Blog({
      title,
      description,
      user: new Types.ObjectId(userId),
      category: new Types.ObjectId(categoryId),
    });

    await newBlog.save();

    return new NextResponse(
      JSON.stringify({
        message: "create blog successfull!",
        blog: newBlog,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error at create blog " + error.message,{status:500});
  }
};
