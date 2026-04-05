import { NextResponse } from "next/server";
import Replicate from "replicate";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Prevent generation timeout on Vercel

// Model Tiers (Optimized for speed and quality)
const MODEL_TIERS = [
  {
    id: "black-forest-labs/flux-schnell",
    name: "FLUX Schnell (Elite Performance)",
  },
  {
    id: "stability-ai/sdxl-turbo",
    version: "a562095f9c66f54c90d8137351f0f089f81df688f62fa2276569103991206d91",
    name: "SDXL Turbo (Fallback)",
  }
];

export async function POST(req: Request) {
  try {
    const { prompt, image, params } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 1. Fetch API Key from Firestore
    let apiKey = process.env.REPLICATE_API_TOKEN;
    
    try {
      if (!db) throw new Error("Firestore not initialized");
      const configDoc = await getDoc(doc(db, "configs", "replicate"));
      if (configDoc.exists()) {
        const data = configDoc.data();
        if (data.apiKey) apiKey = data.apiKey;
      }
    } catch (firebaseError) {
      console.error("Firestore config error:", firebaseError);
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI Engine not configured. Please add Replicate API Key in Admin Settings." },
        { status: 500 }
      );
    }

    const replicate = new Replicate({ auth: apiKey });

    let lastError = null;
    let output = null;
    let usedModel = "";

    // 2. Multi-tier fallback execution
    for (const model of MODEL_TIERS) {
      try {
        console.log(`Attempting generation with: ${model.name}`);
        
        let input: any = {};

        // Configuration based on model type
        if (model.id.includes("flux")) {
          // FLUX Schnell Parameters
          input = {
            prompt: prompt,
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "webp",
            output_quality: 90,
          };
        } else {
          // SDXL Turbo / Fallback Parameters
          input = {
            prompt: prompt,
            negative_prompt: "low quality, blurry, distorted, bad anatomy, ugly, watermark, text",
            num_outputs: 1,
            scheduler: "K_EULER",
            guidance_scale: model.id.includes("turbo") ? 0 : 7.5,
            num_inference_steps: model.id.includes("turbo") ? 1 : 25,
          };
          if (image) {
            input.image = image;
            input.prompt_strength = 0.8;
          }
        }

        // Run prediction
        const prediction = await replicate.run(
          (model.id.includes("flux") ? model.id : `${model.id}:${model.version}`) as any,
          { input }
        );
        
        if (prediction) {
          if (Array.isArray(prediction)) {
            output = prediction;
          } else if (typeof prediction === "string") {
            output = [prediction];
          } else {
            // Some models return objects with file-like structures
            output = [String(prediction)];
          }
          usedModel = model.name;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.error(`Generation failed for ${model.name}:`, err.message);
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
