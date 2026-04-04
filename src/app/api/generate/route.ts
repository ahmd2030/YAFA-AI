import { NextResponse } from "next/server";
import Replicate from "replicate";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const dynamic = "force-dynamic";

// Model Tiers (Prioritize Turbo for fast Vercel response)
const MODEL_TIERS = [
  {
    id: "stability-ai/sdxl-turbo",
    version: "a562095f9c66f54c90d8137351f0f089f81df688f62fa2276569103991206d91",
    name: "Fast Performance (Turbo)",
  },
  {
    id: "stability-ai/sdxl",
    version: "da770e9c945441c9972070c773fe5d3a9557a3e7ef155050f2249c5825a07c39",
    name: "High Quality (SDXL)",
  }
];

export async function POST(req: Request) {
  try {
    const { prompt, image, params } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 1. Fetch API Key from Firestore
    let apiKey = process.env.REPLICATE_API_TOKEN; // Fallback to env if set
    
    try {
      if (!db) throw new Error("Firestore not initialized");
      const configDoc = await getDoc(doc(db, "configs", "replicate"));
      if (configDoc.exists()) {
        const data = configDoc.data();
        if (data.apiKey) {
          apiKey = data.apiKey;
        }
      }
    } catch (firebaseError) {
      console.error("Error fetching config from Firestore:", firebaseError);
      // Continue with env var if available
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI Engine not configured. Please add Replicate API Key in Admin Settings." },
        { status: 500 }
      );
    }

    const replicate = new Replicate({
      auth: apiKey,
    });

    let lastError = null;
    let output = null;
    let usedModel = "";

    // 2. Multi-tier fallback execution
    for (const model of MODEL_TIERS) {
      try {
        console.log(`Attempting generation with: ${model.name}`);
        
        // Prepare input
        const input: any = {
           prompt: prompt,
           negative_prompt: "low quality, blurry, distorted, bad anatomy, ugly, watermark, text, lowres, monochrome",
           num_outputs: 4,
           scheduler: "K_EULER",
           guidance_scale: 7.5,
           apply_watermark: false,
        };

        if (image) {
          input.image = image;
          input.prompt_strength = 0.8;
        }

        if (model.id.includes("turbo")) {
          input.num_inference_steps = 1;
          input.guidance_scale = 0;
        } else {
          input.num_inference_steps = 30;
        }

        const prediction = await replicate.run(model.version as any, { input });
        
        if (prediction && Array.isArray(prediction)) {
          output = prediction; // Already an array of 4 URLs
          usedModel = model.name;
          break;
        } else if (typeof prediction === "string") {
          output = [prediction];
          usedModel = model.name;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.error(`Generation failed for ${model.name}:`, err.message);
        // Continue to fallback
      }
    }

    if (!output) {
      return NextResponse.json(
        { 
          error: "All AI models failed to generate image.", 
          details: lastError?.message 
        }, 
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: output,
      results: output, // Alias for frontend compatibility
      model: usedModel,
      prompt: prompt
    });

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
