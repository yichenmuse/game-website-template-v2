import { SVGProps } from 'react';
import type { ClientUploadedFileData } from 'uploadthing/types';

export interface Pageable<T = object> {
  current: number;
  size: number;
  total?: number;
  data?: T;
}

export type IconSvgProps<T = string> = {} & SVGProps<T>;

export interface FAQItem {
  question: string;
  answer: string;
}


export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {
    [key: string]: any;
}
