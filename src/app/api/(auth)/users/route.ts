import { NextResponse } from "next/server";
import connect from "../../../../../lib/db";
import User from "../../../../../lib/modals/users";

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
