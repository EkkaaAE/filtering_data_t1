//TODO 1 : dapatkan semua data
//TODO 2 : dapatkan data dengan nama tertentu
//TODO 3 : dapatkan data dengan alamat New York
//TODO 4 : dapatkan data dengan umur >= 30

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getData = () => {
  const filePath = path.join(process.cwd(), 'public/data/data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const city = searchParams.get('city');
  const minAge = searchParams.get('minAge');

  let data = getData();

  if (name) {
    data = data.filter((item: any) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (city) {
    data = data.filter((item: any) => item.city.toLowerCase() === city.toLowerCase());
  }

  if (minAge) {
    const minAgeNumber = parseInt(minAge, 10);
    data = data.filter((item: any) => item.age >= minAgeNumber);
  }

  return NextResponse.json(data);
}

