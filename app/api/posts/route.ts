import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const post = await request.json();

    if (!post || !post.title || !post.date) {
      return NextResponse.json(
        { error: "Invalid request data. Please provide title and date." },
        { status: 400 }
      );
    }

    try {
      const createPost = await prisma.post.create({
        data: {
          title: post.title,
          date: post.date,
        },
      });

      return NextResponse.json(createPost);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const updateData = await request.json();

    try {
      const updatePostResponse = await prisma.post.update({
        where: {
          id: parseInt(id!),
        },
        data: {
          title: updateData.title,
          date:updateData.date
        },
      });
      return NextResponse.json(
        { message: "Post successfully updated", updatePostResponse },
        { status: 200 }
      );
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const id = request.nextUrl.searchParams.get("id");
    console.log(id);

    try {
      const deletePostResponse = await prisma.post.delete({
        where: {
          id: parseInt(id!),
        },
      });

      return NextResponse.json(
        { message: "success deleted the post", deletePostResponse },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
