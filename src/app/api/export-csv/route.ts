import { NextResponse } from 'next/server';
import { objectToCSV } from '../../../utils/csv/csv';
import { createBlob } from '../../../utils/files/download';

export async function POST(req: Request) {
  const data = await req.json();
  console.log('data received', data);
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

  console.log('returned csv', blob);

  return new NextResponse(blob);
}
