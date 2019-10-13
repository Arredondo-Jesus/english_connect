export interface Course {
  id?: number;
  name?: string;
  level?: number;
  day?: string;
  time?: string;
  year?: string;
  building?: string;
  created_at?: Date;
  modified_on?: Date;
  instructor_id?: number;
  status?: string;
}
