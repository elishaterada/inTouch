import { Label } from './label.interface';
import { ToDo } from './todo.interface';
import { EngagementLog } from './engagement-log.interface';
import { Link } from './link.interface';

export interface Profile {
  dateCreated: string;
  dateModified: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  summary?: string;
  engagementVibe?: number;
  closingPotential?: number;
  labels?: [Label];
  toDo?: [ToDo];
  log?: [EngagementLog];
  links?: [Link];
  $key?: string;
}
