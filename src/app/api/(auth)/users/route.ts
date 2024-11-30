import { NextResponse } from "next/server";
import connect from "../../../../../lib/db";
import User from "../../../../../lib/modals/users";
import { Types } from "mongoose";


const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Errors in fetching user" + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newUsser = new User(body);
    await newUsser.save();

    return new NextResponse(
      JSON.stringify({
        message: "User is created",
        user: newUsser,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error is creatting user" + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;

    await connect();

    if (!userId || !newUsername) {
      return new NextResponse(
        JSON.stringify({
          message: "Id or new username not found",
        }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({
          message: "invalid User id",
        }),
        { status: 400 }
      );
    }

    const updateUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { username: newUsername },
      { new: true }
    );

    // User.updateOne(
    //   { userId: userId },
    //   {
    //     $set: { username: newUsername },
    //   }
    // );

    if (!updateUser) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found in the database",
        }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "User iss update",
        user: updateUser,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error update USER " + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(JSON.stringify("userId not found"), {
        status: 400,
      });
    }

    if (!ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify("error it not valid "), {
        status: 400,
      });
    }

     await connect();
     const deleteUser = await User.deleteOne({ _id: userId });

     if(!deleteUser){
      return new NextResponse(JSON.stringify("user not found"), {
        status: 400,
      });
     }

     return new NextResponse(JSON.stringify({
      message:"delete succesffulyy",
      user:deleteUser
     }), {
      status: 200,
    });

  } catch (error: any) {
    return new NextResponse("Error delete USER " + error.message, {
      status: 500,
    });
  }
};
