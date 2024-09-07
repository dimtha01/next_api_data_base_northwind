import { NextResponse } from "next/server";
import { pool } from '@/libs/serverlessmysql';

export async function GET(request, { params }) {
    try {
        const categoryID = params.id;
        const result = await pool.query("SELECT * FROM categories WHERE CategoryID = ?", [categoryID]);
        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "categories no encontrado",
                },
                {
                    status: 404,
                }
            );

        };
        return NextResponse.json(result[0]);
    } catch (error) {
        console.log('Erroro al buscar un categories');
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}