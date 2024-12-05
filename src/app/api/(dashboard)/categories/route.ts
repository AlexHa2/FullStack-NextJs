
import connect from "LIB/db";
import User from "LIB/modals/users";
import Category from "LIB/modals/categories";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const urlParam = searchParams.get("userId");

    if (!urlParam || !Types.ObjectId.isValid(urlParam)) {
      return new NextResponse(
        JSON.stringify({ message: " this userId is invalid or missing" }),
        { status: 400 }
      );
    }

    await connect();
    const user = await User.findById(urlParam);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: " this userId is not found" }),
        { status: 400 }
      );
    }

    const Categories = await Category.find({
      user: new Types.ObjectId(urlParam),
    });

    if (!Categories ) {
      return new NextResponse(
        JSON.stringify({
          message: "Can not find Categories match with user ID",
        }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "this is categories",
        categories: Categories,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in fetching categories" + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
    try {
        
        const {searchParams} = new URL(request.url)
        const userId = searchParams.get("userId")
        const { title } = await request.json() // parse body respone become a json form, get title in body json

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({message:"userId is invalid, how dare you"}),
                {status:400}
            )
        }

        await connect();
        const user = await User.findById(userId)
        
        if (!user) {
            return new NextResponse(
              JSON.stringify({ message: " this userId is not found" }),
              { status: 400 }
            );
        }

        //khoi tao 1 object moi
        const newCategories = new Category({
            title,
            user: new Types.ObjectId(userId)
            //userId khi duoc lay ra tu body la 1 string can parse ve ObjectId cua mongooo
        })

        // doi object duoc luu
        await newCategories.save()
        
        return new NextResponse(
            JSON.stringify(
                {message:"category is created",
                    Category:newCategories
                }
            ),{status:200}

        )


    } catch (error:any) {
        return new NextResponse("Error in insert categories" + error.message, {
            status: 500,
          });
    }
}
