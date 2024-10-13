import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Users from '../../../models/users';
import { authMiddleware } from '../../../middlewares/auth';

async function handleRequest() {
    try {
        await connectDB();
        const users = await Users.find({})
            .select('name points eventsParticipated');
        return NextResponse.json({ users });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json({ message: 'Error fetching leaderboard' }, { status: 500 });
    }
}
export const GET = authMiddleware(async () => handleRequest());
export const POST = authMiddleware(async () => handleRequest());
