import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

const noteApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await noteApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
    },
  });

  return response.data;
}

export async function createNote(note: CreateNoteParams): Promise<Note> {
  const response = await noteApi.post<Note>('/notes', note);

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await noteApi.delete<Note>(`/notes/${id}`);

  return response.data;
}
