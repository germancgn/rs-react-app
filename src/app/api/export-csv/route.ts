import { NextResponse } from 'next/server';
import { objectToCSV } from '../../../utils/csv/csv';
import { createBlob } from '../../../utils/files/download';
import { Movie } from '../../../types/movies/Movie';

export async function POST(req: Request) {
  const form = await req.formData();
  const data = JSON.parse(form.get('data') as string) as Movie[];

  const blob = createBlob(
    objectToCSV(data, [
      'id',
      'title',
      'adult',
      'overview',
      'popularity',
      'poster_path',
      'release_date',
      'vote_average',
      'vote_count',
    ]),
    'text/csv'
  );

  return new NextResponse(blob, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${data.length}_movies.csv"`,
    },
  });
}
