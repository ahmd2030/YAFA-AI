export type Style = "ecommerce" | "instagram" | "luxury" | "street";
export type Model = "male" | "female" | "kid";
export type Clothing = "tshirt" | "hoodie" | "dress" | "abaya" | "sportswear";
export type Lighting = "studio" | "natural" | "cinematic";
export type Background = "white" | "minimal" | "city" | "luxury";
export type Pose = "front" | "side" | "walking" | "relaxed";
export type Accessory = "none" | "glasses" | "watch" | "bag";

export interface PromptParams {
  style: Style;
  model: Model;
  clothing: Clothing;
  lighting: Lighting;
  background: Background;
  pose: Pose;
  accessory: Accessory;
}

export const STYLE_MAP: Record<Style, string> = {
  ecommerce: "e-commerce product photo",
  instagram: "trendy instagram fashion photo",
  luxury: "luxury fashion campaign",
  street: "urban streetwear photography",
};

export const MODEL_MAP: Record<Model, string> = {
  male: "male model",
  female: "female model",
  kid: "child model",
};

export const CLOTHING_MAP: Record<Clothing, string> = {
  tshirt: "tshirt",
  hoodie: "hoodie",
  dress: "dress",
  abaya: "abaya",
  sportswear: "sportswear",
};

// Internal adjustment for special cases like "elegant dress" in Luxury
export function getClothingText(clothing: Clothing, style: Style): string {
  if (style === "luxury" && clothing === "dress") return "elegant dress";
  return CLOTHING_MAP[clothing];
}

export const LIGHTING_MAP: Record<Lighting, string> = {
  studio: "studio lighting",
  natural: "natural daylight", // Defaults to daylight per spec
  cinematic: "cinematic lighting",
};

// Street style uses "natural lighting" specifically in examples
export function getLightingText(lighting: Lighting, style: Style): string {
  if (style === "street" && lighting === "natural") return "natural lighting";
  return LIGHTING_MAP[lighting];
}

export const BACKGROUND_MAP: Record<Background, string> = {
  white: "clean white background",
  minimal: "minimal modern background",
  city: "urban city background",
  luxury: "luxury indoor setting",
};

export const POSE_MAP: Record<Pose, string> = {
  front: "front facing pose",
  side: "side pose",
  walking: "walking pose",
  relaxed: "relaxed natural pose",
};

export const ACCESSORY_MAP: Record<Accessory, string> = {
  none: "none",
  glasses: "glasses",
  watch: "watch",
  bag: "bag",
};

export function generatePrompt(params: PromptParams): string {
  const { style, model, clothing, lighting, background, pose, accessory } = params;

  // 1. Core Structure
  const styleText = STYLE_MAP[style];
  const modelText = MODEL_MAP[model];
  const clothingText = getClothingText(clothing, style);
  const lightingText = getLightingText(lighting, style);
  const backgroundText = BACKGROUND_MAP[background];
  const poseText = POSE_MAP[pose];
  const accessoryText = ACCESSORY_MAP[accessory];

  const basePrompt = `${styleText} of a ${modelText} wearing ${clothingText}, ${lightingText}, ${backgroundText}, ${poseText}, ${accessoryText}`;
  const suffix = ", ultra realistic, high quality, 8k, professional photography, perfect anatomy, no distortion, sharp focus, detailed fabric texture, realistic skin tones, depth of field, studio quality";

  // 2. Auto Enhancer (Conditional suffixes based on style definition)
  let enhancer = "";
  if (style === "ecommerce") enhancer = ", centered composition, isolated product, plain background, catalog style";
  else if (style === "instagram") enhancer = ", trendy aesthetic, influencer vibe, social media ready";
  else if (style === "luxury") enhancer = ", high-end fashion magazine style, vogue aesthetic, premium branding";
  else if (style === "street") enhancer = ", raw urban vibe, street culture, candid shot";

  return `${basePrompt}${suffix}${enhancer}`;
}

export const DEFAULT_PROMPT_PARAMS: PromptParams = {
  style: "instagram",
  model: "female",
  clothing: "tshirt",
  lighting: "natural",
  background: "minimal",
  pose: "relaxed",
  accessory: "none",
};
