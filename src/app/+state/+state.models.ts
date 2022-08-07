export interface Filter {
  category?: string;
  query?: string;
}

export interface Marvel {
  name?: string;
  description?: string;
  thumbnail?: {
    path?: string;
    extension?: string;
  };
  comics?: any;
  series?: any;
  stories?: any;
  events?: any;
}
