import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const pathMaps = {
  blog: "/blogs",
  destination: "/destinations",
  experience: "/experiences",
  tour: "/tours",
};

const homepageModels = ["moment", "featured", "review", "hero", "testimonial"];

export async function POST(request) {
  // headers auth
  const authHeader = request.headers.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  // Verification
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { model, entry } = body;

    if (!model || !entry) {
      return NextResponse.json(
        { message: "Model and entry are required" },
        { status: 400 }
      );
    }

    //Check model
    const modelName = model.toLowerCase();

    // Check homepage models
    if (homepageModels.includes(modelName)) {
      revalidatePath("/");
      return NextResponse.json(
        { message: "Successfully revalidated", path: "/" },
        { status: 200 }
      );
    }

    //Check slug
    const slug = entry?.slug;
    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    const basePath = pathMaps[modelName];
    if (!basePath) {
      return NextResponse.json({ message: "Invalid model" }, { status: 400 });
    }

    //Check entry
    if (!entry) {
      return NextResponse.json(
        { message: "Entry is required" },
        { status: 400 }
      );
    }

    const path = `${basePath}/${slug}`;

    // Revalidate
    revalidatePath(path);

    return NextResponse.json(
      { message: "Successfully revalidated", path },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
