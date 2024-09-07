import { NextResponse } from "next/server";
import { pool } from '@/libs/serverlessmysql';

export async function GET() {
    try {
        const result = await pool.query("SELECT * FROM categories");
        //await pool.end(); // Cerrar la conexión después de la consulta
        return NextResponse.json(result);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] [ERROR] [GET /api/categories] Error al listar los categories: ${error.message}`, {
            stack: error.stack,
            additionalInfo: {
                // Puedes agregar más información relevante aquí
            }
        });
        return NextResponse.json(
            {
                message: 'Error al acceder a la base de datos',
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}