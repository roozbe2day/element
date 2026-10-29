export type PropertyType =
  | "Villa"
  | "House"
  | "Penthouse"
  | "Estate"
  | "Retreat"
  | "Residence";

export type Agent = {
  id: string;
  name: string;
  role: string;
  photo: string;
  email: string;
  phone: string;
  bio: string;
};

export type Property = {
  id: string;
  slug: string;
  name: string;
  /** Short location label, e.g. "Austin, Texas, USA" */
  location: string;
  city: string;
  state: string;
  /** Price in USD */
  price: number;
  type: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  year: number;
  featured: boolean;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  amenities: string[];
  agentId: string;
};
