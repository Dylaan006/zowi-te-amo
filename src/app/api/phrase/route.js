import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const phrase = db.prepare('SELECT text FROM phrases ORDER BY RANDOM() LIMIT 1').get();

        if (!phrase) {
            return NextResponse.json({ error: 'No phrases found' }, { status: 404 });
        }

        return NextResponse.json({ phrase: phrase.text });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch phrase' }, { status: 500 });
    }
}
